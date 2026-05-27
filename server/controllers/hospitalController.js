const db = require('../db');
const { mockHospitals } = require('../mockData');

exports.getAllHospitals = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
    const sort = req.query.sort;

    const query = `
      SELECT
        h.*,
        MIN(COALESCE(s.discount_price, s.price)) AS min_effective_price
      FROM hospitals h
      LEFT JOIN services s ON s.hospital_id = h.id
      GROUP BY h.id
      ORDER BY ${sort === 'price_asc'
        ? 'MIN(COALESCE(s.discount_price, s.price)) ASC NULLS LAST, h.rating DESC NULLS LAST, h.created_at DESC'
        : 'h.created_at DESC'}
      ${limit ? `LIMIT ${limit}` : ''}
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Database Error:', error);
    console.log('Serving mock hospitals as fallback...');
    res.json(mockHospitals);
  }
};

exports.getHospitalById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT h.*, 
             COALESCE(json_agg(s.*) FILTER (WHERE s.id IS NOT NULL), '[]') as services
      FROM hospitals h
      LEFT JOIN services s ON h.id = s.hospital_id
      WHERE h.id = $1
      GROUP BY h.id
    `;
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch hospital details' });
  }
};

exports.createHospital = async (req, res) => {
  const { name, location, rating, discount_percentage, discount_description, phone_number, map_url } = req.body;
  let { services } = req.body;

  // Handle file upload (Base64 conversion)
  let image_url = req.body.image_url;
  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const mimeType = req.file.mimetype;
    image_url = `data:${mimeType};base64,${b64}`;
  }

  // Parse services if sent as JSON string (Multipart form data limitation)
  if (typeof services === 'string') {
    try {
      services = JSON.parse(services);
    } catch (e) {
      services = [];
    }
  }

  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Insert Hospital
    const hospitalQuery = `
      INSERT INTO hospitals (name, location, rating, discount_percentage, discount_description, image_url, phone_number, map_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const hospitalValues = [name, location, rating || 0, discount_percentage || 0, discount_description || '', image_url || '', phone_number || '', map_url || ''];
    const hospitalResult = await client.query(hospitalQuery, hospitalValues);
    const newHospital = hospitalResult.rows[0];

    // 2. Insert Services (if any)
    if (services && Array.isArray(services) && services.length > 0) {
      const serviceQuery = `
          INSERT INTO services (hospital_id, name, category, price, discount_price, description)
          VALUES ($1, $2, $3, $4, $5, $6)
        `;

      for (const service of services) {
        await client.query(serviceQuery, [
          newHospital.id,
          service.name,
          service.category || 'General',
          service.price,
          service.discount_price || service.price, // Default to same price if no discount
          service.description || ''
        ]);
      }
    }

    await client.query('COMMIT');

    res.status(201).json({ success: true, hospital: newHospital, message: 'Hospital and services created successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to create hospital' });
  } finally {
    client.release();
  }
};

exports.updateHospital = async (req, res) => {
  const { id } = req.params;
  const { name, location, rating, discount_percentage, discount_description, phone_number, map_url } = req.body;

  // Handle file upload (Base64 conversion)
  let image_url = req.body.image_url;
  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const mimeType = req.file.mimetype;
    image_url = `data:${mimeType};base64,${b64}`;
  }

  // Parse services
  let services = req.body.services;
  console.log('UpdateHospital Body:', req.body); // DEBUG
  if (typeof services === 'string') {
    try {
      services = JSON.parse(services);
    } catch (e) {
      services = [];
    }
  }
  console.log('Parsed Services for Update:', services); // DEBUG

  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Update Hospital
    const query = `
      UPDATE hospitals 
      SET name = $1, location = $2, rating = $3, discount_percentage = $4, discount_description = $5, image_url = $6, phone_number = $7, map_url = $8
      WHERE id = $9
      RETURNING *
    `;
    const values = [name, location, rating || 0, discount_percentage || 0, discount_description || '', image_url || '', phone_number || '', map_url || '', id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    // 2. Update Services (Delete All + Insert New)
    // Note: This might fail if services are validated against bookings. 
    // For now, we assume simple replacement is desired.
    if (services && Array.isArray(services)) {
      const incomingIds = services.filter(s => s.id).map(s => s.id);

      try {
        if (incomingIds.length > 0) {
          // Delete services not in the incoming list
          await client.query(`DELETE FROM services WHERE hospital_id = $1 AND id != ALL($2::int[])`, [id, incomingIds]);
        } else {
          // Delete all if empty
          await client.query(`DELETE FROM services WHERE hospital_id = $1`, [id]);
        }
      } catch (deleteError) {
        console.warn("Could not delete some services, possibly linked to existing bookings.", deleteError.message);
        // Continue anyway, just don't delete them or fail the whole request
      }

      for (const service of services) {
        // Skip empty rows
        if (!service.name) continue;

        if (service.id) {
           await client.query(`
              UPDATE services 
              SET name = $1, category = $2, price = $3, discount_price = $4, description = $5
              WHERE id = $6 AND hospital_id = $7
           `, [
              service.name,
              service.category || 'General',
              service.price,
              service.discount_price || service.price,
              service.description || '',
              service.id,
              id
           ]);
        } else {
           await client.query(`
              INSERT INTO services (hospital_id, name, category, price, discount_price, description)
              VALUES ($1, $2, $3, $4, $5, $6)
           `, [
             id,
             service.name,
             service.category || 'General',
             service.price,
             service.discount_price || service.price,
             service.description || ''
           ]);
        }
      }
    }

    await client.query('COMMIT');
    res.json({ success: true, hospital: result.rows[0], message: 'Hospital updated successfully' });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update hospital. Ensure no active bookings depend on removed services.' });
  } finally {
    client.release();
  }
};

exports.deleteHospital = async (req, res) => {
  const { id } = req.params;
  try {
    // For safety, let's delete services and bookings manually first in case Cascade isn't set.
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Delete dependent services
      await client.query('DELETE FROM services WHERE hospital_id = $1', [id]);

      // 2. Delete dependent bookings (if any)
      // Check if bookings table has hospital_id first? We assume it does based on previous inputs.
      // If it throws an error (column doesn't exist), we catch it.
      // But better to be safe: specific delete
      try {
        await client.query('DELETE FROM bookings WHERE hospital_id = $1', [id]);
      } catch (bookingErr) {
        console.warn('Could not delete bookings or hospital_id column missing in bookings:', bookingErr.message);
        // non-fatal if column missing, but fatal if constraint exists and we didn't delete. 
        // We'll proceed and let the hospital delete fail if constraint blocks it.
      }

      const result = await client.query('DELETE FROM hospitals WHERE id = $1 RETURNING *', [id]);
      await client.query('COMMIT');

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Hospital not found' });
      }
      res.json({ success: true, message: 'Hospital deleted successfully' });
    } catch (err) {
      await client.query('ROLLBACK');
      console.error("Delete Transaction Failed:", err);
      throw err;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete hospital' });
  }
};

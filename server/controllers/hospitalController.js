const db = require('../db');
const { mockHospitals } = require('../mockData');

exports.getAllHospitals = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
    const sort = req.query.sort || 'recommended';
    const orderBy = {
      lowest_price: 'MIN(COALESCE(s.discount_price, s.price)) ASC NULLS LAST, h.rating DESC NULLS LAST, h.created_at DESC',
      highest_rated: 'h.rating DESC NULLS LAST, MIN(COALESCE(s.discount_price, s.price)) ASC NULLS LAST, h.created_at DESC',
      premium: 'h.rating DESC NULLS LAST, MIN(COALESCE(s.discount_price, s.price)) DESC NULLS LAST, h.created_at DESC',
      recommended: 'h.rating DESC NULLS LAST, h.created_at DESC, MIN(COALESCE(s.discount_price, s.price)) ASC NULLS LAST'
    }[sort] || 'h.rating DESC NULLS LAST, h.created_at DESC, MIN(COALESCE(s.discount_price, s.price)) ASC NULLS LAST';

    const query = `
      SELECT
        h.*,
        MIN(COALESCE(s.discount_price, s.price)) AS min_effective_price
      FROM hospitals h
      LEFT JOIN services s ON s.hospital_id = h.id AND s.is_active = TRUE
      WHERE h.is_active = TRUE
      GROUP BY h.id
      ORDER BY ${orderBy}
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

exports.getManagedHospitals = async (req, res) => {
  try {
    const isAdmin = ['admin', 'super_admin'].includes(req.user?.role);
    const partnerHospitalId = req.user?.hospital_id;

    if (!isAdmin && !partnerHospitalId) {
      return res.status(403).json({ success: false, message: 'Partner account is not assigned to a hospital.' });
    }

    const result = await db.query(
      `SELECT h.*
       FROM hospitals h
       WHERE h.is_active = TRUE
         AND ($1::boolean = TRUE OR h.id = $2)
       ORDER BY h.created_at DESC`,
      [isAdmin, partnerHospitalId || null]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch managed hospitals' });
  }
};

exports.getHospitalById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT h.*, 
             COALESCE(json_agg(s.*) FILTER (WHERE s.id IS NOT NULL), '[]') as services
      FROM hospitals h
      LEFT JOIN services s ON h.id = s.hospital_id AND s.is_active = TRUE
      WHERE h.id = $1 AND h.is_active = TRUE
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
          INSERT INTO services (hospital_id, name, category, price, discount_price, description, is_active, slot_capacity)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

      for (const service of services) {
        await client.query(serviceQuery, [
          newHospital.id,
          service.name,
          service.category || 'General',
          service.price,
          service.discount_price || service.price, // Default to same price if no discount
          service.description || '',
          service.is_active !== false,
          Math.max(1, parseInt(service.slot_capacity, 10) || 1)
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
  const isAdmin = ['admin', 'super_admin'].includes(req.user?.role);
  const isPartner = req.user?.role === 'hospital_partner';

  if (isPartner && String(req.user?.hospital_id || '') !== String(id)) {
    return res.status(403).json({ success: false, message: 'Partners can only update their assigned hospital.' });
  }

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
        AND ($10::boolean = TRUE OR id = $11)
      RETURNING *
    `;
    const values = [name, location, rating || 0, discount_percentage || 0, discount_description || '', image_url || '', phone_number || '', map_url || '', id, isAdmin, req.user?.hospital_id || null];
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
          await client.query(`UPDATE services SET is_active = FALSE WHERE hospital_id = $1 AND id != ALL($2::int[])`, [id, incomingIds]);
        } else {
          // Delete all if empty
          await client.query(`UPDATE services SET is_active = FALSE WHERE hospital_id = $1`, [id]);
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
              SET name = $1, category = $2, price = $3, discount_price = $4, description = $5, is_active = $6, slot_capacity = $7
              WHERE id = $8 AND hospital_id = $9
           `, [
              service.name,
              service.category || 'General',
              service.price,
              service.discount_price || service.price,
              service.description || '',
              service.is_active !== false,
              Math.max(1, parseInt(service.slot_capacity, 10) || 1),
              service.id,
              id
           ]);
        } else {
           await client.query(`
              INSERT INTO services (hospital_id, name, category, price, discount_price, description, is_active, slot_capacity)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           `, [
             id,
             service.name,
             service.category || 'General',
             service.price,
             service.discount_price || service.price,
             service.description || '',
             service.is_active !== false,
             Math.max(1, parseInt(service.slot_capacity, 10) || 1)
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

      await client.query('UPDATE services SET is_active = FALSE WHERE hospital_id = $1', [id]);
      const result = await client.query('UPDATE hospitals SET is_active = FALSE WHERE id = $1 RETURNING *', [id]);
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

const db = require('../db');

exports.getAllHospitals = async (req, res) => {
  try {
    const query = `
      SELECT * FROM hospitals 
      ORDER BY created_at DESC
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch hospitals' });
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
  
  // Handle file upload
  const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

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
  
  // Handle file upload
  const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

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
        // Delete existing services for this hospital
        await client.query('DELETE FROM services WHERE hospital_id = $1', [id]);

        // Insert new services
        if (services.length > 0) {
            const serviceQuery = `
              INSERT INTO services (hospital_id, name, category, price, discount_price, description)
              VALUES ($1, $2, $3, $4, $5, $6)
            `;
            
            for (const service of services) {
                // Skip empty rows
                if (!service.name) continue; 
                
                await client.query(serviceQuery, [
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
    } catch(err) {
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

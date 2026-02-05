const db = require('../db');

exports.getAllHospitals = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM hospitals ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch hospitals' });
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
  
  try {
    const query = `
      UPDATE hospitals 
      SET name = $1, location = $2, rating = $3, discount_percentage = $4, discount_description = $5, image_url = $6, phone_number = $7, map_url = $8
      WHERE id = $9
      RETURNING *
    `;
    const values = [name, location, rating || 0, discount_percentage || 0, discount_description || '', image_url || '', phone_number || '', map_url || '', id];
    const result = await db.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    res.json({ success: true, hospital: result.rows[0] });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update hospital' });
  }
};

exports.deleteHospital = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM hospitals WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    res.json({ success: true, message: 'Hospital deleted successfully' });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete hospital' });
  }
};

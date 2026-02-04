const db = require('../db');

exports.getAllServices = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT s.*, h.name as hospital_name 
      FROM services s 
      LEFT JOIN hospitals h ON s.hospital_id = h.id 
      ORDER BY s.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch services' });
  }
};

exports.createService = async (req, res) => {
  const { hospital_id, name, category, price, discount_price, description } = req.body;
  try {
    const query = `
      INSERT INTO services (hospital_id, name, category, price, discount_price, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [hospital_id || null, name, category, price, discount_price, description];
    const result = await db.query(query, values);
    
    res.status(201).json({ success: true, service: result.rows[0] });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to create service' });
  }
};

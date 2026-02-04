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
  const { name, location, rating, discount_percentage, discount_description, image_url, phone_number } = req.body;
  try {
    const query = `
      INSERT INTO hospitals (name, location, rating, discount_percentage, discount_description, image_url, phone_number)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [name, location, rating || 0, discount_percentage || 0, discount_description || '', image_url || '', phone_number || ''];
    const result = await db.query(query, values);
    
    res.status(201).json({ success: true, hospital: result.rows[0] });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to create hospital' });
  }
};

exports.updateHospital = async (req, res) => {
  const { id } = req.params;
  const { name, location, rating, discount_percentage, discount_description, image_url, phone_number } = req.body;
  
  try {
    const query = `
      UPDATE hospitals 
      SET name = $1, location = $2, rating = $3, discount_percentage = $4, discount_description = $5, image_url = $6, phone_number = $7
      WHERE id = $8
      RETURNING *
    `;
    const values = [name, location, rating || 0, discount_percentage || 0, discount_description || '', image_url || '', phone_number || '', id];
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

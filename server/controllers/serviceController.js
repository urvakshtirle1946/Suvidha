const db = require('../db');

exports.getAllServices = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const category = req.query.category;
    const hospital_id = req.query.hospital_id;

    let queryText = `
      SELECT s.*, h.name as hospital_name, h.location as hospital_location, h.image_url as hospital_image
      FROM services s 
      LEFT JOIN hospitals h ON s.hospital_id = h.id 
      WHERE 1=1
    `;
    const values = [];
    let placeholderIndex = 1;

    if (category) {
      queryText += ` AND s.category = $${placeholderIndex++}`;
      values.push(category);
    }

    if (hospital_id) {
      queryText += ` AND s.hospital_id = $${placeholderIndex++}`;
      values.push(hospital_id);
    }

    if (req.query.search) {
      queryText += ` AND s.name ILIKE $${placeholderIndex++}`;
      values.push(`%${req.query.search}%`);
    }
    
    // If pagination is requested (page is present), we need count and offset
    if (page && limit) {
      const offset = (page - 1) * limit;
      
      // Get Total Count
      const countRes = await db.query(`SELECT COUNT(*) FROM services s WHERE 1=1 ${category ? 'AND category = $1' : ''} ${hospital_id ? (category ? 'AND hospital_id = $2' : 'AND hospital_id = $1') : ''}`, values);
      const total = parseInt(countRes.rows[0].count);
      
      // Get Paginated Data
      queryText += ` ORDER BY s.created_at DESC LIMIT $${placeholderIndex++} OFFSET $${placeholderIndex++}`;
      values.push(limit, offset);
      
      const result = await db.query(queryText, values);
      
      return res.json({
        data: result.rows,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      });
    }

    // Legacy / Non-paginated (but limit supported) behavior
    queryText += ` ORDER BY s.created_at DESC`;
    if (limit) {
      queryText += ` LIMIT $${placeholderIndex++}`;
      values.push(limit);
    }
    
    const result = await db.query(queryText, values);
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

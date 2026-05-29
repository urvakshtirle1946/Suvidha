const db = require('../db');
const { mockServices } = require('../mockData');

const normalizeDuplicateKeyPart = (value) =>
  String(value || '').trim().replace(/\s+/g, ' ').toLowerCase();

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
    console.log('Serving mock services as fallback...');

    // Simple filter for mock services
    let filtered = [...mockServices];
    if (req.query.category) {
      filtered = filtered.filter(s => s.category === req.query.category);
    }
    if (req.query.hospital_id) {
      filtered = filtered.filter(s => s.hospital_id === req.query.hospital_id);
    }
    if (req.query.limit) {
      filtered = filtered.slice(0, parseInt(req.query.limit));
    }

    res.json(filtered);
  }
};

exports.createService = async (req, res) => {
  const { hospital_id, name, category, price, discount_price, description } = req.body;
  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');

    const normalizedHospitalId = hospital_id || 'global';
    const duplicateKey = [
      'service',
      normalizedHospitalId,
      normalizeDuplicateKeyPart(name),
      normalizeDuplicateKeyPart(category)
    ].join(':');

    await client.query('SELECT pg_advisory_xact_lock(hashtext($1))', [duplicateKey]);

    const existingService = await client.query(
      `
        SELECT id
        FROM services
        WHERE COALESCE(hospital_id::text, 'global') = $1
          AND lower(trim(regexp_replace(name, '[[:space:]]+', ' ', 'g'))) = $2
          AND lower(trim(regexp_replace(category, '[[:space:]]+', ' ', 'g'))) = $3
        LIMIT 1
      `,
      [String(normalizedHospitalId), normalizeDuplicateKeyPart(name), normalizeDuplicateKeyPart(category)]
    );

    if (existingService.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({
        success: false,
        message: 'This service already exists. Please edit the existing entry instead.'
      });
    }

    const query = `
      INSERT INTO services (hospital_id, name, category, price, discount_price, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [hospital_id || null, name, category, price, discount_price, description];
    const result = await client.query(query, values);

    await client.query('COMMIT');

    res.status(201).json({ success: true, service: result.rows[0] });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to create service' });
  } finally {
    client.release();
  }
};

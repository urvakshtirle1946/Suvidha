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
    const sort = req.query.sort || 'recommended';
    const orderBy = {
      lowest_price: 'COALESCE(s.discount_price, s.price) ASC NULLS LAST, h.rating DESC NULLS LAST, s.created_at DESC',
      highest_rated: 'h.rating DESC NULLS LAST, COALESCE(s.discount_price, s.price) ASC NULLS LAST, s.created_at DESC',
      premium: 'h.rating DESC NULLS LAST, COALESCE(s.discount_price, s.price) DESC NULLS LAST, s.created_at DESC',
      fastest: 's.slot_capacity DESC NULLS LAST, h.rating DESC NULLS LAST, COALESCE(s.discount_price, s.price) ASC NULLS LAST',
      recommended: 'h.rating DESC NULLS LAST, s.created_at DESC, COALESCE(s.discount_price, s.price) ASC NULLS LAST'
    }[sort] || 'h.rating DESC NULLS LAST, s.created_at DESC, COALESCE(s.discount_price, s.price) ASC NULLS LAST';

    let queryText = `
      SELECT s.*, h.name as hospital_name, h.location as hospital_location, h.image_url as hospital_image, h.rating as hospital_rating
      FROM services s 
      LEFT JOIN hospitals h ON s.hospital_id = h.id 
      WHERE s.is_active = TRUE
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
      const countRes = await db.query(`SELECT COUNT(*) FROM services s WHERE s.is_active = TRUE ${category ? 'AND category = $1' : ''} ${hospital_id ? (category ? 'AND hospital_id = $2' : 'AND hospital_id = $1') : ''}`, values);
      const total = parseInt(countRes.rows[0].count);

      // Get Paginated Data
      queryText += ` ORDER BY ${orderBy} LIMIT $${placeholderIndex++} OFFSET $${placeholderIndex++}`;
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
    queryText += ` ORDER BY ${orderBy}`;
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

exports.getManagedServices = async (req, res) => {
  try {
    const isAdmin = ['admin', 'super_admin'].includes(req.user?.role);
    const partnerHospitalId = req.user?.hospital_id;
    if (!isAdmin && !partnerHospitalId) {
      return res.status(403).json({ success: false, message: 'Partner account is not assigned to a hospital.' });
    }

    const result = await db.query(
      `SELECT s.*, h.name AS hospital_name, h.location AS hospital_location
       FROM services s
       LEFT JOIN hospitals h ON h.id = s.hospital_id
       WHERE ($1::boolean = TRUE OR s.hospital_id = $2)
       ORDER BY s.created_at DESC`,
      [isAdmin, partnerHospitalId || null]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch managed services.' });
  }
};

exports.createService = async (req, res) => {
  const { hospital_id, name, category, price, discount_price, description, is_active = true, slot_capacity = 1 } = req.body;
  const isAdmin = ['admin', 'super_admin'].includes(req.user?.role);
  const partnerHospitalId = req.user?.hospital_id || req.user?.hospitalId;

  if (!isAdmin && (!partnerHospitalId || String(partnerHospitalId) !== String(hospital_id))) {
    return res.status(403).json({ success: false, message: 'Partners can only create services for their own hospital.' });
  }
  if (!name?.trim() || !Number.isFinite(Number(price)) || Number(price) < 0 ||
      (discount_price !== null && discount_price !== '' && (!Number.isFinite(Number(discount_price)) || Number(discount_price) < 0 || Number(discount_price) > Number(price)))) {
    return res.status(400).json({ success: false, message: 'Provide valid non-negative prices; discounted price cannot exceed original price.' });
  }

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
          AND is_active = TRUE
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
      INSERT INTO services (hospital_id, name, category, price, discount_price, description, is_active, slot_capacity)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [hospital_id || null, name, category, price, discount_price, description, is_active, Math.max(1, parseInt(slot_capacity, 10) || 1)];
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

exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { hospital_id, name, category, price, discount_price, description, is_active = true, slot_capacity = 1 } = req.body;
  const isAdmin = ['admin', 'super_admin'].includes(req.user?.role);
  const partnerHospitalId = req.user?.hospital_id || req.user?.hospitalId;

  if (!isAdmin && (!partnerHospitalId || String(partnerHospitalId) !== String(hospital_id))) {
    return res.status(403).json({ success: false, message: 'Partners can only update services for their own hospital.' });
  }
  if (!name?.trim() || !Number.isFinite(Number(price)) || Number(price) < 0 ||
      (discount_price !== null && discount_price !== '' && (!Number.isFinite(Number(discount_price)) || Number(discount_price) < 0 || Number(discount_price) > Number(price)))) {
    return res.status(400).json({ success: false, message: 'Provide valid non-negative prices; discounted price cannot exceed original price.' });
  }

  try {
    const result = await db.query(
      `UPDATE services
       SET hospital_id = $1,
           name = $2,
           category = $3,
           price = $4,
           discount_price = $5,
           description = $6,
           is_active = $7,
           slot_capacity = $8
       WHERE id = $9
         AND ($10::boolean = TRUE OR hospital_id = $11)
       RETURNING *`,
      [
        hospital_id || null,
        name,
        category,
        price,
        discount_price,
        description,
        is_active,
        Math.max(1, parseInt(slot_capacity, 10) || 1),
        id,
        isAdmin,
        partnerHospitalId || null,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    res.json({ success: true, service: result.rows[0] });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update service' });
  }
};

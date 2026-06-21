const db = require('../db');
const { mockServices } = require('../mockData');
const pdfParse = require('pdf-parse');

const normalizeDuplicateKeyPart = (value) =>
  String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');

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
      WHERE s.is_active = TRUE AND s.is_deleted = FALSE
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
      const countRes = await db.query(`SELECT COUNT(*) FROM services s WHERE s.is_active = TRUE AND s.is_deleted = FALSE ${category ? 'AND category = $1' : ''} ${hospital_id ? (category ? 'AND hospital_id = $2' : 'AND hospital_id = $1') : ''}`, values);
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
       WHERE ($1::boolean = TRUE OR s.hospital_id = $2) AND s.is_deleted = FALSE
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
        SELECT id, is_deleted
        FROM services
        WHERE COALESCE(hospital_id::text, 'global') = $1
          AND regexp_replace(lower(name), '[^a-z0-9]', '', 'g') = $2
          AND regexp_replace(lower(category), '[^a-z0-9]', '', 'g') = $3
        LIMIT 1
      `,
      [String(normalizedHospitalId), normalizeDuplicateKeyPart(name), normalizeDuplicateKeyPart(category)]
    );

    if (existingService.rows.length > 0) {
      const isDeleted = existingService.rows[0].is_deleted;
      if (isDeleted) {
        const parsedCapacity = parseInt(slot_capacity, 10);
        const capacityVal = (parsedCapacity === -1 || Number.isNaN(parsedCapacity)) ? -1 : Math.max(1, parsedCapacity);
        const updateQuery = `
          UPDATE services
          SET price = $1,
              discount_price = $2,
              description = $3,
              is_active = $4,
              slot_capacity = $5,
              is_deleted = FALSE
          WHERE id = $6
          RETURNING *
        `;
        const updateResult = await client.query(updateQuery, [price, discount_price, description, is_active, capacityVal, existingService.rows[0].id]);
        await client.query('COMMIT');
        return res.status(201).json({ success: true, service: updateResult.rows[0], message: 'Service reactivated successfully.' });
      } else {
        await client.query('ROLLBACK');
        return res.status(409).json({
          success: false,
          message: 'This service already exists. Please edit the existing entry instead.'
        });
      }
    }

    const query = `
      INSERT INTO services (hospital_id, name, category, price, discount_price, description, is_active, slot_capacity)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const parsedCapacity = parseInt(slot_capacity, 10);
    const capacityVal = (parsedCapacity === -1 || Number.isNaN(parsedCapacity)) ? -1 : Math.max(1, parsedCapacity);
    const values = [hospital_id || null, name, category, price, discount_price, description, is_active, capacityVal];
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
        (() => {
            const parsedCapacity = parseInt(slot_capacity, 10);
            return (parsedCapacity === -1 || Number.isNaN(parsedCapacity)) ? -1 : Math.max(1, parsedCapacity);
        })(),
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

exports.importServicesFromDocument = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload a PDF or image file.' });
  }

  const nvidiaKey = process.env.NVIDIA_API_KEY;
  if (!nvidiaKey) {
    return res.status(500).json({ success: false, message: 'NVIDIA API Key is not configured.' });
  }

  const mimetype = req.file.mimetype;
  const isPDF = mimetype === 'application/pdf';
  const isImage = mimetype.startsWith('image/');

  if (!isPDF && !isImage) {
    return res.status(400).json({ success: false, message: 'Unsupported file type. Only PDF and images are allowed.' });
  }

  try {
    let aiResponseText = '';

    if (isPDF) {
      console.log('[AI Import] Parsing PDF text...');
      const parsedPdf = await pdfParse(req.file.buffer);
      const textContent = parsedPdf.text || '';
      
      if (!textContent.trim()) {
        return res.status(400).json({ success: false, message: 'Uploaded PDF has no extractable text.' });
      }

      console.log('[AI Import] Sending PDF text to NVIDIA NIM...');
      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${nvidiaKey}`,
        },
        body: JSON.stringify({
          model: 'meta/llama-3.1-8b-instruct',
          messages: [
            {
              role: 'system',
              content: `You are an expert data parsing assistant. Your task is to analyze the raw text extracted from a medical/diagnostic document and extract a list of services, tests, prices, and optionally the hospital name.
              
              You MUST output ONLY a valid JSON array of objects representing the services. Do not include any extra text, code blocks, or explanations. 

              For each service, extract or infer the following keys:
              - "name": (string, e.g., "MRI Brain (Plain)", "Complete Blood Count (CBC)")
              - "category": (string, MUST be exactly one of 'Lab', 'Scan', 'OPD', 'Surgery')
              - "price": (number, the standard retail price of the test)
              - "discount_price": (number or null, the discounted price of the test)
              - "description": (string, a brief medical description of what the test does)
              - "slot_capacity": (integer, typical number of bookings allowed per slot, MUST be set to -1 for all services)
              - "hospital_name": (string or null, name of the hospital or diagnostic center providing it)
              
              Example JSON output structure:
              [
                {
                  "name": "Complete Blood Count (CBC)",
                  "category": "Lab",
                  "price": 450,
                  "discount_price": 299,
                  "description": "Checks overall health and detects anemia/infection.",
                  "slot_capacity": 10,
                  "hospital_name": "Gokuldas Hospital"
                }
              ]`
            },
            {
              role: 'user',
              content: `Extract services from this text:\n\n${textContent}`
            }
          ],
          temperature: 0.1,
          max_tokens: 4096,
        }),
      });

      if (!response.ok) {
        throw new Error(`NVIDIA NIM text API returned error ${response.status}`);
      }

      const responseData = await response.json();
      aiResponseText = responseData.choices[0].message.content.trim();
    } else {
      // It's an image
      console.log('[AI Import] Processing image with NVIDIA NIM Vision...');
      const base64Data = req.file.buffer.toString('base64');
      const imageUrl = `data:${mimetype};base64,${base64Data}`;

      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${nvidiaKey}`,
        },
        body: JSON.stringify({
          model: 'meta/llama-3.2-11b-vision-instruct',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Analyze this image (which is a list, brochure, or bill of medical diagnostic services) and extract a list of services, tests, prices, and optionally the hospital name.
                  
                  You MUST output ONLY a valid JSON array of objects representing the services. Do not include any extra text, code blocks, or explanations. 

                  For each service, extract or infer the following keys:
                  - "name": (string, e.g., "MRI Brain (Plain)", "Complete Blood Count (CBC)")
                  - "category": (string, MUST be exactly one of 'Lab', 'Scan', 'OPD', 'Surgery')
                  - "price": (number, the standard retail price of the test)
                  - "discount_price": (number or null, the discounted price of the test)
                  - "description": (string, a brief medical description of what the test does)
                  - "slot_capacity": (integer, typical number of bookings allowed per slot, MUST be set to -1 for all services)
                  - "hospital_name": (string or null, name of the hospital or diagnostic center providing it)
                  
                  Format strictly as a JSON array of objects.`
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: imageUrl
                  }
                }
              ]
            }
          ],
          temperature: 0.1,
          max_tokens: 4096,
        }),
      });

      if (!response.ok) {
        throw new Error(`NVIDIA NIM vision API returned error ${response.status}`);
      }

      const responseData = await response.json();
      aiResponseText = responseData.choices[0].message.content.trim();
    }

    console.log('[AI Import] Raw NVIDIA response:', aiResponseText);

    // Clean up markdown code block wrapper if present
    let cleanJSONText = aiResponseText.trim();
    if (cleanJSONText.startsWith('```json')) {
      cleanJSONText = cleanJSONText.substring(7);
    } else if (cleanJSONText.startsWith('```')) {
      cleanJSONText = cleanJSONText.substring(3);
    }
    if (cleanJSONText.endsWith('```')) {
      cleanJSONText = cleanJSONText.substring(0, cleanJSONText.length - 3);
    }
    cleanJSONText = cleanJSONText.trim();

    let extractedServices = [];
    try {
      let jsonText = cleanJSONText;
      const firstBracket = cleanJSONText.indexOf('[');
      const lastBracket = cleanJSONText.lastIndexOf(']');
      
      if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
        jsonText = cleanJSONText.substring(firstBracket, lastBracket + 1);
      } else {
        const firstBrace = cleanJSONText.indexOf('{');
        const lastBrace = cleanJSONText.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          jsonText = cleanJSONText.substring(firstBrace, lastBrace + 1);
        }
      }

      // Sanitize JSON text to remove comments and trailing commas
      let sanitizedJson = jsonText
        .replace(/\/\*[\s\S]*?\*\//g, '') // remove multi-line comments
        .replace(/\/\/.*/g, '')           // remove single-line comments
        .replace(/,\s*([\]}])/g, '$1')    // remove trailing commas
        .trim();
      
      const parsedData = JSON.parse(sanitizedJson);
      if (Array.isArray(parsedData)) {
        extractedServices = parsedData;
      } else if (parsedData && typeof parsedData === 'object') {
        const arrayKey = Object.keys(parsedData).find(key => Array.isArray(parsedData[key]));
        if (arrayKey) {
          extractedServices = parsedData[arrayKey];
        } else {
          extractedServices = [parsedData];
        }
      }
    } catch (parseError) {
      console.error('[AI Import] JSON parsing failed:', parseError, 'Raw response:', aiResponseText);
      throw new Error(`Failed to parse a valid JSON array from AI output. Error: ${parseError.message}. Output snippet: ${aiResponseText.substring(0, 500)}`);
    }

    if (!Array.isArray(extractedServices) || extractedServices.length === 0) {
      throw new Error(`AI output parsed, but was not a valid non-empty JSON array. Output snippet: ${aiResponseText.substring(0, 500)}`);
    }

    console.log(`[AI Import] Extracted ${extractedServices.length} services. Synchronizing with DB...`);

    // Fetch all hospitals to match
    const hospitalsRes = await db.query('SELECT id, name FROM hospitals');
    const dbHospitals = hospitalsRes.rows;

    const isAdmin = ['admin', 'super_admin'].includes(req.user?.role);
    const partnerHospitalId = req.user?.hospital_id || req.user?.hospitalId;

    let addedCount = 0;
    let updatedCount = 0;
    const processedServices = [];

    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');

      for (const item of extractedServices) {
        // 1. Determine hospital_id
        let resolvedHospitalId = null;
        if (!isAdmin) {
          // Partners can ONLY import services for their own hospital
          resolvedHospitalId = partnerHospitalId;
        } else if (item.hospital_name) {
          // Admins can import for any hospital mentioned in the document
          const matchedHosp = dbHospitals.find(h => 
            h.name.toLowerCase().trim() === item.hospital_name.toLowerCase().trim() ||
            h.name.toLowerCase().replace(/\s+/g, '').includes(item.hospital_name.toLowerCase().replace(/\s+/g, '')) ||
            item.hospital_name.toLowerCase().replace(/\s+/g, '').includes(h.name.toLowerCase().replace(/\s+/g, ''))
          );
          if (matchedHosp) {
            resolvedHospitalId = matchedHosp.id;
          }
        }

        // If still no hospital resolved, default to partner's hospital, or omit
        if (!resolvedHospitalId && partnerHospitalId) {
          resolvedHospitalId = partnerHospitalId;
        }

        const name = String(item.name || '').trim();
        const category = String(item.category || 'Lab').trim();
        const price = Number(item.price) || 0;
        const discountPrice = item.discount_price !== undefined ? Number(item.discount_price) : null;
        const description = String(item.description || '').trim();
        const rawCapacity = item.slot_capacity !== undefined ? parseInt(item.slot_capacity, 10) : -1;
        const slotCapacity = (rawCapacity === -1 || Number.isNaN(rawCapacity)) ? -1 : Math.max(1, rawCapacity);

        if (!name || price <= 0) {
          console.log(`[AI Import] Skipping invalid service row: ${JSON.stringify(item)}`);
          continue;
        }

        // Acquire lock for concurrency safety
        const normalizedHospitalId = resolvedHospitalId || 'global';
        const duplicateKey = [
          'service',
          normalizedHospitalId,
          normalizeDuplicateKeyPart(name),
          normalizeDuplicateKeyPart(category)
        ].join(':');

        await client.query('SELECT pg_advisory_xact_lock(hashtext($1))', [duplicateKey]);

        // Check if exists
        const existingRes = await client.query(
          `
            SELECT id
            FROM services
            WHERE COALESCE(hospital_id::text, 'global') = $1
              AND regexp_replace(lower(name), '[^a-z0-9]', '', 'g') = $2
              AND regexp_replace(lower(category), '[^a-z0-9]', '', 'g') = $3
            LIMIT 1
          `,
          [String(normalizedHospitalId), normalizeDuplicateKeyPart(name), normalizeDuplicateKeyPart(category)]
        );

        if (existingRes.rows.length > 0) {
          // Update
          const serviceId = existingRes.rows[0].id;
          const updateQuery = `
            UPDATE services 
            SET price = $1, discount_price = $2, description = $3, slot_capacity = $4, is_active = TRUE, is_deleted = FALSE
            WHERE id = $5
            RETURNING *
          `;
          const updated = await client.query(updateQuery, [price, discountPrice, description, slotCapacity, serviceId]);
          updatedCount++;
          processedServices.push(updated.rows[0]);
        } else {
          // Insert
          const insertQuery = `
            INSERT INTO services (hospital_id, name, category, price, discount_price, description, slot_capacity)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
          `;
          const inserted = await client.query(insertQuery, [resolvedHospitalId, name, category, price, discountPrice, description, slotCapacity]);
          addedCount++;
          processedServices.push(inserted.rows[0]);
        }
      }

      await client.query('COMMIT');
      res.status(200).json({
        success: true,
        message: `Successfully imported services: ${addedCount} added, ${updatedCount} updated.`,
        addedCount,
        updatedCount,
        services: processedServices
      });
    } catch (dbErr) {
      await client.query('ROLLBACK');
      throw dbErr;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('[AI Import] Error importing services:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to import services from document.' });
  }
};
exports.deleteService = async (req, res) => {
  const { id } = req.params;
  const isAdmin = ['admin', 'super_admin'].includes(req.user?.role);
  const partnerHospitalId = req.user?.hospital_id || req.user?.hospitalId;

  try {
    const result = await db.query(
      `UPDATE services
       SET is_deleted = TRUE
       WHERE id = $1
         AND ($2::boolean = TRUE OR hospital_id = $3)
       RETURNING *`,
      [id, isAdmin, partnerHospitalId || null]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Service not found or unauthorized.' });
    }

    res.json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete service.' });
  }
};

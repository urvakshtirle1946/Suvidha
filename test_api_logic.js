const db = require('./server/db');

async function test() {
    try {
        const req = {
            query: { limit: '8' }
        };
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
        
        if (page && limit) {
             console.log("Paginated block");
        } else {
            queryText += ` ORDER BY s.created_at DESC`;
            if (limit) {
              queryText += ` LIMIT $${placeholderIndex++}`;
              values.push(limit);
            }
            console.log("Query:", queryText);
            console.log("Values:", values);
            const result = await db.query(queryText, values);
            console.log("Result rows type:", Array.isArray(result.rows));
            console.log("Result length:", result.rows.length);
        }
    } catch (e) {
        console.error("FAILED:", e);
    } finally {
        process.exit();
    }
}

test();

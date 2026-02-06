const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('./db');

const fixGokuldasImage = async () => {
    try {
        // Update to match the exact filename found on disk
        const res = await db.query(
            "UPDATE hospitals SET image_url = '/uploads/Gokuldas.jpg' WHERE name ILIKE '%Gokuldas%' RETURNING *"
        );
        console.log("Updated image path for:", res.rows[0]?.name);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixGokuldasImage();

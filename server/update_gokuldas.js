const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('./db');

const updateHospital = async () => {
    try {
        // Update Gokuldas Hospital image to the standard name we are asking the user to use
        const res = await db.query(
            "UPDATE hospitals SET image_url = '/uploads/gokuldas.jpg' WHERE name ILIKE '%Gokuldas%' RETURNING *"
        );
        
        if (res.rows.length > 0) {
            console.log("Updated hospital image:", res.rows[0].name);
        } else {
            console.log("Hospital not found.");
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

updateHospital();

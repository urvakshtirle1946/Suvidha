const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('./db');

const checkHospital = async () => {
    try {
        const res = await db.query("SELECT id, name, image_url FROM hospitals WHERE name ILIKE '%Gokuldas%'");
        if (res.rows.length > 0) {
            console.log("Found hospital:", res.rows[0]);
        } else {
            console.log("Hospital not found.");
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkHospital();

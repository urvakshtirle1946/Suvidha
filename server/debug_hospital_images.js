const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('./db');

const checkAllHospitals = async () => {
    try {
        const res = await db.query("SELECT id, name, image_url FROM hospitals");
        console.log("Current Hospital Data:");
        res.rows.forEach(row => {
            console.log(`ID: ${row.id} | Name: ${row.name} | Image: ${row.image_url}`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkAllHospitals();

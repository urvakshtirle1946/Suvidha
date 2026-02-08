const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('./db');

const verify = async () => {
    try {
        const res = await db.query("SELECT image_url, COUNT(*) FROM hospitals GROUP BY image_url");
        console.log("Image URL Distribution:");
        res.rows.forEach(row => {
            console.log(`${row.image_url}: ${row.count}`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verify();

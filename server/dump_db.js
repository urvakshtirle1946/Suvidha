const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('./db');
const fs = require('fs');

const run = async () => {
    try {
        const res = await db.query("SELECT id, name, image_url FROM hospitals");
        let out = "";
        res.rows.forEach(row => {
            out += `ID: ${row.id} | Name: ${row.name} | Image: ${row.image_url}\n`;
        });
        fs.writeFileSync(path.resolve(__dirname, 'db_dump.txt'), out);
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
};
run();

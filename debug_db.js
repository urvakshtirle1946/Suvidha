const db = require('./server/db');

async function debugServices() {
    try {
        const res = await db.query('SELECT count(*) FROM services');
        console.log('Total Services in DB:', res.rows[0].count);
        
        const res2 = await db.query('SELECT * FROM services LIMIT 5');
        console.log('Sample Services:', res2.rows);
        
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

debugServices();

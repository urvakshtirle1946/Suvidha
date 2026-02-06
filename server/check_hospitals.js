const db = require('./db');

async function check() {
    try {
        const res = await db.query('SELECT id, name, phone_number FROM hospitals LIMIT 5');
        console.log('--- Hospitals Check ---');
        console.log(JSON.stringify(res.rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();

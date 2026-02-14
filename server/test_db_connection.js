const db = require('./db');

async function testConnection() {
    try {
        console.log('Testing connection to:', process.env.DATABASE_URL ? 'URL exists but hidden' : 'NULL');
        const res = await db.query('SELECT NOW()');
        console.log('Connection successful!', res.rows[0]);
        
        const tables = await db.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log('Tables in database:', tables.rows.map(r => r.table_name));
        
        const serviceCount = await db.query('SELECT COUNT(*) FROM services');
        console.log('Services count:', serviceCount.rows[0].count);
        
        const userCount = await db.query('SELECT COUNT(*) FROM users');
        console.log('Users count:', userCount.rows[0].count);

    } catch (err) {
        console.error('Connection failed:', err.message);
    } finally {
        process.exit();
    }
}

testConnection();

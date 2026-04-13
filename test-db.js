const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    require: true
  }
});

async function testConnection() {
  try {
    console.log('Testing connection to:', process.env.DATABASE_URL.split('@')[1]);
    const res = await pool.query('SELECT NOW()');
    console.log('Connection successful:', res.rows[0]);
    
    console.log('Checking tables...');
    const tables = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log('Tables:', tables.rows.map(r => r.table_name));

    await pool.end();
  } catch (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
}

testConnection();

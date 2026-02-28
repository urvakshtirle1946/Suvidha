require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function testDB() {
  try {
    const res = await pool.query(`SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'users';`);
    console.table(res.rows);
    
    // Also fetch a few users
    const users = await pool.query(`SELECT id, name, email, role, created_at FROM users ORDER BY id DESC LIMIT 5`);
    console.log("Recent users:", users.rows);
    
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

testDB();

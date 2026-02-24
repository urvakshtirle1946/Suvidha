require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function runMigration() {
  try {
    console.log("Starting migration to make 'phone' column nullable...");
    await pool.query('ALTER TABLE users ALTER COLUMN phone DROP NOT NULL;');
    console.log("Migration successful: 'phone' is now nullable.");
  } catch (err) {
    if (err.code === '42703') {
        // column "phone" of relation "users" does not exist (unlikely but safe)
        console.error("Column 'phone' does not exist in 'users' table.");
    } else {
        console.error("Migration failed:", err);
    }
  } finally {
    pool.end();
  }
}

runMigration();

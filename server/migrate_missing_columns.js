require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function runMigration() {
  try {
    console.log("Starting migration: ensuring users table has manual auth fields...");

    try {
      await pool.query('ALTER TABLE users ADD COLUMN email VARCHAR(255);');
      console.log("Added 'email' column.");
    } catch (e) {
      if (e.code !== '42701') throw e;
    }

    try {
      await pool.query('ALTER TABLE users ADD COLUMN password VARCHAR(255);');
      console.log("Added 'password' column.");
    } catch (e) {
      if (e.code !== '42701') throw e;
    }

    console.log("Migration complete (manual auth fields checked).");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    pool.end();
  }
}

runMigration();

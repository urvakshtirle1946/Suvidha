require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function runMigration() {
  try {
    console.log("Starting migration: checking 'users' table columns...");
    
    // Add authgear_id
    try {
        await pool.query('ALTER TABLE users ADD COLUMN authgear_id VARCHAR(255) UNIQUE;');
        console.log("Successfully added 'authgear_id' column.");
    } catch (e) {
        if (e.code === '42701') console.log("'authgear_id' already exists.");
        else throw e;
    }
    
    // Just in case, add phone_verified if it's also missing from prod
     try {
        await pool.query('ALTER TABLE users ADD COLUMN phone_verified BOOLEAN DEFAULT FALSE;');
        console.log("Successfully added 'phone_verified' column.");
    } catch (e) {
        if (e.code === '42701') console.log("'phone_verified' already exists.");
        else throw e;
    }

    console.log("Migration complete.");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    pool.end();
  }
}

runMigration();

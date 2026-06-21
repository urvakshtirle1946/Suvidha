const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
const envPath = fs.existsSync(path.resolve(__dirname, '../../.env')) 
  ? path.resolve(__dirname, '../../.env') 
  : path.resolve(__dirname, '../.env');
require('dotenv').config({ path: envPath });

// Workaround for self-signed certificates (Aiven/Heroku)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    require: true
  }
});

const initDbSchema = async () => {
  try {
    const schemaPath = path.resolve(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      console.log('[Database] Running automatic schema migration check...');
      await pool.query(schemaSql);
      
      // Ensure unique phone constraint exists
      try {
        await pool.query('ALTER TABLE users ADD CONSTRAINT users_phone_key UNIQUE (phone)');
        console.log('[Database] Ensured unique constraint users_phone_key on users(phone).');
      } catch (err) {
        if (err.code !== '42710') { // 42710 is duplicate_relation (meaning constraint already exists)
          console.error('[Database] Warning trying to add users_phone_key:', err.message);
        }
      }

      // Ensure is_deleted column exists on services
      try {
        await pool.query('ALTER TABLE services ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE');
        console.log('[Database] Ensured column is_deleted on services.');
      } catch (err) {
        console.error('[Database] Warning trying to add is_deleted to services:', err.message);
      }

      console.log('[Database] Schema sync complete.');
    } else {
      console.warn('[Database] schema.sql not found, skipping schema check.');
    }
  } catch (err) {
    console.error('[Database] Schema initialization failed:', err.message);
    throw err;
  }
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: pool,
  initDbSchema
};

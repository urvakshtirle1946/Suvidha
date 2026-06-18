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

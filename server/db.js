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

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: pool
};

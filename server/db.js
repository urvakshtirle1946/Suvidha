const { Pool } = require('pg');
require('dotenv').config();

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

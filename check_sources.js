const db = require('./server/db');
require('dotenv').config();

async function checkSources() {
  try {
    const result = await db.query('SELECT DISTINCT source FROM waitlist_signups');
    console.log('Unique sources:', result.rows);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkSources();

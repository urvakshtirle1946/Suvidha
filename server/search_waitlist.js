const db = require('./db');
require('dotenv').config({ path: '../.env' });

async function searchTable() {
  try {
    const result = await db.query("SELECT * FROM waitlist_signups WHERE name ILIKE '%waitlist.me%' OR email ILIKE '%waitlist.me%' OR source ILIKE '%waitlist.me%' OR status ILIKE '%waitlist.me%'");
    console.log('Search results:', result.rows);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

searchTable();

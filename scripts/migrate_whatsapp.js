const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../server/.env') });
const db = require('../server/db');

const migrate = async () => {
  try {
    console.log('Starting migration...');
    
    // 1. Add phone_number to hospitals
    await db.query(`
      ALTER TABLE hospitals 
      ADD COLUMN IF NOT EXISTS phone_number VARCHAR(50);
    `);
    console.log('Added phone_number to hospitals table.');

    // 2. Add hospital_id to bookings
    await db.query(`
      ALTER TABLE bookings 
      ADD COLUMN IF NOT EXISTS hospital_id INTEGER;
    `);
    console.log('Added hospital_id to bookings table.');
    
    console.log('Migration completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
};

migrate();

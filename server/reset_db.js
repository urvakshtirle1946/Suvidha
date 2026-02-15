const db = require('./db');

const resetDb = async () => {
  try {
    console.log('Dropping tables...');
    await db.query('DROP TABLE IF EXISTS otp_codes CASCADE');
    await db.query('DROP TABLE IF EXISTS bookings CASCADE');
    await db.query('DROP TABLE IF EXISTS services CASCADE');
    await db.query('DROP TABLE IF EXISTS hospital_specialties CASCADE');
    await db.query('DROP TABLE IF EXISTS specialties CASCADE');
    await db.query('DROP TABLE IF EXISTS hospitals CASCADE');
    await db.query('DROP TABLE IF EXISTS users CASCADE');
    console.log('Tables dropped successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error dropping tables:', err);
    process.exit(1);
  }
};

resetDb();

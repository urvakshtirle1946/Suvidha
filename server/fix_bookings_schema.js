const db = require('./db');

async function addColumns() {
  try {
    console.log('Adding missing columns to bookings table...');
    
    // Add hospital_id
    await db.query(`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='hospital_id') THEN 
          ALTER TABLE bookings ADD COLUMN hospital_id INT; 
        END IF; 
      END $$;
    `);
    console.log('Added hospital_id column.');

    // Add user_email
    await db.query(`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='user_email') THEN 
          ALTER TABLE bookings ADD COLUMN user_email VARCHAR(255); 
        END IF; 
      END $$;
    `);
    console.log('Added user_email column.');

    // Add transaction_id
    await db.query(`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='transaction_id') THEN 
          ALTER TABLE bookings ADD COLUMN transaction_id VARCHAR(255); 
        END IF; 
      END $$;
    `);
    console.log('Added transaction_id column.');

    console.log('Migration completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

addColumns();

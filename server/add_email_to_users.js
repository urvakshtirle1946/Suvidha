const db = require('./db');

async function addEmailColumn() {
  try {
    // Check if email column exists
    const checkColumn = await db.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='users' AND column_name='email';
    `);

    if (checkColumn.rows.length === 0) {
      console.log('Adding email column to users table...');
      await db.query('ALTER TABLE users ADD COLUMN email VARCHAR(255);');
      console.log('Email column added successfully.');
    } else {
      console.log('Email column already exists.');
    }
    
    // Also check for name and role columns since the schema.sql didn't show them but the code uses them
    const checkName = await db.query(`SELECT column_name FROM information_schema.columns WHERE table_name='users' AND column_name='name';`);
    if (checkName.rows.length === 0) {
        console.log('Adding name column to users table...');
        await db.query('ALTER TABLE users ADD COLUMN name VARCHAR(255);');
    }

    const checkRole = await db.query(`SELECT column_name FROM information_schema.columns WHERE table_name='users' AND column_name='role';`);
    if (checkRole.rows.length === 0) {
        console.log('Adding role column to users table...');
        await db.query('ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT \'user\';');
    }

  } catch (err) {
    console.error('Error modifying users table:', err);
  } finally {
    process.exit();
  }
}

addEmailColumn();

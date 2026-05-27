const db = require('./db');

async function addPasswordColumn() {
  try {
    // Check if password column exists
    const checkColumn = await db.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='users' AND column_name='password';
    `);

    if (checkColumn.rows.length === 0) {
      console.log('Adding password column to users table...');
      await db.query('ALTER TABLE users ADD COLUMN password VARCHAR(255);');
      console.log('Password column added successfully.');
    } else {
      console.log('Password column already exists.');
    }

  } catch (err) {
    console.error('Error modifying users table:', err);
  } finally {
    process.exit();
  }
}

addPasswordColumn();

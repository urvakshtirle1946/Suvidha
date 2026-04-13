const db = require('./server/db');

const ensureWaitlistTable = async () => {
  try {
    console.log('Ensuring waitlist_signups table exists...');
    await db.query(`
      CREATE TABLE IF NOT EXISTS waitlist_signups (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        google_id VARCHAR(255) UNIQUE,
        source VARCHAR(50) NOT NULL DEFAULT 'google',
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table check/create successful.');

    console.log('Ensuring index exists...');
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_waitlist_signups_created_at
      ON waitlist_signups (created_at DESC);
    `);
    console.log('Index check/create successful.');
  } catch (err) {
    console.error('Error in ensureWaitlistTable:', err);
    throw err;
  }
};

async function testWaitlist() {
  const testEmail = `test_${Date.now()}@example.com`;
  try {
    await ensureWaitlistTable();
    
    console.log(`Attempting to join waitlist with email: ${testEmail}`);
    const result = await db.query(
      `INSERT INTO waitlist_signups (name, email, source, status, updated_at)
       VALUES ('Test User', $1, 'email', 'pending', CURRENT_TIMESTAMP)
       ON CONFLICT (email)
       DO UPDATE SET
         source = 'email',
         status = 'pending',
         updated_at = CURRENT_TIMESTAMP
       RETURNING id, name, email, source, status, created_at, updated_at`,
      [testEmail]
    );
    console.log('Insert successful:', result.rows[0]);

    // Test conflict
    console.log('Testing conflict (same email)...');
    const resultConflict = await db.query(
      `INSERT INTO waitlist_signups (name, email, source, status, updated_at)
       VALUES ('Test User Duplicate', $1, 'email', 'pending', CURRENT_TIMESTAMP)
       ON CONFLICT (email)
       DO UPDATE SET
         source = 'email',
         status = 'pending',
         updated_at = CURRENT_TIMESTAMP
       RETURNING id, name, email, source, status, created_at, updated_at`,
      [testEmail]
    );
    console.log('Conflict handle successful:', resultConflict.rows[0]);

  } catch (err) {
    console.error('Waitlist test FAILED:', err);
  } finally {
    process.exit();
  }
}

testWaitlist();

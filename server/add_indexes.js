const db = require('./db');

async function addIndexes() {
  const client = await db.pool.connect();
  try {
    console.log('Starting Index Creation...');
    await client.query('BEGIN');

    // 1. Index for Foreign Key (Crucial for Joins)
    console.log('Adding index on services(hospital_id)...');
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_services_hospital_id 
      ON services(hospital_id);
    `);

    // 2. Index for Category (used in popular services filter if expanded, or admin filtering)
    console.log('Adding index on services(category)...');
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_services_category 
      ON services(category);
    `);

    // 3. Index for Hospital Rating (used in sorting/filtering)
    console.log('Adding index on hospitals(rating)...');
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_hospitals_rating 
      ON hospitals(rating DESC);
    `);

    await client.query('COMMIT');
    console.log('Indexes added successfully.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error adding indexes:', err);
  } finally {
    client.release();
    process.exit();
  }
}

addIndexes();

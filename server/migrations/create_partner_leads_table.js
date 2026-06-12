const db = require('../db');

async function createPartnerLeadsTable() {
  try {
    console.log('Ensuring partner_leads table exists...');
    await db.query(`
      CREATE TABLE IF NOT EXISTS partner_leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        entity_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        entity_type VARCHAR(50) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('partner_leads table check completed successfully.');
  } catch (err) {
    console.error('Error creating partner_leads table:', err);
    throw err;
  }
}

module.exports = createPartnerLeadsTable;

if (require.main === module) {
  createPartnerLeadsTable()
    .then(() => {
      console.log('Migration completed successfully.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Migration failed:', err);
      process.exit(1);
    });
}

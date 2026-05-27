const db = require('./db');

async function migrateRemoveUserPhoneOauthColumns() {
  try {
    console.log('Starting migration: remove phone/OAuth columns from users...');

    await db.query('ALTER TABLE users DROP COLUMN IF EXISTS phone CASCADE;');
    await db.query('ALTER TABLE users DROP COLUMN IF EXISTS authgear_id CASCADE;');
    await db.query('ALTER TABLE users DROP COLUMN IF EXISTS phone_verified CASCADE;');

    console.log('Migration complete: users.phone, users.authgear_id, users.phone_verified removed.');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exitCode = 1;
  } finally {
    if (db.pool?.end) {
      await db.pool.end();
    }
  }
}

migrateRemoveUserPhoneOauthColumns();

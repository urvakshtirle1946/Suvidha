const db = require('./db');
const fs = require('fs');

async function testConnection() {
  let log = 'Testing connection...\n';
  try {
    const res = await db.query('SELECT NOW()');
    log += `Connection successful: ${JSON.stringify(res.rows[0])}\n`;

    const hCount = await db.query('SELECT COUNT(*) FROM hospitals');
    log += `Hospitals Count: ${hCount.rows[0].count}\n`;

    const sCount = await db.query('SELECT COUNT(*) FROM services');
    log += `Services Count: ${sCount.rows[0].count}\n`;

    // List hospital names
    const hNames = await db.query('SELECT name FROM hospitals');
    log += `Hospital Names: ${hNames.rows.map(h => h.name).join(', ')}\n`;

  } catch (err) {
    log += `Database Error: ${err.message}\nStack: ${err.stack}\nFull Error: ${JSON.stringify(err, null, 2)}\n`;
  } finally {
    fs.writeFileSync('db_test_output.txt', log);
    process.exit();
  }
}

testConnection();

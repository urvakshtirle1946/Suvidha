require('dotenv').config({ path: '../.env' });
const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function run() {
    await client.connect();
    try {
        const req = await client.query(
            'INSERT INTO users (name, email, role, authgear_id, phone_verified) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            ['Test Name', 'test@test.com', 'user', '123google', false]
        );
        console.log('Insert success!', req.rows[0]);
        await client.query('DELETE FROM users WHERE email = $1', ['test@test.com']);
        console.log('Cleanup success!');
    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await client.end();
    }
}
run();

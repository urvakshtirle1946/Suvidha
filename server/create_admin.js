const pool = require('./db');
const bcrypt = require('bcryptjs');

async function createAdminUsers() {
    const adminUsers = [
        { name: 'Admin One', email: 'admin1@suvidha.com' },
        { name: 'Admin Two', email: 'admin2@suvidha.com' }
    ];
    const newPassword = 'urvakshh123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    try {
        for (const admin of adminUsers) {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [admin.email]);
            if (result.rows.length === 0) {
                await pool.query(
                    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
                    [admin.name, admin.email, hashedPassword, 'admin']
                );
                console.log(`Admin user created: ${admin.email}`);
            } else {
                await pool.query('UPDATE users SET password = $1, role = $2 WHERE email = $3', [hashedPassword, 'admin', admin.email]);
                console.log(`Admin user updated: ${admin.email}`);
            }
        }
    } catch (err) {
        console.error('Error creating admin users:', err);
    } finally {
        process.exit();
    }
}

createAdminUsers();

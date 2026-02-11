const pool = require('./db');
const bcrypt = require('bcryptjs');

async function createAdminUsers() {
    const adminPhones = ['1234567890', '7777777777'];
    const newPassword = 'urvakshh123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    try {
        for (const phone of adminPhones) {
            const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
            if (result.rows.length === 0) {
                // Insert admin
                await pool.query(
                    'INSERT INTO users (name, email, phone, password, role) VALUES ($1, $2, $3, $4, $5)',
                    [`Admin ${phone}`, `admin_${phone}@suvidha.com`, phone, hashedPassword, 'admin']
                );
                console.log(`Admin user created: ${phone}`);
            } else {
                // Update password
                await pool.query('UPDATE users SET password = $1, role = $2 WHERE phone = $3', [hashedPassword, 'admin', phone]);
                console.log(`Admin user updated: ${phone}`);
            }
        }
    } catch (err) {
        console.error('Error creating admin users:', err);
    } finally {
        process.exit();
    }
}

createAdminUsers();

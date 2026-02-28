const pool = require('./db');
const bcrypt = require('bcryptjs');

async function updateAdminPassword() {
    const adminEmails = ['admin1@suvidha.com', 'admin2@suvidha.com'];
    const newPassword = 'urvakshh123';
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        for (const email of adminEmails) {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            if (result.rows.length > 0) {
                await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
                console.log(`Password updated for admin: ${email}`);
            } else {
                console.log(`Admin user with email ${email} not found in database.`);
            }
        }
    } catch (err) {
        console.error('Error updating admin password:', err);
    } finally {
        process.exit();
    }
}

updateAdminPassword();

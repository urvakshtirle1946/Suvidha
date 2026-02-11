const pool = require('./db');
const bcrypt = require('bcryptjs');

async function updateAdminPassword() {
    const adminPhones = ['1234567890', '7777777777'];
    const newPassword = 'urvakshh123';
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        for (const phone of adminPhones) {
            const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
            if (result.rows.length > 0) {
                await pool.query('UPDATE users SET password = $1 WHERE phone = $2', [hashedPassword, phone]);
                console.log(`Password updated for admin: ${phone}`);
            } else {
                // If admin doesn't exist, maybe we should create it?
                // But we don't know the email or name. 
                // However, authController.js will handle it on next register.
                console.log(`Admin user with phone ${phone} not found in database. They will receive the new password when they register.`);
            }
        }
    } catch (err) {
        console.error('Error updating admin password:', err);
    } finally {
        process.exit();
    }
}

updateAdminPassword();

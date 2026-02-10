const db = require('./db');
const bcrypt = require('bcryptjs');

const updateAdminPasswords = async () => {
    const admins = ['1234567890', '7777777777'];
    const newPassword = 'admin123'; // Default new password

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        for (const phone of admins) {
            // Check if admin exists
            const check = await db.query('SELECT * FROM users WHERE phone = $1', [phone]);
            
            if (check.rows.length > 0) {
                // Update password
                await db.query('UPDATE users SET password = $1 WHERE phone = $2', [hashedPassword, phone]);
                console.log(`Password updated for admin: ${phone}`);
            } else {
                // Create admin if not exists
                await db.query(
                    'INSERT INTO users (name, email, phone, password, role) VALUES ($1, $2, $3, $4, $5)',
                    ['Admin', `admin_${phone}@suvidha.com`, phone, hashedPassword, 'admin']
                );
                console.log(`Created new admin user: ${phone}`);
            }
        }
        console.log('Admin passwords update complete. New password is: ' + newPassword);
        process.exit(0);
    } catch (err) {
        console.error('Error updating passwords:', err);
        process.exit(1);
    }
};

updateAdminPasswords();

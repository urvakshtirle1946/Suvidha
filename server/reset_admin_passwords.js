const db = require('./db');
const bcrypt = require('bcryptjs');

const updateAdminPasswords = async () => {
    const admins = ['admin1@suvidha.com', 'admin2@suvidha.com'];
    const newPassword = 'admin123'; // Default new password

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        for (const email of admins) {
            const check = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            
            if (check.rows.length > 0) {
                await db.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
                console.log(`Password updated for admin: ${email}`);
            } else {
                await db.query(
                    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
                    ['Admin', email, hashedPassword, 'admin']
                );
                console.log(`Created new admin user: ${email}`);
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

const db = require('../db');
const crypto = require('crypto');
const smsService = require('../services/smsService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getMockUsers, saveMockUser } = require('../mock_persistence');

exports.authgearSync = async (req, res) => {
    const { user: authgearUser } = req; // Payload from authMiddleware
    
    if (!authgearUser) {
        return res.status(401).json({ success: false, message: 'No Authgear user data' });
    }

    try {
        const { sub, email, phone_number, phone_number_verified, name: authgearName } = authgearUser;
        let phone = phone_number || null;
        if (phone && phone.startsWith('+91')) {
            phone = phone.substring(3);
        } else if (phone && phone.startsWith('91') && phone.length === 12) {
            phone = phone.substring(2);
        }

        const displayName = authgearName || authgearUser.preferred_username || (email && typeof email === 'string' ? email.split('@')[0] : 'User');

        // Upsert user based on Authgear sub, email or phone
        let user;
        const checkUser = await db.query(
            'SELECT * FROM users WHERE authgear_id = $1 OR (email IS NOT NULL AND email = $2) OR (phone IS NOT NULL AND phone = $3)', 
            [sub, email, phone]
        );

        if (checkUser.rows.length > 0) {
            const existingUser = checkUser.rows[0];
            await db.query(
                'UPDATE users SET authgear_id = $1, email = COALESCE($2, email), phone = COALESCE($3, phone), name = COALESCE(name, $5), phone_verified = COALESCE($6, phone_verified) WHERE id = $4',
                [sub, email, phone, existingUser.id, displayName, !!phone_number_verified]
            );
            const updated = await db.query('SELECT * FROM users WHERE id = $1', [existingUser.id]);
            user = updated.rows[0];
        } else {
            const insertRes = await db.query(
                'INSERT INTO users (name, email, phone, role, authgear_id, phone_verified) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [displayName, email, phone, 'user', sub, !!phone_number_verified]
            );
            user = insertRes.rows[0];
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user.phone,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                phone_verified: user.phone_verified
            },
            message: 'User synced successfully'
        });
    } catch (error) {
        console.error('Authgear Sync Error:', error);
        console.error('Authgear User Context:', JSON.stringify(authgearUser, null, 2));
        res.status(500).json({ success: false, message: 'Server Error during sync', error: error.message });
    }
};

exports.requestVerificationOtp = async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: 'Phone number required' });

    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        await db.query(
            'INSERT INTO otp_codes (phone, code, expires_at) VALUES ($1, $2, $3) ON CONFLICT (phone) DO UPDATE SET code = $2, expires_at = $3',
            [phone, otp, expiresAt]
        );

        await smsService.sendSms(phone, `Your Zelp verification code is: ${otp}`);

        res.json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Request OTP Error:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
};

exports.verifyPhone = async (req, res) => {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ success: false, message: 'Phone and OTP required' });

    try {
        const result = await db.query('SELECT * FROM otp_codes WHERE phone = $1 AND code = $2 AND expires_at > NOW()', [phone, otp]);
        
        if (result.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        await db.query('UPDATE users SET phone_verified = true, phone = $1 WHERE phone = $1 OR authgear_id = $2', [phone, req.user?.sub]);
        await db.query('DELETE FROM otp_codes WHERE phone = $1', [phone]);

        res.json({ success: true, message: 'Phone verified successfully' });
    } catch (error) {
        console.error('Verify OTP Error:', error);
        res.status(500).json({ success: false, message: 'Verification failed' });
    }
};

// Strict Admin Login Endpoint
exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and Password are required' });
    }

    try {
        const checkUser = await db.query("SELECT * FROM users WHERE email = $1 AND role IN ('admin', 'super_admin')", [email]);
        
        if (checkUser.rows.length === 0) {
            // Check fallback for default admin
            if (email === 'admin@zelp.com' && password === 'demo123') {
                const token = jwt.sign(
                    { id: 0, email: 'admin@zelp.com', name: 'Demo Admin', phone: '9999999999', role: 'admin' },
                    process.env.JWT_SECRET || 'zelp_secret_key_2024',
                    { expiresIn: '1d' }
                );
                return res.status(200).json({ success: true, token, user: { email, role: 'admin' } });
            }
            return res.status(401).json({ success: false, message: 'Invalid Admin Credentials' });
        }

        const user = checkUser.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid Admin Credentials' });
        }

        const token = jwt.sign(
            { id: user.id, phone: user.phone, role: user.role, name: user.name, email: user.email },
            process.env.JWT_SECRET || 'zelp_secret_key_2024',
            { expiresIn: '1d' } // Admin token expires quicker
        );

        return res.status(200).json({
            success: true,
            token,
            user: {
                id: user.phone,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            },
            message: 'Admin Login Successful'
        });

    } catch (e) {
        console.error("Admin Auth Error", e);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Hardcoded Credentials for Beta Phase
const BETA_USERS = ['9876543210', '9999999999', '8888888888'];
const ADMIN_USERS = ['1234567890', '7777777777'];


// phoneLogin removed - using Authgear

exports.getAllUsers = async (req, res) => {
    try {
        const query = `
      SELECT u.id, u.name, u.email, u.phone, u.role, u.created_at,
      (SELECT COUNT(*) FROM bookings b WHERE b.user_phone = u.phone) as booking_count
      FROM users u
      ORDER BY u.created_at DESC
    `;
        const result = await db.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Database Error in getAllUsers:', error);
        console.log('Serving mock users in getAllUsers fallback');
        const mockUsers = getMockUsers();
        res.json(mockUsers.map(u => ({ ...u, booking_count: 0 })));
    }
};

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// googleLogin removed - using Authgear
// msg91Login removed - using Authgear

exports.updateProfile = async (req, res) => {
    const { name, email, phone, password } = req.body;

    // Check if user exists
    const checkUser = await db.query('SELECT * FROM users WHERE phone = $1', [phone]);
    if (checkUser.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    try {
        let hashedPassword = checkUser.rows[0].password;
        if (password && password.trim() !== '') {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        await db.query(
            'UPDATE users SET name = $1, email = $2, password = $3 WHERE phone = $4',
            [name, email, hashedPassword, phone]
        );

        // Fetch updated user to return
        const updatedUserRaw = await db.query('SELECT * FROM users WHERE phone = $1', [phone]);
        const updatedUser = updatedUserRaw.rows[0];

        // Generate new token with updated details
        const token = jwt.sign(
            { phone: updatedUser.phone, role: updatedUser.role, name: updatedUser.name, email: updatedUser.email },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '30d' }
        );

        res.json({
            success: true,
            message: 'Profile updated successfully',
            token,
            user: {
                id: updatedUser.phone,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                role: updatedUser.role
            }
        });

    } catch (err) {
        console.error("Update Profile Error:", err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

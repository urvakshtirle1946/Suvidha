const db = require('../db');
const crypto = require('crypto');
const smsService = require('../services/smsService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getMockUsers, saveMockUser } = require('../mock_persistence');

exports.authgearSync = async (req, res) => {
    const { user: authgearPayload } = req; // Payload from authMiddleware
    const userInfo = req.body.userInfo || {};
    
    if (!authgearPayload) {
        return res.status(401).json({ success: false, message: 'No Authgear user data' });
    }

    try {
        const sub = authgearPayload.sub;
        const email = userInfo.email || authgearPayload.email || null;
        const phone_number = userInfo.phone_number || authgearPayload.phone_number || null;
        let phone_number_verified = userInfo.phone_number_verified;
        if (phone_number_verified === undefined) phone_number_verified = authgearPayload.phone_number_verified;
        const authgearName = userInfo.name || authgearPayload.name || userInfo.preferred_username || authgearPayload.preferred_username || null;

        let phone = phone_number || null;
        if (phone && phone.startsWith('+91')) {
            phone = phone.substring(3);
        } else if (phone && phone.startsWith('91') && phone.length === 12) {
            phone = phone.substring(2);
        }

        const displayName = authgearName || (email && typeof email === 'string' ? email.split('@')[0] : 'User');
        const finalPhoneVerified = phone ? true : (phone_number_verified === true ? true : null);

        let linkedEmail = null;
        let linkedGoogleId = null;
        const linkedToken = req.headers['x-linked-token'];
        if (linkedToken) {
            try {
                const decoded = jwt.verify(linkedToken, process.env.JWT_SECRET || 'zelp_secret_key_2024');
                linkedEmail = decoded.email || null;
                linkedGoogleId = decoded.authgear_id || decoded.id || null;
            } catch (e) {
                console.error('Invalid linked token', e);
            }
        }

        const searchEmail = email || linkedEmail;

        const forcedPhoneVerified = phone ? true : false; 

        // Upsert user based on Authgear sub, email or phone (and also check google ID if linked)
        let user;
        const checkUser = await db.query(
            'SELECT * FROM users WHERE authgear_id = $1 OR (email IS NOT NULL AND email = $2) OR (phone IS NOT NULL AND phone = $3) OR (authgear_id = $4 AND $4 IS NOT NULL)', 
            [sub, searchEmail, phone, linkedGoogleId]
        );

        if (checkUser.rows.length > 0) {
            const existingUser = checkUser.rows[0];
            await db.query(
                'UPDATE users SET authgear_id = $1, email = COALESCE($2, email), phone = COALESCE($3, phone), name = COALESCE(name, $5), phone_verified = $6 WHERE id = $4',
                [sub, email, phone, existingUser.id, displayName, forcedPhoneVerified]
            );
            const updated = await db.query('SELECT * FROM users WHERE id = $1', [existingUser.id]);
            user = updated.rows[0];
        } else {
            const insertRes = await db.query(
                'INSERT INTO users (name, email, phone, role, authgear_id, phone_verified) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [displayName, email, phone, 'user', sub, forcedPhoneVerified]
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
        console.error('Authgear User Context:', JSON.stringify(authgearPayload, null, 2));
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

        const userEmail = req.user?.email || null;
        const userSub = req.user?.sub || null;
        
        if (userEmail || userSub) {
            await db.query('UPDATE users SET phone_verified = true, phone = $1 WHERE phone = $1 OR email = $2 OR authgear_id = $3', [phone, userEmail, userSub]);
        } else {
            await db.query('UPDATE users SET phone_verified = true, phone = $1 WHERE phone = $1', [phone]);
        }

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

exports.googleLogin = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ success: false, message: 'Token is required' });

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        
        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;
        
        let user;
        const checkUser = await db.query('SELECT * FROM users WHERE email = $1 OR authgear_id = $2', [email, googleId]);
        
        if (checkUser.rows.length > 0) {
            const existingUser = checkUser.rows[0];
            await db.query(
                'UPDATE users SET authgear_id = COALESCE(authgear_id, $1), name = COALESCE(name, $2) WHERE id = $3',
                [googleId, name, existingUser.id]
            );
            const updated = await db.query('SELECT * FROM users WHERE id = $1', [existingUser.id]);
            user = updated.rows[0];
        } else {
            const insertRes = await db.query(
                'INSERT INTO users (name, email, role, authgear_id, phone_verified) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [name, email, 'user', googleId, false]
            );
            user = insertRes.rows[0];
        }

        const jwtToken = jwt.sign(
            { id: user.id || user.phone, phone: user.phone, role: user.role, name: user.name, email: user.email },
            process.env.JWT_SECRET || 'zelp_secret_key_2024',
            { expiresIn: '30d' }
        );

        return res.status(200).json({
            success: true,
            token: jwtToken,
            user: {
                id: user.phone || user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                phone_verified: user.phone_verified
            },
            message: 'Google Login Successful'
        });
        
    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(500).json({ success: false, message: 'Invalid Google Token', error: error.message, stack: error.stack });
    }
};
// msg91Login removed - using Authgear

exports.updateProfile = async (req, res) => {
    const { name, email, phone, password } = req.body;

    const userEmail = req.user?.email || email || null;
    const userSub = req.user?.sub || null;
    const userPhone = req.user?.phone_number || req.user?.phone || phone || null;

    // Check if user exists
    const checkUser = await db.query(
        'SELECT * FROM users WHERE authgear_id = $1 OR email = $2 OR phone = $3', 
        [userSub, userEmail, userPhone]
    );

    if (checkUser.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    try {
        let hashedPassword = checkUser.rows[0].password;
        if (password && password.trim() !== '') {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        const targetId = checkUser.rows[0].id;

        await db.query(
            'UPDATE users SET name = $1, email = $2, password = $3, phone = COALESCE(phone, $4) WHERE id = $5',
            [name, email, hashedPassword, phone, targetId]
        );

        // Fetch updated user to return
        const updatedUserRaw = await db.query('SELECT * FROM users WHERE id = $1', [targetId]);
        const updatedUser = updatedUserRaw.rows[0];

        // Generate new token with updated details
        const token = jwt.sign(
            { id: updatedUser.id || updatedUser.phone, phone: updatedUser.phone, role: updatedUser.role, name: updatedUser.name, email: updatedUser.email },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '30d' }
        );

        res.json({
            success: true,
            message: 'Profile updated successfully',
            token,
            user: {
                id: updatedUser.phone || updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                role: updatedUser.role,
                phone_verified: updatedUser.phone_verified
            }
        });

    } catch (err) {
        console.error("Update Profile Error:", err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

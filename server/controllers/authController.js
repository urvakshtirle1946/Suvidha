const db = require('../db');
const crypto = require('crypto');
const smsService = require('../services/smsService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getMockUsers, saveMockUser } = require('../mock_persistence');


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
        const userPhone = req.user?.phone || null;
        
        if (userEmail) {
            await db.query('UPDATE users SET phone_verified = true, phone = $1 WHERE phone = $1 OR email = $2', [phone, userEmail]);
        } else if (userPhone) {
            await db.query('UPDATE users SET phone_verified = true, phone = $1 WHERE phone = $1 OR phone = $2', [phone, userPhone]);
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

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };

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
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                );
                return res
                    .cookie("admin_token", token, cookieOptions)
                    .cookie("zelp_access_token", token, cookieOptions)
                    .status(200)
                    .json({ success: true, user: { email, role: 'admin' } });
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

        return res
            .cookie("admin_token", token, cookieOptions)
            .cookie("zelp_access_token", token, cookieOptions)
            .status(200)
            .json({
                success: true,
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
                `UPDATE users 
                 SET authgear_id = COALESCE(authgear_id, $1), 
                     name = CASE WHEN name = 'User' OR name IS NULL THEN $2 ELSE name END, 
                     email = COALESCE(email, $4) 
                 WHERE id = $3`,
                [googleId, name, existingUser.id, email]
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
            { id: user.id || user.phone, phone: user.phone, role: user.role, name: user.name, email: user.email, phone_verified: user.phone_verified },
            process.env.JWT_SECRET || 'zelp_secret_key_2024',
            { expiresIn: '30d' }
        );

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        };

        return res
            .cookie("zelp_access_token", jwtToken, cookieOptions)
            .status(200)
            .json({
                success: true,
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

    const userEmail = req.user?.email || (email ? email : null);
    const userPhone = req.user?.phone || phone || null;

    // Check if user exists
    const checkUser = await db.query(
        'SELECT * FROM users WHERE email = $1 OR phone = $2', 
        [userEmail, userPhone]
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

        const targetEmail = email ? email : checkUser.rows[0].email; // Keep existing if new is empty

        await db.query(
            'UPDATE users SET name = $1, email = $2, password = $3, phone = COALESCE(phone, $4) WHERE id = $5',
            [name, targetEmail, hashedPassword, phone, targetId]
        );

        // Fetch updated user to return
        const updatedUserRaw = await db.query('SELECT * FROM users WHERE id = $1', [targetId]);
        const updatedUser = updatedUserRaw.rows[0];

        // Generate new token with updated details
        const token = jwt.sign(
            { id: updatedUser.id || updatedUser.phone, phone: updatedUser.phone, role: updatedUser.role, name: updatedUser.name, email: updatedUser.email, phone_verified: updatedUser.phone_verified },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 30 * 24 * 60 * 60 * 1000
        };

        res
          .cookie("zelp_access_token", token, cookieOptions)
          .json({
            success: true,
            message: 'Profile updated successfully',
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

exports.getMe = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false });

    try {
        const searchEmail = req.user.email || null;
        const searchPhone = req.user.phone || null;

        const checkUser = await db.query(
            'SELECT * FROM users WHERE (email = $1 AND $1 IS NOT NULL) OR (phone = $2 AND $2 IS NOT NULL) ORDER BY id DESC LIMIT 1', 
            [searchEmail, searchPhone]
        );

        if (checkUser.rows.length === 0) {
             return res.status(404).json({ success: false, message: 'User not found in DB' });
        }

        const user = checkUser.rows[0];
        const token = jwt.sign(
            { id: user.id || user.phone, phone: user.phone, role: user.role, name: user.name, email: user.email, phone_verified: user.phone_verified },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 30 * 24 * 60 * 60 * 1000
        };

        res
          .cookie("zelp_access_token", token, cookieOptions)
          .json({
            success: true,
            user
        });
    } catch (err) {
        console.error("GetMe Error:", err);
        res.status(500).json({ success: false });
    }
};

exports.logout = (req, res) => {
    const clearOpts = { 
        httpOnly: true, 
        secure: true, 
        sameSite: "none", 
        path: "/" 
    };
    res.clearCookie("zelp_access_token", clearOpts);
    res.clearCookie("admin_token", clearOpts);
    res.json({ success: true, message: 'Logged out successfully' });
};

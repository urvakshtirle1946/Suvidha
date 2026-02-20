const db = require('../db');
const crypto = require('crypto');
const smsService = require('../services/smsService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getMockUsers, saveMockUser } = require('../mock_persistence');

exports.sendOtp = async (req, res) => {
    res.status(200).json({ message: 'OTP Service Disabled' });
};

exports.verifyOtp = async (req, res) => {
    res.status(200).json({ message: 'OTP Service Disabled' });
};

// Hardcoded Credentials for Beta Phase
const BETA_USERS = ['9876543210', '9999999999', '8888888888'];
const ADMIN_USERS = ['1234567890', '7777777777'];


exports.phoneLogin = async (req, res) => {
    const { name, email, phone, password, is_login } = req.body;

    try {
        if (is_login) {
            // LOGIN FLOW
            if (!email || !password) {
                return res.status(400).json({ success: false, message: 'Email and Password are required' });
            }

            let user;
            try {
                const checkUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
                if (checkUser.rows.length === 0) {
                    // Check Mock Users
                    const mockUsers = getMockUsers();
                    user = mockUsers.find(u => u.email === email);

                    // Default Demo Admin
                    if (!user && email === 'admin@zelp.com' && password === 'demo123') {
                        user = { id: 0, email: 'admin@zelp.com', name: 'Demo Admin', phone: '9999999999', role: 'admin', password: await bcrypt.hash('demo123', 10) };
                    }

                    if (!user) {
                        return res.status(404).json({ success: false, message: 'User not found. Please Register.' });
                    }
                } else {
                    user = checkUser.rows[0];
                }

                // Verify Password
                if (!user.password) {
                    return res.status(401).json({ success: false, message: 'Please reset your password or register again to set a password.' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ success: false, message: 'Invalid Credentials' });
                }
            } catch (dbError) {
                console.error('Database Error during login fallback:', dbError);
                // FULL MOCK FALLBACK
                const mockUsers = getMockUsers();
                user = mockUsers.find(u => u.email === email);

                if (!user && email === 'admin@zelp.com' && password === 'demo123') {
                    user = { id: 0, email: 'admin@zelp.com', name: 'Demo Admin', phone: '9999999999', role: 'admin', password: 'demo' }; // password check skipped for simplicity in hardcoded case
                }

                if (!user) {
                    return res.status(500).json({ success: false, message: 'Database connection error. Try admin@zelp.com / demo123' });
                }

                if (user.password !== 'demo') {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid Credentials (Mock Mode)' });
                }
            }

            // Generate Token
            const token = jwt.sign(
                { id: user.id || 0, phone: user.phone, role: user.role, name: user.name, email: user.email },
                process.env.JWT_SECRET || 'zelp_secret_key_2024',
                { expiresIn: '30d' }
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
                message: 'Login Successful'
            });

        } else {
            // REGISTER FLOW
            if (!name || !email || !phone || !password) {
                return res.status(400).json({ success: false, message: 'Name, Email, Phone, and Password are required' });
            }

            // Role Determination
            let role = 'user';
            if (ADMIN_USERS.includes(phone)) {
                role = 'admin';
            } else if (BETA_USERS.includes(phone)) {
                role = 'beta_user';
            }

            // Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            try {
                // Check if user exists (by phone OR email to prevent duplicates)
                const checkUser = await db.query('SELECT * FROM users WHERE phone = $1 OR email = $2', [phone, email]);

                if (checkUser.rows.length > 0) {
                    await db.query('UPDATE users SET role = $1, email = $2, name = $3, password = $4 WHERE phone = $5',
                        [role, email, name, hashedPassword, phone]);
                } else {
                    await db.query('INSERT INTO users (name, email, phone, password, role) VALUES ($1, $2, $3, $4, $5)',
                        [name, email, phone, hashedPassword, role]);
                }
            } catch (dbError) {
                console.error('Database Error during registration fallback:', dbError);
                // MOCK REGISTRATION
                console.log('Using Mock Registration persistence');
                saveMockUser({ name, email, phone, password: hashedPassword, role });
            }

            // Generate JWT
            const token = jwt.sign(
                { phone, role, name, email },
                process.env.JWT_SECRET || 'zelp_secret_key_2024',
                { expiresIn: '30d' }
            );

            return res.status(200).json({
                success: true,
                token,
                user: {
                    id: phone,
                    name,
                    email,
                    phone,
                    role
                },
                message: 'Registration Successful'
            });
        }

    } catch (e) {
        console.error("Auth Error", e);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

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
    const { token, phone } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { email, name, sub } = payload;

        let user;
        let role = 'user';

        try {
            const checkUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            if (checkUser.rows.length > 0) {
                user = checkUser.rows[0];
            } else if (phone) {
                // Register new user via Google
                const checkPhone = await db.query('SELECT * FROM users WHERE phone = $1', [phone]);
                if (checkPhone.rows.length > 0) return res.status(400).json({ success: false, message: 'Phone number already registered.' });

                const insertRes = await db.query(
                    'INSERT INTO users (name, email, phone, role) VALUES ($1, $2, $3, $4) RETURNING *',
                    [name, email, phone, role]
                );
                user = insertRes.rows[0];
            } else {
                return res.status(200).json({ success: false, requiresPhone: true, message: 'Phone number is required.' });
            }
        } catch (dbError) {
            console.error('DB Error during Google Login fallback:', dbError);
            const mockUsers = getMockUsers();
            user = mockUsers.find(u => u.email === email);
            if (!user) {
                if (!phone) return res.status(200).json({ success: false, requiresPhone: true, message: 'Phone required for mock registration.' });
                user = saveMockUser({ name, email, phone, role: 'user' });
            }
        }

        // Generate JWT
        const jwtToken = jwt.sign(
            { id: user.id || 0, phone: user.phone, role: user.role, name: user.name, email: user.email },
            process.env.JWT_SECRET || 'zelp_secret_key_2024',
            { expiresIn: '30d' }
        );

        return res.status(200).json({
            success: true,
            token: jwtToken,
            user: {
                id: user.phone,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            },
            message: 'Google Login Successful'
        });
    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(401).json({ success: false, message: 'Invalid Google Token', error: error.message });
    }
};

exports.msg91Login = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ success: false, message: 'OTP Token is required' });
    }

    try {
        const url = new URL('https://control.msg91.com/api/v5/widget/verifyAccessToken');
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        const body = {
            "authkey": process.env.MSG91_AUTHKEY,
            "access-token": token
        };

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: headers,
            body:  JSON.stringify(body)
        });

        const data = await response.json();

        if (data.type === 'success' || data.message) {
            // MSG91 returns the mobile number upon successful verification
            let phone = data.message;
            if (phone.startsWith('91') && phone.length === 12) {
                phone = phone.substring(2);
            }

            let user;
            try {
                const checkUser = await db.query('SELECT * FROM users WHERE phone = $1', [phone]);
                if (checkUser.rows.length > 0) {
                    user = checkUser.rows[0];
                } else {
                    const insertRes = await db.query(
                        'INSERT INTO users (name, phone, role) VALUES ($1, $2, $3) RETURNING *',
                        ['User', phone, 'user']
                    );
                    user = insertRes.rows[0];
                }
            } catch (dbError) {
                console.error('DB Error during MSG91 Login fallback:', dbError);
                const mockUsers = getMockUsers();
                user = mockUsers.find(u => u.phone === phone);
                if (!user) {
                    user = saveMockUser({ name: 'User', phone, role: 'user' });
                }
            }

            const jwtToken = jwt.sign(
                { id: user.id || 0, phone: user.phone, role: user.role, name: user.name, email: user.email },
                process.env.JWT_SECRET || 'zelp_secret_key_2024',
                { expiresIn: '30d' }
            );

            return res.status(200).json({
                success: true,
                token: jwtToken,
                user: {
                    id: user.phone,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                },
                message: 'OTP Login Successful'
            });
        } else {
             return res.status(401).json({ success: false, message: 'Invalid OTP Token', error: data });
        }
    } catch (error) {
        console.error("MSG91 Auth Error:", error);
        res.status(500).json({ success: false, message: 'Server Error during OTP verification' });
    }
};

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

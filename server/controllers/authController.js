const db = require('../db');
const crypto = require('crypto');
const smsService = require('../services/smsService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

            const checkUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            if (checkUser.rows.length === 0) {
                return res.status(404).json({ success: false, message: 'User not found. Please Register.' });
            }

            const user = checkUser.rows[0];
            
            // Verify Password
            if (!user.password) {
                // Legacy user or user created without password (if any)
                return res.status(401).json({ success: false, message: 'Please reset your password or register again to set a password.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid Credentials' });
            }

            // Generate Token
            const token = jwt.sign(
                { phone: user.phone, role: user.role, name: user.name, email: user.email }, 
                process.env.JWT_SECRET || 'secret', 
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

            // Check if user exists (by phone OR email to prevent duplicates)
            const checkUser = await db.query('SELECT * FROM users WHERE phone = $1 OR email = $2', [phone, email]);
            
            // Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            if (checkUser.rows.length > 0) {
                // Update existing user
                await db.query('UPDATE users SET role = $1, email = $2, name = $3, password = $4 WHERE phone = $5', 
                    [role, email, name, hashedPassword, phone]);
            } else {
                // Insert new user
                await db.query('INSERT INTO users (name, email, phone, password, role) VALUES ($1, $2, $3, $4, $5)', 
                    [name, email, phone, hashedPassword, role]);
            }

            // Generate JWT
            const token = jwt.sign(
                { phone, role, name, email }, 
                process.env.JWT_SECRET || 'secret', 
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
      SELECT u.*, COUNT(b.id) as booking_count 
      FROM users u
      LEFT JOIN bookings b ON u.phone = b.user_phone
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

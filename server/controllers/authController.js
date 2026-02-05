const db = require('../db');
const crypto = require('crypto');
const smsService = require('../services/smsService');
const { createClerkClient } = require('@clerk/backend');
const phoneEmailService = require('../services/phoneEmailService');

// Initialize Clerk Client
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

exports.sendOtp = async (req, res) => {
  // ... (Keep existing if you want, but likely unused now)
  res.status(501).json({ message: 'Use Phone.Email login' });
};

exports.verifyOtp = async (req, res) => {
   // ... (Keep existing if you want)
   res.status(501).json({ message: 'Use Phone.Email login' });
};

exports.phoneLogin = async (req, res) => {
  const { user_json_url } = req.body;

  if (!user_json_url) {
    return res.status(400).json({ success: false, message: 'Token URL is required' });
  }

  try {
    // 1. Verify token with Phone.Email
    const userData = await phoneEmailService.verifyToken(user_json_url);
    
    if (!userData || !userData.user_phone_number) {
       return res.status(400).json({ success: false, message: 'Invalid token data from Phone.Email' });
    }

    const countryCode = userData.user_country_code || '+91';
    let rawPhone = userData.user_phone_number;
    // Standardize phone: +919876543210
    const phoneNumber = `${countryCode}${rawPhone}`;

    // 2. Find or Create User in DB (Optional, but good for local app data)
    let localUserResult = await db.query('SELECT * FROM users WHERE phone = $1', [phoneNumber]);
    let localUser = localUserResult.rows[0];

    if (!localUser) {
      localUserResult = await db.query(
        'INSERT INTO users (phone) VALUES ($1) RETURNING *',
        [phoneNumber]
      );
      localUser = localUserResult.rows[0];
    }

    // 3. Find or Create User in CLERK
    let clerkUser;
    
    // First, try to find user by phone number
    try {
        const userList = await clerkClient.users.getUserList({
            phoneNumber: [phoneNumber],
            limit: 1
        });
        
        if (userList.data.length > 0) {
            clerkUser = userList.data[0];
        } else {
            // Create user
            clerkUser = await clerkClient.users.createUser({
                phoneNumber: [phoneNumber],
                firstName: 'User', // Default
                skipPasswordRequirement: true,
                skipPasswordChecks: true
            });
        }
    } catch (clerkErr) {
        console.error('Clerk User Lookup/Creation Error:', JSON.stringify(clerkErr, null, 2));
        return res.status(500).json({ 
            success: false, 
            message: 'Identity Provider Error: ' + (clerkErr.errors?.[0]?.message || clerkErr.message) 
        });
    }

    // 4. Create SignIn Ticket (Token) for the valid user
    try {
        const ticket = await clerkClient.signInTokens.createSignInToken({
            userId: clerkUser.id,
            expiresInSeconds: 60, // Short lived
        });

        // 5. Return success and ticket
        res.json({ 
            success: true, 
            ticket: ticket.token, 
            user: localUser 
        });

    } catch (tokenErr) {
        console.error('Clerk Token Creation Error:', JSON.stringify(tokenErr, null, 2));
        // Check for specific 403
        if (tokenErr.status === 403) {
             return res.status(403).json({ 
                success: false, 
                message: 'Clerk Sign-in Tokens not enabled. Enable them in Clerk Dashboard > User & Authentication.' 
             });
        }
        res.status(500).json({ 
            success: false, 
            message: 'Failed to generate login token: ' + (tokenErr.errors?.[0]?.message || tokenErr.message)
        });
    }

  } catch (err) {
    console.error('Error in phoneLogin:', err);
    res.status(500).json({ success: false, message: 'Login flow failed' });
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

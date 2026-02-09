const db = require('../db');
const smsService = require('../services/smsService');

// Dummy pricing/ETA logic
const AMBULANCE_TYPES = {
    'BLS': { basePrice: 1500, perKm: 50, eta: '10-15 min' },
    'ALS': { basePrice: 3000, perKm: 100, eta: '15-20 min' },
    'ICU': { basePrice: 5000, perKm: 150, eta: '20-25 min' },
    'Patient Transport': { basePrice: 1000, perKm: 40, eta: '30 min' }
};

exports.requestAmbulance = async (req, res) => {
    const { userPhone, pickupLat, pickupLng, dropAddress, type } = req.body;

    try {
        const query = `
            INSERT INTO ambulance_requests (user_phone, pickup_lat, pickup_lng, drop_address, ambulance_type)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, status, created_at
        `;
        const result = await db.query(query, [userPhone, pickupLat, pickupLng, dropAddress, type]);

        // Send SMS/WhatsApp to Admin or Driver (Simulated)
        const request = result.rows[0];
        const adminPhone = '+919329017929'; // Developer/Admin phone

        const message = `🚨 EMERGENCY: New Ambulance Request!
Type: ${type}
User: ${userPhone}
Location: https://www.google.com/maps?q=${pickupLat},${pickupLng}
Drop: ${dropAddress}
ID: #${request.id}

Immediate action required.`;

        await smsService.sendWhatsapp(adminPhone, message);

        res.status(201).json({
            success: true,
            request: request,
            eta: AMBULANCE_TYPES[type]?.eta || 'Unknown',
            price: AMBULANCE_TYPES[type]?.basePrice || 0, // Mock price
            message: 'Ambulance requested successfully. Help is on the way!'
        });

    } catch (error) {
        console.error('Ambulance Request Error:', error);
        res.status(500).json({ success: false, message: 'Failed to request ambulance' });
    }
};

exports.getRequests = async (req, res) => {
    const { phone } = req.query;
    try {
        const result = await db.query(
            'SELECT * FROM ambulance_requests WHERE user_phone = $1 ORDER BY created_at DESC LIMIT 5',
            [phone]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Fetch Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch requests' });
    }
};

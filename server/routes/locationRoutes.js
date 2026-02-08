const express = require('express');
const router = express.Router();

router.get('/reverse', async (req, res) => {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }

    try {
        // Using built-in fetch (Node 18+)
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`, {
            headers: {
                'User-Agent': 'Suvidha-Healthcare-App/1.0 (contact@suvidha.com)' // Correctly identified per Nominatim policy
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'External Geolocation Service Error' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Proxy Location Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

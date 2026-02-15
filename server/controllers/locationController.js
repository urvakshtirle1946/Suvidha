const fetch = require('node-fetch');

exports.reverseGeocode = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    // Check if we have a cached value (optional, better for production but skipping for now)
    
    // Call Nominatim with a User-Agent (required by OSM policy)
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, {
      headers: {
        'User-Agent': 'SuvidhaApp/1.0 (contact@suvidha.app)' 
      }
    });

    if (!response.ok) {
        throw new Error(`Nominatim API responded with ${response.status}`);
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Reverse geocode failed:', error);
    res.status(500).json({ error: 'Failed to fetch location data' });
  }
};

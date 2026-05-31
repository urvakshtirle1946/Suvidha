const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('./db');

const fixImages = async () => {
    const hospitalImages = [
        { name: 'Synergy Hospital', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' },
        { name: 'Shalby Hospital', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80' },
        { name: 'Gokuldas Hospital', url: '/uploads/Gokuldas.jpg' }
    ];

    try {
        for (const h of hospitalImages) {
            const res = await db.query(
                "UPDATE hospitals SET image_url = $1 WHERE name ILIKE $2 RETURNING *",
                [h.url, `%${h.name}%`]
            );
            if (res.rows.length > 0) {
                console.log(`Updated ${res.rows[0].name} with image: ${h.url}`);
            } else {
                console.log(`Hospital matching "${h.name}" not found.`);
            }
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixImages();

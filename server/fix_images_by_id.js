const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('./db');

const fixImagesById = async () => {
    const mappings = [
        { id: 10, url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' }, // Synergy
        { id: 11, url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80' }, // Shalby
        { id: 9, url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80' },  // CHL
        { id: 7, url: 'https://images.unsplash.com/photo-1586773860418-d3b97898c75c?auto=format&fit=crop&w=800&q=80' },  // Bombay
        { id: 8, url: '/uploads/Gokuldas.jpg' } // Keep Gokuldas
    ];

    try {
        for (const m of mappings) {
            await db.query("UPDATE hospitals SET image_url = $1 WHERE id = $2", [m.url, m.id]);
            console.log(`Updated ID ${m.id} with ${m.url}`);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixImagesById();

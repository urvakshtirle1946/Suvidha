const db = require('./db');

const updates = [
    { name: 'Bombay', url: '/uploads/Bombay.png' },
    { name: 'Eureka Hospital', url: '/uploads/Eureka.jpg' },
    { name: 'City Home Pvt. Ltd.', url: '/uploads/City Nursing Home.jpg' },
    { name: 'Gokuldas', url: '/uploads/Gokuldas.jpg' }
];

const runUpdates = async () => {
    try {
        for (const up of updates) {
            const res = await db.query(
                "UPDATE hospitals SET image_url = $1 WHERE name ILIKE $2 RETURNING *",
                [up.url, `%${up.name}%`]
            );
            if (res.rows.length > 0) {
                console.log(`Updated ${res.rows[0].name} with ${up.url}`);
            } else {
                console.log(`No hospital found for ${up.name}`);
            }
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

runUpdates();

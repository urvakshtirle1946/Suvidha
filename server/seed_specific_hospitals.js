const db = require('./db');

const hospitals = [
    {
        name: 'Gokuldas Hospital',
        location: 'Indore, Madhya Pradesh',
        rating: 4.5,
        discount_percentage: 15,
        discount_description: 'Flat 15% off on all lab tests',
        image_url: '/uploads/Gokuldas.jpg',
        phone_number: '9876543210',
        map_url: 'https://maps.google.com/?q=Gokuldas+Hospital+Indore'
    },
    {
        name: 'Eureka Hospital',
        location: 'New Palasia, Indore',
        rating: 4.2,
        discount_percentage: 10,
        discount_description: 'Free consultation for kids below 5',
        image_url: 'https://images.unsplash.com/photo-1587351021759-3e566b9af953?auto=format&fit=crop&q=80&w=1000',
        phone_number: '8888888888',
        map_url: 'https://maps.google.com/?q=Eureka+Hospital+Indore'
    },
    {
        name: 'City Home Pvt. Ltd.',
        location: 'Indore',
        rating: 4.0,
        discount_percentage: 12,
        discount_description: 'General Ward Discount',
        image_url: '/uploads/Gokuldas.jpg', // Reusing image as per dump
        phone_number: '7777777777',
        map_url: 'https://maps.google.com'
    },
    {
        name: 'Synergy Hospital',
        location: 'Scheme 74, Indore',
        rating: 4.6,
        discount_percentage: 18,
        discount_description: 'Checkup Camp',
        image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
        phone_number: '6666666666',
        map_url: 'https://maps.google.com'
    },
    {
        name: 'Shalby Hospital',
        location: 'Race Course Road, Indore',
        rating: 4.7,
        discount_percentage: 15,
        discount_description: 'Joint Replacement Special',
        image_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        phone_number: '5555555555',
        map_url: 'https://maps.google.com'
    }
];

const seedHospitals = async () => {
    try {
        console.log('Seeding hospitals...');
        
        for (const h of hospitals) {
            // Check if exists
            const check = await db.query('SELECT * FROM hospitals WHERE name = $1', [h.name]);
            if (check.rows.length === 0) {
                await db.query(`
                    INSERT INTO hospitals (name, location, rating, discount_percentage, discount_description, image_url, phone_number, map_url)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                `, [h.name, h.location, h.rating, h.discount_percentage, h.discount_description, h.image_url, h.phone_number, h.map_url]);
                console.log(`Inserted ${h.name}`);
            } else {
                console.log(`Skipped ${h.name} (Already exists)`);
            }
        }
        console.log('Hospital seeding completed.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedHospitals();

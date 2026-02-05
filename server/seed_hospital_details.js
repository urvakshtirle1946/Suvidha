const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('./db');

const dummyDescriptions = [
    "Flat 20% off on Total Bill",
    "Special discount for Senior Citizens",
    "Free consultation on weekends",
    "10% off for new patients",
    "Complimentary health check with full body scan"
];

const generatePhoneNumber = () => {
    // Generates a random 10-digit number starting with 9
    return '9' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
};

const updateHospitals = async () => {
    try {
        console.log('Connecting to database...');
        // Verify connection by ensuring we can select
        const res = await db.query('SELECT * FROM hospitals');
        const hospitals = res.rows;

        console.log(`Found ${hospitals.length} hospitals.`);

        if (hospitals.length === 0) {
            console.log("No hospitals found to update.");
            process.exit(0);
        }

        for (const hospital of hospitals) {
            // Generate dummy data
             const rating = (Math.random() * (5.0 - 3.8) + 3.8).toFixed(1);
             const discount = Math.floor(Math.random() * 20) + 5; // 5 to 25
             const description = dummyDescriptions[Math.floor(Math.random() * dummyDescriptions.length)];
             const phone = generatePhoneNumber();
             const mapUrl = "https://maps.google.com";

             // Update query
             // We update rating, discount_percentage, discount_description, phone_number, map_url
             const query = `
                UPDATE hospitals 
                SET rating = $1, 
                    discount_percentage = $2, 
                    discount_description = $3, 
                    phone_number = $4,
                    map_url = $5
                WHERE id = $6
             `;
             
             await db.query(query, [rating, discount, description, phone, mapUrl, hospital.id]);
             console.log(`Updated ${hospital.name}: Rating=${rating}, Discount=${discount}%, Phone=${phone}`);
        }

        console.log('All hospitals updated successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Error updating hospitals:', err);
        process.exit(1);
    }
};

updateHospitals();

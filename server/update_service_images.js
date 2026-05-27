const db = require('./db');

const updateServiceImages = async () => {
    try {
        console.log('Updating service images...');
        
        await db.query(`
            UPDATE services 
            SET image_url = '/uploads/blood_test.jpg' 
            WHERE category = 'Lab'
        `);
        
        await db.query(`
            UPDATE services 
            SET image_url = '/uploads/mri_scan.jpg' 
            WHERE category = 'Scan'
        `);
        
        await db.query(`
            UPDATE services 
            SET image_url = '/uploads/consultation.jpg' 
            WHERE category = 'OPD'
        `);
        
        await db.query(`
            UPDATE services 
            SET image_url = '/uploads/surgery.jpg' 
            WHERE category = 'Surgery'
        `);
        
        console.log('Successfully updated service images!');
        process.exit(0);
    } catch (err) {
        console.error('Error updating service images:', err);
        process.exit(1);
    }
};

updateServiceImages();

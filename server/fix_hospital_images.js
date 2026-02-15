const db = require('./db');

async function fixImages() {
  try {
    console.log('Fixing broken hospital images...');
    
    // Fix Eureka Hospital (broken image ending in 953)
    await db.query(`
      UPDATE hospitals 
      SET image_url = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' 
      WHERE name LIKE '%Eureka%' OR image_url LIKE '%photo-1587351021759%'
    `);
    console.log('Updated Eureka Hospital image.');

    // Fix Bombay Hospital (broken image ending in 75c)
    await db.query(`
      UPDATE hospitals 
      SET image_url = 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80' 
      WHERE name LIKE '%Bombay%' OR image_url LIKE '%photo-1586773860418%'
    `);
    console.log('Updated Bombay Hospital image.');

    console.log('Image fix completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Image fix failed:', error);
    process.exit(1);
  }
}

fixImages();

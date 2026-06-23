const db = require('./db');

const lupinLab = {
    name: 'Lupin Diagnostic Lab',
    location: 'Indore, Madhya Pradesh',
    rating: 4.6,
    discount_percentage: 10,
    discount_description: 'Flat 10% off on all diagnostic tests',
    image_url: 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=1000',
    phone_number: '9111122222',
    map_url: 'https://maps.google.com/?q=Lupin+Diagnostic+Lab+Indore',
    latitude: 22.71960000,
    longitude: 75.85770000,
    is_active: true
};

const services = [
    { name: 'Complete Blood Count (CBC)', price: 320, description: 'Evaluates overall health and detects disorders such as anemia or leukemia.' },
    { name: 'Peripheral Smear for Malaria Parasite (PS for MP)', price: 200, description: 'Microscopic examination of blood to detect malaria parasites.' },
    { name: 'Widal Test', price: 250, description: 'Agglutination test to detect typhoid fever (enteric fever).' },
    { name: 'SGPT (ALT)', price: 150, description: 'Measures Alanine Aminotransferase level to assess liver function.' },
    { name: 'SGOT (AST)', price: 150, description: 'Measures Aspartate Aminotransferase level to assess liver and heart health.' },
    { name: 'Urine Routine & Microscopy (Urine RM)', price: 150, description: 'Evaluates urine sample for UTIs, kidney disease, or diabetes.' },
    { name: 'C-Reactive Protein (CRP)', price: 500, description: 'Measures general inflammation levels in the body.' },
    { name: 'Dengue NS1 Antigen', price: 600, description: 'Detects non-structural protein 1 of Dengue virus in early infection stages.' },
    { name: 'Dengue Profile', price: 1750, description: 'Comprehensive screening for Dengue infection including antigen and antibodies.' },
    { name: 'Total Bilirubin', price: 250, description: 'Measures bilirubin level to diagnose jaundice or liver dysfunction.' },
    { name: 'Creatinine', price: 150, description: 'Measures blood creatinine level to evaluate kidney function.' },
    { name: 'Urea', price: 200, description: 'Measures blood urea nitrogen (BUN) level to assess kidney performance.' },
    { name: 'Uric Acid', price: 200, description: 'Measures uric acid levels to detect gout or kidney stones.' },
    { name: 'Cholesterol Total', price: 200, description: 'Measures total blood cholesterol level to monitor cardiovascular risk.' },
    { name: 'Triglycerides', price: 300, description: 'Measures triglyceride levels to evaluate cardiovascular health.' },
    { name: 'Serum Electrolytes', price: 440, description: 'Measures sodium, potassium, and chloride levels in the blood.' },
    { name: 'Prothrombin Time (PT/INR)', price: 400, description: 'Evaluates blood clotting time and monitors warfarin therapy.' },
    { name: 'Calcium', price: 200, description: 'Measures blood calcium level to assess bone, nerve, and heart function.' },
    { name: 'Hemoglobin (Hb%)', price: 150, description: 'Measures the amount of oxygen-carrying protein in red blood cells.' },
    { name: 'Erythrocyte Sedimentation Rate (ESR)', price: 150, description: 'Measures red blood cell settling rate to detect inflammation.' },
    { name: 'Rheumatoid Arthritis (RA) Factor', price: 650, description: 'Detects RA autoantibodies in blood to diagnose rheumatoid arthritis.' },
    { name: 'HbA1c (Glycated Hemoglobin)', price: 700, description: 'Assesses long-term blood sugar levels over 2-3 months.' },
    { name: 'Lipid Profile', price: 800, description: 'Comprehensive test for cholesterol, triglycerides, HDL, LDL, and VLDL.' },
    { name: 'Liver Function Test (LFT)', price: 850, description: 'Evaluates liver enzymes, proteins, and bilirubin levels.' },
    { name: 'Kidney Function Test (KFT)', price: 800, description: 'Evaluates kidney function through urea, creatinine, and electrolytes.' },
    { name: 'Thyroid Profile (T3, T4, TSH)', price: 700, description: 'Measures thyroid hormones to assess thyroid activity.' },
    { name: 'Thyroid Stimulating Hormone (TSH)', price: 300, description: 'Evaluates thyroid gland function.' },
    { name: 'Free Thyroid Profile (FT3, FT4, TSH)', price: 800, description: 'Measures unbound, active forms of T3 and T4 hormones.' },
    { name: 'Vitamin B12', price: 1150, description: 'Measures Vitamin B12 level to check for deficiency and anemia.' },
    { name: 'Vitamin D3', price: 1400, description: 'Measures 25-hydroxyvitamin D to check bone and immune health.' },
    { name: 'Iron Study / Profile', price: 600, description: 'Measures iron levels, ferritin, and total iron-binding capacity.' },
    { name: 'Urine Culture & Sensitivity', price: 900, description: 'Identifies bacteria in urine and determines effective antibiotics.' },
    { name: 'Immunoglobulin E (IgE) Total', price: 850, description: 'Measures total IgE levels to diagnose allergies or asthma.' },
    { name: 'Fasting Blood Sugar (FBS)', price: 100, description: 'Measures blood glucose after an overnight fast.' },
    { name: 'Post Prandial Blood Sugar (PPBS)', price: 100, description: 'Measures blood glucose 2 hours after a meal.' },
    { name: 'Random Blood Sugar (RBS)', price: 100, description: 'Measures blood glucose at any time of day.' },
    { name: 'Hemoglobin Electrophoresis', price: 1000, description: 'Detects abnormal forms of hemoglobin (e.g. thalassemia).' },
    { name: 'Antinuclear Antibody (ANA)', price: 1000, description: 'Detects autoantibodies to diagnose autoimmune diseases like lupus.' },
    { name: 'Anti-Mullerian Hormone (AMH)', price: 1850, description: 'Assesses ovarian reserve and fertility potential.' },
    { name: 'Beta HCG (Serum)', price: 700, description: 'Measures HCG hormone to confirm pregnancy or screen developmental markers.' },
    { name: 'Luteinizing Hormone (LH)', price: 600, description: 'Evaluates pituitary function and reproductive health.' },
    { name: 'Follicle Stimulating Hormone (FSH)', price: 600, description: 'Evaluates ovarian or testicular function and fertility.' },
    { name: 'Prolactin', price: 600, description: 'Measures prolactin levels to evaluate pituitary gland disorders.' },
    { name: 'Dual Marker Test', price: 2250, description: 'Prenatal screening test for genetic abnormalities in fetus.' },
    { name: 'Prostate Specific Antigen (PSA)', price: 800, description: 'Screens for prostate gland inflammation or prostate cancer.' },
    { name: 'TB Gold (QuantiFERON-TB)', price: 2600, description: 'Interferon-gamma release assay to detect Tuberculosis infection.' },
    { name: 'Anti-CCP Antibody', price: 1500, description: 'Highly specific test to diagnose early rheumatoid arthritis.' },
    { name: 'Cancer Antigen 125 (CA-125)', price: 1200, description: 'Monitors ovarian cancer or evaluates pelvic masses.' },
    { name: 'Testosterone Total', price: 800, description: 'Measures testosterone hormone levels in the blood.' },
    { name: 'Stool Routine & Microscopy', price: 250, description: 'Screens stool sample for parasites, blood, or infections.' },
    { name: 'Stool Culture & Sensitivity', price: 1000, description: 'Identifies bacterial pathogens in stool for gastrointestinal infections.' },
    { name: 'Blood Culture & Sensitivity', price: 1500, description: 'Detects systemic bacterial or fungal infections in blood.' },
    { name: 'HIV 1 & 2 Antibody', price: 500, description: 'Screens for antibodies to Human Immunodeficiency Virus.' },
    { name: 'Hepatitis C Virus (HCV)', price: 500, description: 'Detects antibodies to Hepatitis C Virus to identify infection.' },
    { name: 'Hepatitis B Surface Antigen (HBsAg)', price: 400, description: 'Detects acute or chronic Hepatitis B infection.' },
    { name: 'Syphilis (VDRL)', price: 300, description: 'Non-treponemal screening test for Syphilis infection.' },
    { name: 'Antenatal Care (ANC) Profile', price: 1500, description: 'Routine blood and urine checkup package for pregnant women.' }
];

const seed = async () => {
    try {
        console.log('Seeding Lupin Diagnostic Lab...');

        // 1. Check if hospital exists, if not insert it
        let hospitalId;
        const checkHosp = await db.query('SELECT id FROM hospitals WHERE name = $1', [lupinLab.name]);
        if (checkHosp.rows.length === 0) {
            const insertHosp = await db.query(`
                INSERT INTO hospitals (name, location, rating, discount_percentage, discount_description, image_url, phone_number, map_url, latitude, longitude, is_active)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING id
            `, [
                lupinLab.name,
                lupinLab.location,
                lupinLab.rating,
                lupinLab.discount_percentage,
                lupinLab.discount_description,
                lupinLab.image_url,
                lupinLab.phone_number,
                lupinLab.map_url,
                lupinLab.latitude,
                lupinLab.longitude,
                lupinLab.is_active
            ]);
            hospitalId = insertHosp.rows[0].id;
            console.log(`Inserted ${lupinLab.name} with ID: ${hospitalId}`);
        } else {
            hospitalId = checkHosp.rows[0].id;
            // Update to make sure it's active and has correct location/rating
            await db.query(`
                UPDATE hospitals 
                SET location = $1, rating = $2, discount_percentage = $3, discount_description = $4, image_url = $5, phone_number = $6, map_url = $7, latitude = $8, longitude = $9, is_active = $10
                WHERE id = $11
            `, [
                lupinLab.location,
                lupinLab.rating,
                lupinLab.discount_percentage,
                lupinLab.discount_description,
                lupinLab.image_url,
                lupinLab.phone_number,
                lupinLab.map_url,
                lupinLab.latitude,
                lupinLab.longitude,
                lupinLab.is_active,
                hospitalId
            ]);
            console.log(`Lupin Diagnostic Lab already exists (ID: ${hospitalId}). Updated details.`);
        }

        // 2. Insert/update services
        let insertedCount = 0;
        let updatedCount = 0;
        for (const s of services) {
            // Check if service already exists for this hospital
            const checkService = await db.query(
                'SELECT id FROM services WHERE hospital_id = $1 AND name = $2',
                [hospitalId, s.name]
            );

            // Compute discount price
            const discountPrice = parseFloat((s.price * (1 - lupinLab.discount_percentage / 100)).toFixed(2));

            if (checkService.rows.length === 0) {
                await db.query(`
                    INSERT INTO services (hospital_id, name, category, price, discount_price, description, slot_capacity, is_active, is_deleted)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                `, [
                    hospitalId,
                    s.name,
                    'Lab', // All are lab services
                    s.price,
                    discountPrice,
                    s.description,
                    10, // Lab slot capacity default
                    true,
                    false
                ]);
                insertedCount++;
            } else {
                const serviceId = checkService.rows[0].id;
                await db.query(`
                    UPDATE services
                    SET category = $1, price = $2, discount_price = $3, description = $4, slot_capacity = $5, is_active = $6, is_deleted = $7
                    WHERE id = $8
                `, [
                    'Lab',
                    s.price,
                    discountPrice,
                    s.description,
                    10,
                    true,
                    false,
                    serviceId
                ]);
                updatedCount++;
            }
        }

        console.log(`Services update completed. Inserted: ${insertedCount}, Updated: ${updatedCount}.`);
        process.exit(0);
    } catch (err) {
        console.error('Error seeding Lupin Diagnostic Lab:', err);
        process.exit(1);
    }
};

seed();

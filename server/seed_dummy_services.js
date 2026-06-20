const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('./db');

const servicesData = {
    'Lab': [
        { name: 'Complete Blood Count (CBC)', price: 450, discount_price: 299, description: 'Basic screening test to check overall health and detect disorders like anemia and infection.' },
        { name: 'Lipid Profile (Cholesterol)', price: 900, discount_price: 699, description: 'Measures cholesterol levels to assess the risk of cardiovascular disease.' },
        { name: 'Liver Function Test (LFT)', price: 1200, discount_price: 899, description: 'Measures various enzymes and proteins to assess liver health.' },
        { name: 'Diabetes Screen (HbA1c + Glucose)', price: 750, discount_price: 499, description: 'Accurate screening for diabetes and long-term blood sugar control.' },
        { name: 'Thyroid Profile (T3, T4, TSH)', price: 850, discount_price: 599, description: 'Evaluates thyroid gland function and hormone levels.' },
        { name: 'Kidney Function Test (KFT)', price: 1100, discount_price: 799, description: 'Measures creatinine and urea to assess kidney health.' },
        { name: 'Vitamin D (25-OH)', price: 1800, discount_price: 1299, description: 'Measures Vitamin D levels, essential for bone health and immunity.' },
        { name: 'Vitamin B12', price: 1500, discount_price: 999, description: 'Checks for Vitamin B12 deficiency, vital for nerve function.' },
        { name: 'Full Body Health Checkup', price: 4000, discount_price: 2499, description: 'Comprehensive screening covering 60+ parameters.' },
        { name: 'Urine Routine & Microscopy', price: 300, discount_price: 199, description: 'Screening for urinary tract infections and kidney issues.' }
    ],
    'Scan': [
        { name: 'X-Ray Chest PA View', price: 600, discount_price: 450, description: 'Standard chest x-ray for lung and heart screening.' },
        { name: 'Ultrasound Whole Abdomen', price: 1800, discount_price: 1200, description: 'Imaging of abdominal organs like liver, kidneys, and gallbladder.' },
        { name: 'MRI Brain (Plain)', price: 8500, discount_price: 6500, description: 'Detailed scan of brain structure.' },
        { name: 'MRI Spine (Lumbar)', price: 9000, discount_price: 7000, description: 'Detailed MRI of the lower spine for disc and nerve evaluation.' },
        { name: 'MRI Knee Joint', price: 8000, discount_price: 6200, description: 'High-resolution MRI for knee ligament and cartilage assessment.' },
        { name: 'CT Scan Head (Plain)', price: 3500, discount_price: 2500, description: 'Fast scan for head injuries or neurological symptoms.' },
        { name: 'CT Scan Abdomen & Pelvis', price: 6500, discount_price: 5000, description: 'Comprehensive abdominal CT scan with contrast.' },
        { name: 'HRCT Chest (for Lungs)', price: 6000, discount_price: 4500, description: 'High-resolution scan for detailed lung analysis.' },
        { name: 'PET CT Scan (Whole Body)', price: 22000, discount_price: 18000, description: 'Combined PET-CT scan for cancer detection and staging.' },
        { name: 'ECG (Resting)', price: 500, discount_price: 350, description: 'Basic heart rhythm check.' },
        { name: '2D Echocardiography', price: 2500, discount_price: 1800, description: 'Ultrasound scan of the heart structure and function.' },
        { name: 'Digital Mammography', price: 2200, discount_price: 1500, description: 'Specialized imaging for breast health.' },
        { name: 'Color Doppler (Renal)', price: 3200, discount_price: 2200, description: 'Assessment of blood flow through renal vessels.' },
        { name: 'DEXA Bone Density Scan', price: 3500, discount_price: 2500, description: 'Measures bone mineral density to assess osteoporosis risk.' },
        { name: 'Ultrasound Thyroid', price: 1400, discount_price: 950, description: 'Imaging of the thyroid gland for nodules or enlargement.' },
        { name: 'Ultrasound Pelvis (Female)', price: 1600, discount_price: 1100, description: 'Evaluation of uterus, ovaries, and pelvic organs.' },
        { name: 'X-Ray KUB (Kidney, Ureter, Bladder)', price: 700, discount_price: 500, description: 'X-ray to detect kidney stones or abnormalities.' },
        { name: 'Stress Test (TMT)', price: 2800, discount_price: 2000, description: 'Treadmill test to evaluate heart response to exercise.' },
        { name: 'Holter Monitoring (24hr)', price: 4500, discount_price: 3200, description: '24-hour continuous ECG monitoring for cardiac arrhythmias.' },
        { name: 'Spirometry (Lung Function)', price: 1800, discount_price: 1300, description: 'Breathing test to diagnose asthma and COPD.' }
    ],
    'OPD': [
        { name: 'General Physician Consultation', price: 500, discount_price: 400, description: 'Consultation with a primary care doctor.' },
        { name: 'Cardiologist Consultation', price: 1000, discount_price: 800, description: 'Specialist consultation for heart issues.' },
        { name: 'Orthopedic Consultation', price: 800, discount_price: 600, description: 'Specialist consultation for bone and joint issues.' },
        { name: 'Pediatrician Consultation', price: 700, discount_price: 500, description: 'Specialist care for children.' },
        { name: 'Dermatologist Consultation', price: 900, discount_price: 700, description: 'Specialist consultation for skin and hair.' },
        { name: 'Gynecologist Consultation', price: 800, discount_price: 600, description: 'Specialist care for women health.' },
        { name: 'Neurologist Consultation', price: 1500, discount_price: 1200, description: 'Specialist consultation for nerve and brain issues.' },
        { name: 'Ophthalmologist Checkup', price: 600, discount_price: 450, description: 'Comprehensive eye examination.' },
        { name: 'Physiotherapy Session', price: 700, discount_price: 550, description: 'Physical rehabilitation session.' },
        { name: 'Psychotherapy / Counseling', price: 1800, discount_price: 1500, description: 'Mental health counseling session.' }
    ],
    'Surgery': [
        { name: 'Cataract Surgery (Phaco)', price: 35000, discount_price: 28000, description: 'Advanced lens replacement surgery for cataracts.' },
        { name: 'Appendectomy (Laparoscopic)', price: 60000, discount_price: 45000, description: 'Keyhole surgery for appendix removal.' },
        { name: 'Inguinal Hernia Repair', price: 45000, discount_price: 35000, description: 'Surgical repair of groin hernia.' },
        { name: 'Gallbladder Removal', price: 70000, discount_price: 55000, description: 'Surgical removal of the gallbladder (Cholecystectomy).' },
        { name: 'Knee Replacement (Single)', price: 180000, discount_price: 145000, description: 'Total knee arthroplasty.' },
        { name: 'Tonsillectomy', price: 25000, discount_price: 18000, description: 'Surgical removal of tonsils.' },
        { name: 'Kidney Stone Removal (Laser)', price: 80000, discount_price: 65000, description: 'Advanced laser lithotripsy for stones.' },
        { name: 'Cesarean Section (C-Section)', price: 55000, discount_price: 40000, description: 'Medically assisted childbirth.' },
        { name: 'Coronary Angioplasty', price: 150000, discount_price: 125000, description: 'Stent placement to open blocked arteries.' },
        { name: 'Herniated Disk Surgery', price: 120000, discount_price: 95000, description: 'Spine surgery for disk repair.' }
    ]
};

const calculateSlotCapacity = (hospitalName, serviceName, category) => {
    // 1. Determine base capacity
    let baseCapacity = 1;
    const nameLower = (serviceName || '').toLowerCase();

    if (category === 'Lab') {
        baseCapacity = 10;
    } else if (category === 'OPD') {
        if (nameLower.includes('general physician')) {
            baseCapacity = 6;
        } else if (nameLower.includes('physiotherapy') || nameLower.includes('psychotherapy') || nameLower.includes('counseling')) {
            baseCapacity = 2;
        } else {
            baseCapacity = 3;
        }
    } else if (category === 'Scan') {
        if (nameLower.includes('mri') || nameLower.includes('pet ct') || nameLower.includes('mammography') || nameLower.includes('dexa')) {
            baseCapacity = 1;
        } else if (nameLower.includes('ct scan') || nameLower.includes('hrct')) {
            baseCapacity = 2;
        } else if (nameLower.includes('ultrasound') || nameLower.includes('color doppler') || nameLower.includes('echo')) {
            baseCapacity = 3;
        } else if (nameLower.includes('x-ray') || nameLower.includes('ecg') || nameLower.includes('stress test') || nameLower.includes('tmt')) {
            baseCapacity = 5;
        } else {
            baseCapacity = 2;
        }
    } else if (category === 'Surgery') {
        baseCapacity = 1;
    }

    // 2. Determine hospital multiplier
    let multiplier = 1.0;
    const hospLower = (hospitalName || '').toLowerCase();
    if (hospLower.includes('shalby')) {
        multiplier = 1.5;
    } else if (hospLower.includes('gokuldas')) {
        multiplier = 1.2;
    } else if (hospLower.includes('synergy')) {
        multiplier = 1.0;
    } else if (hospLower.includes('eureka')) {
        multiplier = 0.8;
    } else if (hospLower.includes('city home')) {
        multiplier = 0.6;
    }

    // 3. Return rounded capacity (at least 1)
    return Math.max(1, Math.round(baseCapacity * multiplier));
};

const seedServices = async () => {
    try {
        console.log('Connecting to database...');
        
        // 1. Get all hospitals
        const res = await db.query('SELECT id, name FROM hospitals');
        const hospitals = res.rows;
        
        if (hospitals.length === 0) {
            console.log('No hospitals found. Please add hospitals first.');
            process.exit(1);
        }

        console.log(`Found ${hospitals.length} hospitals.`);

        // 2. Update all existing services in the database first to ensure correct capacities
        const existingServices = await db.query(
            'SELECT s.id, s.name, s.category, h.name as hospital_name FROM services s LEFT JOIN hospitals h ON s.hospital_id = h.id'
        );
        console.log(`Updating capacities for ${existingServices.rows.length} existing services...`);
        for (const service of existingServices.rows) {
            const capacity = calculateSlotCapacity(service.hospital_name, service.name, service.category);
            await db.query(
                'UPDATE services SET slot_capacity = $1 WHERE id = $2',
                [capacity, service.id]
            );
        }
        console.log('Existing service capacities updated.');

        // 3. For each hospital, ensure a mix of services
        for (const hospital of hospitals) {
            console.log(`Seeding mixed services for ${hospital.name}...`);
            
            for (const category of Object.keys(servicesData)) {
                // Select 3 random services from each category for each hospital
                const shuffled = [...servicesData[category]].sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 3);
                
                for (const service of selected) {
                    const capacity = calculateSlotCapacity(hospital.name, service.name, category);
                    // Check if service already exists
                    const existingRes = await db.query(
                        'SELECT id FROM services WHERE hospital_id = $1 AND name = $2 AND category = $3',
                        [hospital.id, service.name, category]
                    );

                    if (existingRes.rows.length > 0) {
                        const serviceId = existingRes.rows[0].id;
                        await db.query(
                            'UPDATE services SET price = $1, discount_price = $2, description = $3, slot_capacity = $4 WHERE id = $5',
                            [service.price, service.discount_price, service.description, capacity, serviceId]
                        );
                        console.log(`  Updated existing service "${service.name}" (${category}) with capacity ${capacity}`);
                    } else {
                        const query = `
                            INSERT INTO services (hospital_id, name, category, price, discount_price, description, slot_capacity)
                            VALUES ($1, $2, $3, $4, $5, $6, $7)
                        `;
                        await db.query(query, [
                            hospital.id,
                            service.name,
                            category,
                            service.price,
                            service.discount_price,
                            service.description,
                            capacity
                        ]);
                        console.log(`  Added new service "${service.name}" (${category}) with capacity ${capacity}`);
                    }
                }
            }
        }

        console.log('Successfully seeded/updated dummy services for all categories!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding services:', err);
        process.exit(1);
    }
};

seedServices();

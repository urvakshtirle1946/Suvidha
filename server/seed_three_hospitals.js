const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('./db');

const hospitalsToSeed = [
    {
        name: 'Gokuldas Hospital',
        location: 'A.B. Road, Indore, Madhya Pradesh',
        rating: 4.5,
        discount_percentage: 15,
        discount_description: 'Flat 15% off on all lab tests',
        image_url: '/uploads/Gokuldas.jpg',
        phone_number: '9826512345',
        map_url: 'https://maps.google.com/?q=Gokuldas+Hospital+Indore'
    },
    {
        name: 'Eureka Hospital',
        location: 'New Palasia, Indore, Madhya Pradesh',
        rating: 4.2,
        discount_percentage: 10,
        discount_description: '10% off on all OPD and Diagnostic services',
        image_url: 'https://images.unsplash.com/photo-1587351021759-3e566b9af953?auto=format&fit=crop&q=80&w=1000',
        phone_number: '9977123456',
        map_url: 'https://maps.google.com/?q=Eureka+Hospital+Indore'
    },
    {
        name: 'City Nursing Home',
        location: 'Vijay Nagar, Indore, Madhya Pradesh',
        rating: 4.0,
        discount_percentage: 12,
        discount_description: 'Flat 12% off on all services for senior citizens',
        image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
        phone_number: '7312567890',
        map_url: 'https://maps.google.com/?q=City+Nursing+Home+Indore'
    }
];

const servicesData = {
    Lab: [
        { name: 'Complete Blood Count (CBC)', price: 320, discount_price: 272, description: 'Evaluates overall health and detects disorders like anemia, infection, and leukemia.' },
        { name: 'Fasting Blood Sugar (FBS)', price: 100, discount_price: 85, description: 'Measures blood glucose after an overnight fast to screen for diabetes.' },
        { name: 'Post Prandial Blood Sugar (PPBS)', price: 100, discount_price: 85, description: 'Measures blood glucose 2 hours after a meal to monitor diabetes control.' },
        { name: 'HbA1c (Glycated Hemoglobin)', price: 700, discount_price: 595, description: 'Reflects average blood sugar levels over 2-3 months; key diabetes monitor.' },
        { name: 'Lipid Profile', price: 800, discount_price: 680, description: 'Measures total cholesterol, HDL, LDL, VLDL and triglycerides for cardiac risk.' },
        { name: 'Liver Function Test (LFT)', price: 850, discount_price: 725, description: 'Evaluates liver enzymes, proteins, and bilirubin to assess liver health.' },
        { name: 'Kidney Function Test (KFT)', price: 800, discount_price: 680, description: 'Measures urea, creatinine, and electrolytes to evaluate kidney performance.' },
        { name: 'Thyroid Profile (T3, T4, TSH)', price: 700, discount_price: 595, description: 'Assesses thyroid hormone levels to diagnose hypo/hyperthyroidism.' },
        { name: 'Vitamin D3 (25-OH)', price: 1400, discount_price: 1190, description: 'Measures Vitamin D level for bone health, immunity, and fatigue assessment.' },
        { name: 'Vitamin B12', price: 1150, discount_price: 975, description: 'Detects B12 deficiency causing anemia, fatigue, and nerve damage.' },
        { name: 'Urine Routine and Microscopy', price: 150, discount_price: 128, description: 'Screens urine for infections, kidney disease, and metabolic disorders.' },
        { name: 'SGPT / ALT', price: 150, discount_price: 128, description: 'Liver enzyme test to detect liver inflammation or damage.' },
        { name: 'SGOT / AST', price: 150, discount_price: 128, description: 'Enzyme test assessing liver and cardiac muscle health.' },
        { name: 'Serum Creatinine', price: 150, discount_price: 128, description: 'Measures creatinine levels to evaluate kidney filtration function.' },
        { name: 'Uric Acid (Serum)', price: 200, discount_price: 170, description: 'Measures uric acid to detect gout, kidney stones, or hyperuricemia.' },
        { name: 'Total Bilirubin', price: 250, discount_price: 212, description: 'Diagnoses jaundice, liver disease, or hemolytic conditions.' },
        { name: 'C-Reactive Protein (CRP)', price: 500, discount_price: 425, description: 'Detects inflammation levels in the body for infection or autoimmune disease.' },
        { name: 'Dengue NS1 Antigen', price: 600, discount_price: 510, description: 'Early detection of Dengue viral infection via NS1 antigen testing.' },
        { name: 'Dengue Profile (NS1 + IgM + IgG)', price: 1750, discount_price: 1488, description: 'Comprehensive panel for early and late dengue diagnosis.' },
        { name: 'Widal Test', price: 250, discount_price: 212, description: 'Agglutination test to detect typhoid fever (Salmonella antibodies).' },
        { name: 'Malaria Parasite (Peripheral Smear)', price: 200, discount_price: 170, description: 'Microscopic blood examination to detect malaria-causing parasites.' },
        { name: 'HBsAg (Hepatitis B Surface Antigen)', price: 400, discount_price: 340, description: 'Screens for active or chronic Hepatitis B infection.' },
        { name: 'HIV 1 and 2 Antibody Test', price: 500, discount_price: 425, description: 'Screens for antibodies to Human Immunodeficiency Virus types 1 and 2.' },
        { name: 'Prothrombin Time (PT / INR)', price: 400, discount_price: 340, description: 'Evaluates blood clotting ability; used to monitor anticoagulant therapy.' },
        { name: 'Erythrocyte Sedimentation Rate (ESR)', price: 150, discount_price: 128, description: 'Detects inflammation or infection through red blood cell sedimentation rate.' },
        { name: 'Iron Studies (Serum Iron + TIBC + Ferritin)', price: 600, discount_price: 510, description: 'Evaluates iron stores to diagnose iron deficiency or overload.' },
        { name: 'Calcium (Serum)', price: 200, discount_price: 170, description: 'Assesses calcium levels related to bone, nerve, and heart health.' },
        { name: 'Serum Electrolytes (Na, K, Cl)', price: 440, discount_price: 374, description: 'Measures sodium, potassium, and chloride balance for body fluid regulation.' },
        { name: 'Full Body Health Checkup', price: 3500, discount_price: 2975, description: 'Comprehensive panel of 60+ tests covering all major organ systems.' },
        { name: 'Stool Routine and Microscopy', price: 250, discount_price: 212, description: 'Detects parasites, bacteria, and blood in stool for GI disorders.' }
    ],
    Scan: [
        { name: 'X-Ray Chest PA View', price: 400, discount_price: 340, description: 'Standard posteroanterior chest X-ray for lung and cardiac screening.' },
        { name: 'X-Ray KUB (Kidney, Ureter, Bladder)', price: 500, discount_price: 425, description: 'Abdominal X-ray to detect kidney stones or urinary tract abnormalities.' },
        { name: 'X-Ray Lumbosacral Spine', price: 600, discount_price: 510, description: 'Imaging of lower back vertebrae for disc and alignment evaluation.' },
        { name: 'Ultrasound Whole Abdomen', price: 1500, discount_price: 1275, description: 'Comprehensive abdominal scan including liver, kidneys, gallbladder, and spleen.' },
        { name: 'Ultrasound Thyroid', price: 900, discount_price: 765, description: 'Detailed imaging of the thyroid gland for nodules or size assessment.' },
        { name: 'Ultrasound Pelvis (Female)', price: 1000, discount_price: 850, description: 'Evaluates uterus, ovaries, and pelvic structures.' },
        { name: 'Ultrasound Obstetric (Pregnancy)', price: 1200, discount_price: 1020, description: 'Monitors fetal growth, position, and amniotic fluid levels during pregnancy.' },
        { name: 'ECG (Resting 12-Lead)', price: 300, discount_price: 255, description: 'Records electrical activity of the heart to detect arrhythmias or ischemia.' },
        { name: '2D Echocardiography', price: 2000, discount_price: 1700, description: 'Ultrasound of the heart to assess valves, chambers, and cardiac function.' },
        { name: 'Stress Test (TMT / Treadmill)', price: 2200, discount_price: 1870, description: 'Evaluates heart function under physical stress to detect ischemia.' },
        { name: 'CT Scan Head (Plain)', price: 3000, discount_price: 2550, description: 'Fast, detailed brain scan for injuries, stroke, or neurological symptoms.' },
        { name: 'CT Scan Chest', price: 4500, discount_price: 3825, description: 'Detailed cross-sectional imaging of chest for lung diseases.' },
        { name: 'HRCT Chest (for Lungs)', price: 5500, discount_price: 4675, description: 'High-resolution CT for detailed analysis of lung parenchyma (e.g., COVID, TB).' },
        { name: 'CT Scan Abdomen and Pelvis (Contrast)', price: 6000, discount_price: 5100, description: 'Contrast-enhanced abdominal CT for detailed organ and vessel evaluation.' },
        { name: 'MRI Brain (Plain)', price: 7000, discount_price: 5950, description: 'Detailed MRI scan of the brain for neurological disorders.' },
        { name: 'MRI Spine (Lumbar)', price: 7500, discount_price: 6375, description: 'MRI of the lower spine for disc herniation, sciatica, or nerve compression.' },
        { name: 'MRI Knee Joint', price: 7000, discount_price: 5950, description: 'High-resolution MRI for ligament tears, cartilage damage, or meniscus injury.' },
        { name: 'Color Doppler (Carotid Artery)', price: 2500, discount_price: 2125, description: 'Ultrasound to assess blood flow in neck arteries for stroke risk.' },
        { name: 'Color Doppler (Lower Limb Venous)', price: 2500, discount_price: 2125, description: 'Detects DVT or venous insufficiency in legs using Doppler ultrasound.' },
        { name: 'Digital Mammography', price: 1800, discount_price: 1530, description: 'Specialized breast imaging for early cancer detection; recommended for women 40+.' },
        { name: 'DEXA Bone Density Scan', price: 2800, discount_price: 2380, description: 'Measures bone mineral density to assess osteoporosis risk.' },
        { name: 'Spirometry (Lung Function Test)', price: 1200, discount_price: 1020, description: 'Breathing test to diagnose asthma, COPD, or other pulmonary conditions.' },
        { name: 'Holter Monitoring (24-Hour ECG)', price: 3500, discount_price: 2975, description: 'Continuous 24-hour ECG recording to detect intermittent arrhythmias.' }
    ],
    OPD: [
        { name: 'General Physician Consultation', price: 400, discount_price: 340, description: 'Primary care consultation for fever, infections, lifestyle diseases, and referrals.' },
        { name: 'Cardiologist Consultation', price: 800, discount_price: 680, description: 'Specialist consultation for chest pain, hypertension, and heart conditions.' },
        { name: 'Orthopedic Surgeon Consultation', price: 700, discount_price: 595, description: 'Expert consultation for bone fractures, joint pain, and sports injuries.' },
        { name: 'Gynecologist Consultation', price: 700, discount_price: 595, description: 'Women health specialist for menstrual disorders, pregnancy, and PCOD.' },
        { name: 'Pediatrician Consultation', price: 600, discount_price: 510, description: 'Child health specialist for infants, toddlers, and teenagers.' },
        { name: 'Dermatologist Consultation', price: 700, discount_price: 595, description: 'Skin, hair, and nail specialist for acne, eczema, psoriasis, or infections.' },
        { name: 'ENT Specialist Consultation', price: 600, discount_price: 510, description: 'Ear, Nose and Throat specialist for sinusitis, hearing loss, or tonsil problems.' },
        { name: 'Neurologist Consultation', price: 1200, discount_price: 1020, description: 'Specialist for headaches, seizures, stroke management, and neuropathy.' },
        { name: 'Gastroenterologist Consultation', price: 900, discount_price: 765, description: 'Digestive system specialist for IBS, GERD, liver, and intestinal disorders.' },
        { name: 'Diabetologist Consultation', price: 900, discount_price: 765, description: 'Specialist for diabetes management, thyroid disorders, and hormonal conditions.' },
        { name: 'Pulmonologist Consultation', price: 800, discount_price: 680, description: 'Lung specialist for asthma, COPD, TB, or COVID-related complications.' },
        { name: 'Ophthalmologist Consultation', price: 500, discount_price: 425, description: 'Eye specialist for vision screening, refractive errors, and eye diseases.' },
        { name: 'Psychiatrist Consultation', price: 1200, discount_price: 1020, description: 'Mental health physician for depression, anxiety, OCD, or psychosis.' },
        { name: 'Physiotherapy Session (Initial)', price: 600, discount_price: 510, description: 'Initial physiotherapy assessment with treatment for pain or mobility issues.' },
        { name: 'Physiotherapy Session (Follow-up)', price: 400, discount_price: 340, description: 'Follow-up physiotherapy for ongoing rehabilitation and recovery.' },
        { name: 'Dietitian Consultation', price: 600, discount_price: 510, description: 'Personalized diet plan for weight management, diabetes, or sports nutrition.' },
        { name: 'Dental Consultation and Checkup', price: 300, discount_price: 255, description: 'Oral health examination, cleaning advice, and cavity or gum assessment.' },
        { name: 'Urologist Consultation', price: 800, discount_price: 680, description: 'Specialist for kidney stones, UTIs, prostate issues, and urinary disorders.' }
    ],
    Surgery: [
        { name: 'Cataract Surgery (Phacoemulsification)', price: 30000, discount_price: 25500, description: 'Advanced lens replacement surgery for cataracts using ultrasound technique.' },
        { name: 'Appendectomy (Laparoscopic)', price: 55000, discount_price: 46750, description: 'Minimally invasive keyhole surgery for appendix removal.' },
        { name: 'Cholecystectomy (Gallbladder Removal)', price: 65000, discount_price: 55250, description: 'Laparoscopic removal of the gallbladder for gallstones or cholecystitis.' },
        { name: 'Inguinal Hernia Repair (Laparoscopic)', price: 45000, discount_price: 38250, description: 'Minimally invasive repair of groin hernia using mesh reinforcement.' },
        { name: 'Tonsillectomy', price: 22000, discount_price: 18700, description: 'Surgical removal of tonsils for recurrent throat infections or obstructed airway.' },
        { name: 'Septoplasty (Nasal Septum Correction)', price: 35000, discount_price: 29750, description: 'Surgery to correct a deviated nasal septum, improving breathing.' },
        { name: 'Cesarean Section (C-Section)', price: 50000, discount_price: 42500, description: 'Medically assisted surgical delivery for complications during pregnancy.' },
        { name: 'Hysterectomy (Laparoscopic)', price: 80000, discount_price: 68000, description: 'Minimally invasive removal of uterus for fibroids, cancer, or endometriosis.' },
        { name: 'Knee Replacement (Total)', price: 160000, discount_price: 136000, description: 'Total knee arthroplasty to replace damaged knee joint with prosthesis.' },
        { name: 'Hip Replacement (Total)', price: 180000, discount_price: 153000, description: 'Surgical replacement of hip joint for severe arthritis or fracture.' },
        { name: 'Kidney Stone Removal (Laser)', price: 75000, discount_price: 63750, description: 'Percutaneous nephrolithotomy or laser lithotripsy for large kidney stones.' },
        { name: 'Varicocele Surgery (Laparoscopic)', price: 40000, discount_price: 34000, description: 'Minimally invasive treatment of enlarged veins in the scrotum.' },
        { name: 'Piles Surgery (Stapler Hemorrhoidopexy)', price: 45000, discount_price: 38250, description: 'Stapled hemorrhoidopexy for internal hemorrhoids with minimal pain and recovery.' },
        { name: 'Fissure and Fistula Surgery', price: 35000, discount_price: 29750, description: 'Surgical treatment of anal fissure or fistula-in-ano.' },
        { name: 'Thyroidectomy (Partial / Total)', price: 70000, discount_price: 59500, description: 'Removal of thyroid gland (partial or total) for goiter, cancer, or hyperthyroidism.' }
    ]
};

const calculateSlotCapacity = (hospitalName, serviceName, category) => {
    let baseCapacity = 1;
    const nameLower = (serviceName || '').toLowerCase();
    if (category === 'Lab') {
        baseCapacity = 10;
    } else if (category === 'OPD') {
        if (nameLower.includes('general physician')) baseCapacity = 6;
        else baseCapacity = 3;
    } else if (category === 'Scan') {
        if (nameLower.includes('mri') || nameLower.includes('dexa') || nameLower.includes('mammography')) baseCapacity = 2;
        else if (nameLower.includes('ct scan') || nameLower.includes('hrct') || nameLower.includes('holter')) baseCapacity = 3;
        else if (nameLower.includes('ultrasound') || nameLower.includes('doppler') || nameLower.includes('echo')) baseCapacity = 4;
        else if (nameLower.includes('x-ray') || nameLower.includes('ecg') || nameLower.includes('spirometry')) baseCapacity = 6;
        else baseCapacity = 3;
    } else if (category === 'Surgery') {
        baseCapacity = 1;
    }
    const hospLower = (hospitalName || '').toLowerCase();
    let multiplier = 1.0;
    if (hospLower.includes('gokuldas')) multiplier = 1.2;
    else if (hospLower.includes('eureka')) multiplier = 0.9;
    else if (hospLower.includes('city nursing')) multiplier = 0.8;
    return Math.max(1, Math.round(baseCapacity * multiplier));
};

const seedHospitalsAndServices = async () => {
    try {
        console.log('Starting seed: Gokuldas, Eureka and City Nursing Home...');
        const insertedHospitals = [];

        for (const h of hospitalsToSeed) {
            const check = await db.query('SELECT id FROM hospitals WHERE name = $1', [h.name]);
            let hospitalId;
            if (check.rows.length > 0) {
                hospitalId = check.rows[0].id;
                await db.query(
                    'UPDATE hospitals SET location=$1, rating=$2, discount_percentage=$3, discount_description=$4, image_url=$5, phone_number=$6, map_url=$7 WHERE id=$8',
                    [h.location, h.rating, h.discount_percentage, h.discount_description, h.image_url, h.phone_number, h.map_url, hospitalId]
                );
                console.log('Updated hospital: ' + h.name + ' (id=' + hospitalId + ')');
            } else {
                const res = await db.query(
                    'INSERT INTO hospitals (name, location, rating, discount_percentage, discount_description, image_url, phone_number, map_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id',
                    [h.name, h.location, h.rating, h.discount_percentage, h.discount_description, h.image_url, h.phone_number, h.map_url]
                );
                hospitalId = res.rows[0].id;
                console.log('Inserted hospital: ' + h.name + ' (id=' + hospitalId + ')');
            }
            insertedHospitals.push({ id: hospitalId, name: h.name });
        }

        console.log('Seeding services...');
        for (const hospital of insertedHospitals) {
            let added = 0, updated = 0;
            for (const [category, services] of Object.entries(servicesData)) {
                for (const service of services) {
                    const capacity = calculateSlotCapacity(hospital.name, service.name, category);
                    const existRes = await db.query(
                        'SELECT id FROM services WHERE hospital_id=$1 AND name=$2 AND category=$3',
                        [hospital.id, service.name, category]
                    );
                    if (existRes.rows.length > 0) {
                        await db.query(
                            'UPDATE services SET price=$1, discount_price=$2, description=$3, slot_capacity=$4 WHERE id=$5',
                            [service.price, service.discount_price, service.description, capacity, existRes.rows[0].id]
                        );
                        updated++;
                    } else {
                        await db.query(
                            'INSERT INTO services (hospital_id, name, category, price, discount_price, description, slot_capacity) VALUES ($1,$2,$3,$4,$5,$6,$7)',
                            [hospital.id, service.name, category, service.price, service.discount_price, service.description, capacity]
                        );
                        added++;
                    }
                }
            }
            console.log(hospital.name + ': ' + added + ' added, ' + updated + ' updated');
        }

        console.log('Seeding complete! Verifying counts...');
        for (const hospital of insertedHospitals) {
            const countRes = await db.query(
                'SELECT category, COUNT(*) as cnt FROM services WHERE hospital_id=$1 AND is_deleted=false GROUP BY category ORDER BY category',
                [hospital.id]
            );
            console.log('  ' + hospital.name + ':');
            for (const row of countRes.rows) {
                console.log('    ' + row.category + ': ' + row.cnt + ' services');
            }
        }

        process.exit(0);
    } catch (err) {
        console.error('Error seeding:', err.message);
        process.exit(1);
    }
};

seedHospitalsAndServices();

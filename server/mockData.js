const mockHospitals = [
    {
        id: 'h1',
        name: 'City General Hospital',
        location: 'Downtown, Mumbai',
        rating: 4.5,
        discount_percentage: 15,
        discount_description: 'Flat 15% off on all lab tests',
        image_url: 'https://images.unsplash.com/photo-1586773860418-d373a2157dcc?q=80&w=1000&auto=format&fit=crop',
        phone_number: '9876543210',
        map_url: 'https://maps.google.com'
    },
    {
        id: 'h2',
        name: 'St. Mary\'s Specialty Clinic',
        location: 'Andheri West, Mumbai',
        rating: 4.8,
        discount_percentage: 20,
        discount_description: 'Special weekend health package',
        image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop',
        phone_number: '9999999999',
        map_url: 'https://maps.google.com'
    },
    {
        id: 'h3',
        name: 'Sunshine Pediatric Care',
        location: 'Bandra, Mumbai',
        rating: 4.2,
        discount_percentage: 10,
        discount_description: 'Free consultation for kids below 5',
        image_url: 'https://images.unsplash.com/photo-1505751172107-1bc596d13dcc?q=80&w=1000&auto=format&fit=crop',
        phone_number: '8888888888',
        map_url: 'https://maps.google.com'
    }
];

const mockServices = [
    {
        id: 's1',
        hospital_id: 'h1',
        name: 'Full Body Health Checkup',
        category: 'Lab',
        price: 2500,
        discount_price: 1999,
        description: 'Comprehensive blood test and vital screening.',
        hospital_name: 'City General Hospital',
        hospital_location: 'Downtown, Mumbai'
    },
    {
        id: 's2',
        hospital_id: 'h1',
        name: 'Chest X-Ray',
        category: 'Scan',
        price: 800,
        discount_price: 650,
        description: 'High-resolution digital X-ray.',
        hospital_name: 'City General Hospital',
        hospital_location: 'Downtown, Mumbai'
    },
    {
        id: 's3',
        hospital_id: 'h2',
        name: 'Cardiology Consultation',
        category: 'OPD',
        price: 1000,
        discount_price: 800,
        description: 'Consultation with senior heart specialist.',
        hospital_name: 'St. Mary\'s Specialty Clinic',
        hospital_location: 'Andheri West, Mumbai'
    },
    {
        id: 's4',
        hospital_id: 'h3',
        name: 'Child Vaccination Package',
        category: 'Lab',
        price: 1500,
        discount_price: 1200,
        description: 'Monthly essential vaccines for toddlers.',
        hospital_name: 'Sunshine Pediatric Care',
        hospital_location: 'Bandra, Mumbai'
    }
];

module.exports = { mockHospitals, mockServices };

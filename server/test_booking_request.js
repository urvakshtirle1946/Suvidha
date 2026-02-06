const http = require('http');

const data = JSON.stringify({
    name: 'Debug User',
    age: 30,
    gender: 'Male',
    date: '2026-02-10',
    time: '10:00 AM',
    address: 'Debug Address',
    serviceName: 'Debug Service',
    price: 500,
    userPhone: '9329017929',
    hospitalId: 5 
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/bookings',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log('Sending Test Booking Request...');
const req = http.request(options, (res) => {
    console.log(`StatusCode: ${res.statusCode}`);
    
    let responseBody = '';
    res.on('data', (chunk) => {
        responseBody += chunk;
    });
    
    res.on('end', () => {
        console.log('Response:', responseBody);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();

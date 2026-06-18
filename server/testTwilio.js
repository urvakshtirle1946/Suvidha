const twilio = require('twilio');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;
const toPhone = process.env.ADMIN_PHONE_NUMBER || '+919329017929'; 

console.log('--- Debug Info ---');
console.log('SID:', accountSid ? accountSid.substring(0,6) + '...' : 'MISSING');
console.log('Token:', authToken ? 'PRESENT' : 'MISSING');
console.log('From:', fromPhone);
console.log('To:', toPhone);

async function test() {
    try {
        if (!accountSid || !authToken) {
            throw new Error('Missing credentials');
        }
        const client = twilio(accountSid, authToken);
        console.log('Attempting to send WhatsApp...');
        const msg = await client.messages.create({
            body: 'Debug Test Message ' + Date.now(),
            from: `whatsapp:${fromPhone}`,
            to: `whatsapp:${toPhone}`
        });
        console.log('SUCCESS! SID:', msg.sid);
    } catch (err) {
        console.error('FAILURE:', err.message);
        if (err.code) console.error('Code:', err.code);
    }
}

test();

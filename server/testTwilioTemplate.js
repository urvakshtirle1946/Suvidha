const twilio = require('twilio');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// Use the sandbox number explicitly as per the snippet or env
const fromPhone = process.env.TWILIO_PHONE_NUMBER; 
const toPhone = '+919329017929'; 

console.log('--- Template Debug Info ---');
console.log('SID:', accountSid ? accountSid.substring(0,6) + '...' : 'MISSING');
console.log('From:', fromPhone);
console.log('To:', toPhone);

async function testTemplate() {
    try {
        const client = twilio(accountSid, authToken);
        console.log('Attempting to send WhatsApp Template...');
        
        // This format mimics the user's snippet exactly
        const msg = await client.messages.create({
            from: `whatsapp:${fromPhone}`,
            to: `whatsapp:${toPhone}`,
            contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
            contentVariables: JSON.stringify({
                "1": "12/1",
                "2": "3pm"
            })
        });
        
        console.log('SUCCESS! SID:', msg.sid);
        if (msg.errorCode) console.warn('Warning: Message has error code:', msg.errorCode);
        if (msg.errorMessage) console.warn('Warning: Message has error msg:', msg.errorMessage);
        
    } catch (err) {
        console.error('FAILURE:', err.message);
        if (err.code) console.error('Code:', err.code);
        if (err.moreInfo) console.error('More Info:', err.moreInfo);
    }
}

testTemplate();

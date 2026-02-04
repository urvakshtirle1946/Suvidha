const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

// Replace with the number you want to test (must be verified if on trial)
const toPhone = '+919329017929'; 

console.log('--- Twilio Test Script ---');
console.log('Account SID:', accountSid ? 'Loaded' : 'Missing');
console.log('Auth Token:', authToken ? 'Loaded' : 'Missing');
console.log('From Phone:', fromPhone);
console.log('To Phone:', toPhone);
console.log('--------------------------');

const client = twilio(accountSid, authToken);

client.messages.create({
  body: 'This is a test message from your Suvidha Backend via Twilio.',
  from: fromPhone,
  to: toPhone
})
.then(message => {
  console.log('✅ Success! Message SID:', message.sid);
  if (message.errorCode) {
    console.error('⚠️  Warning: Message sent but has error code:', message.errorCode);
  }
})
.catch(error => {
  console.error('❌ Failed to send SMS:', error.message);
  console.error('Error Code:', error.code);
  console.error('More Info:', error.moreInfo);
});

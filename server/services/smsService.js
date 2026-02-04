const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

let client;

if (accountSid && authToken && !accountSid.includes('your_account_sid')) {
  client = twilio(accountSid, authToken);
} else {
  console.warn('[Twilio] Missing or invalid credentials. SMS will NOT be sent via Twilio.');
}

exports.sendSms = async (to, body) => {
  if (!client) {
    console.log(`[MOCK SMS] To: ${to}, Body: ${body}`);
    return { success: true, mock: true };
  }

  try {
    const message = await client.messages.create({
      body,
      from: fromPhone,
      to,
    });
    console.log(`[Twilio] Message sent: ${message.sid}`);
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error('[Twilio] Error sending SMS:', error.message);
    console.warn('[Twilio] Falling back to MOCK SMS due to error.');
    console.log(`[MOCK SMS (Fallback)] To: ${to}, Body: ${body}`);
    // Return success so the flow doesn't break for the user
    return { success: true, mock: true, error: error.message };
  }
};

exports.sendWhatsapp = async (to, body) => {
  if (!client) {
    console.log(`[MOCK WHATSAPP] To: ${to}, Body: ${body}`);
    return { success: true, mock: true };
  }

  try {
    // Twilio Whatsapp requires 'whatsapp:' prefix for both to/from
    // Ensure 'to' number has + prefix if missing (basic check)
    if (!to.startsWith('+')) {
        to = '+' + to;
    }

    const message = await client.messages.create({
      body,
      from: `whatsapp:${fromPhone}`, 
      to: `whatsapp:${to}`,
    });
    console.log(`[Twilio WA] Message sent: ${message.sid}`);
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error('[Twilio WA] Error sending Whatsapp:', error.message);
    console.warn('[Twilio WA] Falling back to MOCK WHATSAPP due to error.');
    console.log(`[MOCK WHATSAPP (Fallback)] To: ${to}, Body: ${body}`);
    return { success: true, mock: true, error: error.message };
  }
};

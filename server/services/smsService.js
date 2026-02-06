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

    console.log(`[Twilio WA Service] Sending to: ${to} | From: ${fromPhone} | SID Loaded: ${!!accountSid}`);

    const message = await client.messages.create({
      body,
      from: `whatsapp:${fromPhone}`, 
      to: `whatsapp:${to}`,
    });
    console.log(`[Twilio WA] Message sent successfully: ${message.sid}`);
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error('[Twilio WA] FATAL ERROR sending Whatsapp:', error);
    console.error('[Twilio WA] Error Code:', error.code);
    console.error('[Twilio WA] Error More Info:', error.moreInfo);
    console.warn('[Twilio WA] Falling back to MOCK WHATSAPP due to error.');
    console.log(`[MOCK WHATSAPP (Fallback)] To: ${to}, Body: ${body}`);
    return { success: true, mock: true, error: error.message };
  }
};

exports.sendWhatsappTemplate = async (to, contentSid, contentVariables) => {
    if (!client) {
      console.log(`[MOCK WA TEMPLATE] To: ${to}, SID: ${contentSid}, Vars: ${contentVariables}`);
      return { success: true, mock: true };
    }
  
    try {
      if (!to.startsWith('+')) {
          to = '+' + to;
      }
  
      // contentVariables must be a JSON string
      const variablesStr = typeof contentVariables === 'string' 
          ? contentVariables 
          : JSON.stringify(contentVariables);
  
      console.log(`[Twilio WA Template] Sending to: ${to} | SID: ${contentSid}`);
  
      const message = await client.messages.create({
        from: `whatsapp:${fromPhone}`,
        to: `whatsapp:${to}`,
        contentSid: contentSid,
        contentVariables: variablesStr
      });
      
      console.log(`[Twilio WA] Template sent successfully: ${message.sid}`);
      return { success: true, sid: message.sid };
    } catch (error) {
      console.error('[Twilio WA] FATAL ERROR sending Template:', error);
      console.error('[Twilio WA] Error Code:', error.code);
      return { success: false, error: error.message };
    }
  };

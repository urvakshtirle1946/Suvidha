const nodemailer = require('nodemailer');

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT || 587;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

let transporter;

if (smtpHost && smtpUser && smtpPass) {
  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort),
    secure: smtpPort == 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
  
  // Verify connection configuration
  transporter.verify((error, success) => {
    if (error) {
      console.warn('[Nodemailer] Warning: Connection verification failed:', error.message);
    } else {
      console.log('[Nodemailer] Server is ready to take our messages');
    }
  });
} else {
  console.warn('[Nodemailer] Missing or invalid SMTP credentials. Emails will NOT be sent.');
}

/**
 * Sends a waitlist confirmation email.
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 */
exports.sendWaitlistConfirmation = async (email, name) => {
  const mailOptions = {
    from: `"The Zelp Team" <${smtpUser}>`,
    to: email,
    subject: 'Welcome to the Zelp Waitlist! 🚀',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #1a120a; font-size: 24px; margin: 0;">Welcome to Zelp</h1>
        </div>
        
        <div style="padding: 20px; background-color: #fff; border: 1px solid #eee; border-radius: 8px;">
          <p>Hi <strong>${name || 'there'}</strong>,</p>
          
          <p>You're officially on the waitlist for <strong>Zelp</strong>! 🎉</p>
          
          <p>We're building the future of healthcare booking, and we're thrilled to have you with us from the start. As an early supporter, you'll get:</p>
          
          <ul style="padding-left: 20px;">
            <li><strong>Priority access</strong> when we launch in your area.</li>
            <li><strong>Exclusive early-bird discounts</strong> on medical tests.</li>
            <li><strong>Direct updates</strong> on our progress and new features.</li>
          </ul>
          
          <p>We'll notify you the moment a slot becomes available. In the meantime, feel free to follow us on <a href="https://x.com/tryzelp" style="color: #2b1b12; font-weight: bold; text-decoration: none;">X/Twitter</a> for the latest updates.</p>
          
          <p style="margin-top: 30px;">Stay healthy,<br>
          <strong>The Zelp Team</strong><br>
          <small>Built with ❤️ in Indore</small></p>
        </div>
        
        <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
          &copy; 2024 Zelp. All rights reserved.
        </div>
      </div>
    `,
  };

  if (!transporter) {
    console.log(`[MOCK EMAIL] To: ${email}, Subject: ${mailOptions.subject}`);
    console.log(`[MOCK EMAIL] Body excerpt: "Hi ${name}, You're officially on the waitlist..."`);
    return { success: true, mock: true };
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Nodemailer] Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Nodemailer] Error sending email:', error.message);
    console.warn('[Nodemailer] Falling back to MOCK EMAIL due to error.');
    console.log(`[MOCK EMAIL (Fallback)] To: ${email}, Subject: ${mailOptions.subject}`);
    return { success: true, mock: true, error: error.message };
  }
};

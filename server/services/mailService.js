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
    connectionTimeout: 5000, // 5 seconds
    greetingTimeout: 5000,   // 5 seconds
    socketTimeout: 5000,     // 5 seconds
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

/**
 * Sends a welcome email to a newly registered user.
 * @param {string} email - Recipient email
 * @param {string} name  - Recipient name
 */
exports.sendWelcomeEmail = async (email, name) => {
  const firstName = (name || 'there').split(' ')[0];

  const mailOptions = {
    from: `"Suvidha Health" <${smtpUser}>`,
    to: email,
    subject: `Welcome to Suvidha, ${firstName}! 🎉 Your account is ready`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Suvidha</title>
      </head>
      <body style="margin:0;padding:0;background:#f4f7fb;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#1a6b5a 0%,#25a585 100%);border-radius:16px 16px 0 0;padding:40px 48px 32px;text-align:center;">
                    <div style="display:inline-block;background:rgba(255,255,255,0.18);border-radius:50%;width:64px;height:64px;line-height:64px;font-size:32px;margin-bottom:16px;">🏥</div>
                    <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">Welcome to Suvidha</h1>
                    <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">Healthcare, simplified for you.</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="background:#ffffff;padding:40px 48px;">
                    <p style="margin:0 0 20px;font-size:16px;color:#1a2433;line-height:1.6;">Hi <strong>${firstName}</strong>,</p>
                    <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
                      Your Suvidha account is now set up and ready to go! We're thrilled to have you on board.
                      Here's what you can do right from the start:
                    </p>

                    <!-- Feature Cards -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                      <tr>
                        <td style="background:#f0faf6;border-left:4px solid #25a585;border-radius:8px;padding:16px 20px;margin-bottom:12px;">
                          <p style="margin:0;font-size:14px;color:#1a6b5a;"><strong>🔍 Find Hospitals & Clinics</strong></p>
                          <p style="margin:4px 0 0;font-size:13px;color:#4b5563;">Search nearby healthcare providers and view ratings, services, and availability.</p>
                        </td>
                      </tr>
                      <tr><td style="height:10px;"></td></tr>
                      <tr>
                        <td style="background:#f0faf6;border-left:4px solid #25a585;border-radius:8px;padding:16px 20px;">
                          <p style="margin:0;font-size:14px;color:#1a6b5a;"><strong>📅 Book Appointments Instantly</strong></p>
                          <p style="margin:4px 0 0;font-size:13px;color:#4b5563;">Schedule lab tests, doctor visits, and more — all in a few taps.</p>
                        </td>
                      </tr>
                      <tr><td style="height:10px;"></td></tr>
                      <tr>
                        <td style="background:#f0faf6;border-left:4px solid #25a585;border-radius:8px;padding:16px 20px;">
                          <p style="margin:0;font-size:14px;color:#1a6b5a;"><strong>🚑 Request an Ambulance</strong></p>
                          <p style="margin:4px 0 0;font-size:13px;color:#4b5563;">Get emergency medical transport quickly when every second counts.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding:8px 0 32px;">
                          <a href="https://suvidha-client.onrender.com" style="display:inline-block;background:linear-gradient(135deg,#1a6b5a,#25a585);color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 36px;border-radius:50px;letter-spacing:0.3px;">Get Started →</a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;">If you have any questions, simply reply to this email — we're always happy to help.</p>
                    <p style="margin:24px 0 0;font-size:15px;color:#374151;">Stay healthy,<br /><strong>The Suvidha Team</strong><br /><span style="font-size:12px;color:#9ca3af;">Built with ❤️ in Indore</span></p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:24px 48px;text-align:center;border-top:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:12px;color:#9ca3af;">© 2025 Suvidha Health. All rights reserved.</p>
                    <p style="margin:6px 0 0;font-size:12px;color:#9ca3af;">You received this email because you signed up for a Suvidha account.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  if (!transporter) {
    console.log(`[MOCK WELCOME EMAIL] To: ${email}, Subject: ${mailOptions.subject}`);
    return { success: true, mock: true };
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Nodemailer] Welcome email sent to ${email}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Nodemailer] Error sending welcome email:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Sends a booking confirmation email to the user.
 * @param {string} email       - Recipient email
 * @param {Object} booking     - Booking details
 */
exports.sendBookingConfirmation = async (email, booking) => {
  const {
    patientName,
    serviceName,
    hospitalName,
    date,
    time,
    address,
    transactionId,
    bookingId,
    price,
  } = booking;

  const mailOptions = {
    from: `"Suvidha Health" <${smtpUser}>`,
    to: email,
    subject: `Booking Confirmed ✅ – ${serviceName} on ${date}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Booking Confirmation</title>
      </head>
      <body style="margin:0;padding:0;background:#f4f7fb;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#1a6b5a 0%,#25a585 100%);border-radius:16px 16px 0 0;padding:36px 48px 28px;text-align:center;">
                    <div style="font-size:40px;margin-bottom:12px;">✅</div>
                    <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">Booking Confirmed!</h1>
                    <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Your appointment has been successfully booked.</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="background:#ffffff;padding:36px 48px;">
                    <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">Hi <strong>${patientName || 'there'}</strong>, here are your booking details:</p>

                    <!-- Details Table -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;margin-bottom:28px;">
                      <tr style="background:#f0faf6;">
                        <td style="padding:12px 20px;font-size:13px;color:#6b7280;width:40%;">🩺 Service</td>
                        <td style="padding:12px 20px;font-size:14px;color:#111827;font-weight:600;">${serviceName || '—'}</td>
                      </tr>
                      <tr style="background:#ffffff;">
                        <td style="padding:12px 20px;font-size:13px;color:#6b7280;">🏥 Hospital</td>
                        <td style="padding:12px 20px;font-size:14px;color:#111827;">${hospitalName || address || '—'}</td>
                      </tr>
                      <tr style="background:#f0faf6;">
                        <td style="padding:12px 20px;font-size:13px;color:#6b7280;">📅 Date</td>
                        <td style="padding:12px 20px;font-size:14px;color:#111827;">${date || '—'}</td>
                      </tr>
                      <tr style="background:#ffffff;">
                        <td style="padding:12px 20px;font-size:13px;color:#6b7280;">⏰ Time</td>
                        <td style="padding:12px 20px;font-size:14px;color:#111827;">${time || '—'}</td>
                      </tr>
                      ${price ? `
                      <tr style="background:#f0faf6;">
                        <td style="padding:12px 20px;font-size:13px;color:#6b7280;">💰 Amount</td>
                        <td style="padding:12px 20px;font-size:14px;color:#111827;font-weight:600;">₹${price}</td>
                      </tr>` : ''}
                      ${transactionId ? `
                      <tr style="background:#ffffff;">
                        <td style="padding:12px 20px;font-size:13px;color:#6b7280;">🧾 Transaction ID</td>
                        <td style="padding:12px 20px;font-size:13px;color:#6b7280;word-break:break-all;">${transactionId}</td>
                      </tr>` : ''}
                      ${bookingId ? `
                      <tr style="background:#f0faf6;">
                        <td style="padding:12px 20px;font-size:13px;color:#6b7280;">🔖 Booking ID</td>
                        <td style="padding:12px 20px;font-size:13px;color:#6b7280;">#${bookingId}</td>
                      </tr>` : ''}
                    </table>

                    <!-- CTA -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding:0 0 28px;">
                          <a href="https://suvidha-client.onrender.com" style="display:inline-block;background:linear-gradient(135deg,#1a6b5a,#25a585);color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:13px 32px;border-radius:50px;">View My Bookings →</a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">Please arrive 10 minutes before your scheduled time. If you need to reschedule, contact us by replying to this email.</p>
                    <p style="margin:24px 0 0;font-size:15px;color:#374151;">Stay healthy,<br /><strong>The Suvidha Team</strong><br /><span style="font-size:12px;color:#9ca3af;">Built with ❤️ in Indore</span></p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:20px 48px;text-align:center;border-top:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:12px;color:#9ca3af;">© 2025 Suvidha Health. All rights reserved.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  if (!transporter) {
    console.log(`[MOCK BOOKING EMAIL] To: ${email}, Subject: ${mailOptions.subject}`);
    return { success: true, mock: true };
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Nodemailer] Booking confirmation sent to ${email}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Nodemailer] Error sending booking confirmation:', error.message);
    return { success: false, error: error.message };
  }
};

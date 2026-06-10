const { Resend } = require('resend');

const resendApiKey = process.env.RESEND_API_KEY;
let resendInstance = null;

if (resendApiKey) {
  resendInstance = new Resend(resendApiKey);
}

const FROM_EMAIL = process.env.SMTP_FROM || 'onboarding@resend.dev';
const FROM_NAME = process.env.SMTP_FROM_NAME || 'Zelp';

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isConfigured = () => Boolean(resendApiKey);

const sendMail = async ({ to, subject, text, html }) => {
  if (!to) {
    return { success: false, skipped: true, reason: 'missing_recipient' };
  }

  if (!resendInstance) {
    console.warn('[Mail] Resend is not configured (missing RESEND_API_KEY). Skipping email:', subject);
    return { success: false, skipped: true, reason: 'resend_not_configured' };
  }

  try {
    const { data, error } = await resendInstance.emails.send({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to,
      subject,
      text,
      html,
    });

    if (error) {
      console.error('[Mail] Resend API error sending email:', error.message || error);
      return { success: false, error: error.message || error };
    }

    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('[Mail] Exception sending email via Resend:', error.message);
    return { success: false, error: error.message };
  }
};

exports.sendWaitlistConfirmation = async (email, name) => {
  const displayName = escapeHtml(name || 'there');

  return sendMail({
    to: email,
    subject: 'Welcome to the Zelp waitlist',
    text: `Hi ${name || 'there'},\n\nThanks for joining the Zelp waitlist. We will notify you when your slot opens.\n\nTeam Zelp`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2>Welcome to Zelp, ${displayName}</h2>
        <p>Thanks for joining the waitlist. We will notify you when your slot opens.</p>
        <p>Team Zelp</p>
      </div>
    `
  });
};

exports.sendWelcomeEmail = async (email, name) => {
  const firstName = String(name || 'there').split(' ')[0];

  return sendMail({
    to: email,
    subject: `Welcome to Zelp, ${firstName}`,
    text: `Hi ${firstName},\n\nYour Zelp account is ready. You can now book verified healthcare services and manage your bookings from your account.\n\nTeam Zelp`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2>Welcome to Zelp, ${escapeHtml(firstName)}</h2>
        <p>Your account is ready. You can now book verified healthcare services and manage your bookings from your account.</p>
        <p>Team Zelp</p>
      </div>
    `
  });
};

exports.sendSignInEmail = async (email, name) => {
  const firstName = String(name || 'there').split(' ')[0];
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return sendMail({
    to: email,
    subject: 'New sign-in to your Zelp account',
    text: `Hi ${firstName},\n\nYour Zelp account was just signed in on ${timestamp} IST. If this was you, no action is needed. If this was not you, please change your password.\n\nTeam Zelp`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2>New sign-in detected</h2>
        <p>Hi ${escapeHtml(firstName)}, your Zelp account was just signed in.</p>
        <p><strong>Time:</strong> ${escapeHtml(timestamp)} IST</p>
        <p>If this was you, no action is needed. If this was not you, please change your password.</p>
        <p>Team Zelp</p>
      </div>
    `
  });
};

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
    price
  } = booking;

  const location = hospitalName || address || 'Zelp partner location';

  return sendMail({
    to: email,
    subject: `Booking confirmed: ${serviceName || 'Healthcare service'}`,
    text: [
      `Hi ${patientName || 'there'},`,
      '',
      'Your booking has been confirmed.',
      `Service: ${serviceName || '-'}`,
      `Provider: ${location}`,
      `Date: ${date || '-'}`,
      `Time: ${time || '-'}`,
      `Amount: INR ${price || 0}`,
      `Booking ID: ${bookingId || '-'}`,
      `Transaction ID: ${transactionId || '-'}`,
      '',
      'Team Zelp'
    ].join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2>Booking confirmed</h2>
        <p>Hi ${escapeHtml(patientName || 'there')}, your booking has been confirmed.</p>
        <table style="border-collapse:collapse;width:100%;max-width:520px">
          <tr><td style="padding:8px;border:1px solid #e5e7eb">Service</td><td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(serviceName || '-')}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb">Provider</td><td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(location)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb">Date</td><td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(date || '-')}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb">Time</td><td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(time || '-')}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb">Amount</td><td style="padding:8px;border:1px solid #e5e7eb">INR ${escapeHtml(price || 0)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb">Booking ID</td><td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(bookingId || '-')}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb">Transaction ID</td><td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(transactionId || '-')}</td></tr>
        </table>
        <p>Team Zelp</p>
      </div>
    `
  });
};

exports.verifyMailTransport = async () => {
  if (!resendInstance) {
    return { success: false, reason: 'resend_not_configured' };
  }
  return { success: true };
};

exports.sendSmtpTestEmail = async () => {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const targetEmail = process.env.SMTP_FROM || 'urvakshtirle54@gmail.com';

  return sendMail({
    to: targetEmail,
    subject: 'Zelp Resend test email',
    text: `Zelp Resend is working from Render/local server.\n\nTime: ${timestamp} IST`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2>Zelp Resend is working</h2>
        <p>This test email was sent by the backend mail diagnostic endpoint.</p>
        <p><strong>Time:</strong> ${escapeHtml(timestamp)} IST</p>
      </div>
    `
  });
};

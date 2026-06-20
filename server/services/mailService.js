const nodemailer = require('nodemailer');
const { Resend } = require('resend');

const isResendConfigured = Boolean(process.env.RESEND_API_KEY);
const useResend = isResendConfigured && (!process.env.SMTP_HOST || process.env.SMTP_HOST === 'smtp.gmail.com');

const SMTP_HOST = useResend ? 'smtp.resend.com' : (process.env.SMTP_HOST || 'smtp.gmail.com');
const SMTP_PORT = useResend ? 465 : Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = useResend ? true : (String(process.env.SMTP_SECURE || 'true').toLowerCase() !== 'false');
const SMTP_USER = useResend ? 'resend' : (process.env.SMTP_USER || process.env.GMAIL_USER);
const SMTP_PASS = (useResend ? process.env.RESEND_API_KEY : (process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || '')).replace(/\s+/g, '');
const FROM_EMAIL = process.env.SMTP_FROM || (useResend ? 'onboarding@resend.dev' : SMTP_USER);
const FROM_NAME = process.env.SMTP_FROM_NAME || 'Zelp';
const SMTP_CONNECTION_TIMEOUT = Number(process.env.SMTP_CONNECTION_TIMEOUT || 10000);
const SMTP_GREETING_TIMEOUT = Number(process.env.SMTP_GREETING_TIMEOUT || 10000);
const SMTP_SOCKET_TIMEOUT = Number(process.env.SMTP_SOCKET_TIMEOUT || 15000);

let transporter;
let resendClient;

if (useResend) {
  resendClient = new Resend(process.env.RESEND_API_KEY);
}

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isConfigured = () => Boolean(SMTP_USER && SMTP_PASS && FROM_EMAIL);

const getTransporter = () => {
  if (!isConfigured()) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      connectionTimeout: SMTP_CONNECTION_TIMEOUT,
      greetingTimeout: SMTP_GREETING_TIMEOUT,
      socketTimeout: SMTP_SOCKET_TIMEOUT,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      },
      tls: {
        servername: SMTP_HOST
      }
    });
  }

  return transporter;
};

const sendMail = async ({ to, subject, text, html }) => {
  if (!to) {
    return { success: false, skipped: true, reason: 'missing_recipient' };
  }

  const isTryzelp = String(to).toLowerCase().includes('tryzelp@gmail.com');
  const cc = isTryzelp ? undefined : 'tryzelp@gmail.com';

  if (useResend && resendClient) {
    try {
      const resendRes = await resendClient.emails.send({
        from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
        to,
        cc,
        subject,
        text,
        html
      });
      if (resendRes.error) {
        console.error('[Mail] Resend SDK error:', resendRes.error);
        return { success: false, error: resendRes.error.message };
      }
      return { success: true, messageId: resendRes.data?.id };
    } catch (sdkError) {
      console.error('[Mail] Resend SDK exception:', sdkError.message);
      return { success: false, error: sdkError.message };
    }
  }

  const activeTransporter = getTransporter();
  if (!activeTransporter) {
    console.warn('[Mail] SMTP is not configured. Skipping email:', subject);
    return { success: false, skipped: true, reason: 'smtp_not_configured' };
  }

  const mailOptions = {
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to,
    subject,
    text,
    html
  };

  if (cc) {
    mailOptions.cc = cc;
  }

  const info = await activeTransporter.sendMail(mailOptions);

  return { success: true, messageId: info.messageId };
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
  if (useResend) {
    if (!process.env.RESEND_API_KEY) {
      return { success: false, reason: 'resend_api_key_missing' };
    }
    return { success: true };
  }

  const activeTransporter = getTransporter();
  if (!activeTransporter) {
    return { success: false, reason: 'smtp_not_configured' };
  }

  await activeTransporter.verify();
  return { success: true };
};

exports.sendSmtpTestEmail = async () => {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const to = SMTP_USER && SMTP_USER.includes('@') ? SMTP_USER : FROM_EMAIL;

  return sendMail({
    to,
    subject: 'Zelp SMTP test email',
    text: `Zelp SMTP is working from Render/local server.\n\nTime: ${timestamp} IST`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2>Zelp SMTP is working</h2>
        <p>This test email was sent by the backend mail diagnostic endpoint.</p>
        <p><strong>Time:</strong> ${escapeHtml(timestamp)} IST</p>
      </div>
    `
  });
};

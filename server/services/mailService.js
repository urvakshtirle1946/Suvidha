/**
 * Mail Service (Mock Implementation)
 * Nodemailer has been completely removed. All emails are mocked and logged to the console.
 */

/**
 * Sends a waitlist confirmation email (mock).
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 */
exports.sendWaitlistConfirmation = async (email, name) => {
  console.log(`[MOCK WAITLIST EMAIL] To: ${email}, Subject: Welcome to the Zelp Waitlist! 🚀`);
  console.log(`[MOCK WAITLIST EMAIL] Name: ${name || 'there'}`);
  return { success: true, mock: true };
};

/**
 * Sends a welcome email to a newly registered user (mock).
 * @param {string} email - Recipient email
 * @param {string} name  - Recipient name
 */
exports.sendWelcomeEmail = async (email, name) => {
  const firstName = (name || 'there').split(' ')[0];
  console.log(`[MOCK WELCOME EMAIL] To: ${email}, Subject: Welcome to Suvidha, ${firstName}! 🎉 Your account is ready`);
  return { success: true, mock: true };
};

/**
 * Sends a booking confirmation email to the user (mock).
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

  console.log(`[MOCK BOOKING EMAIL] To: ${email}, Subject: Booking Confirmed ✅ – ${serviceName} on ${date}`);
  console.log(`[MOCK BOOKING EMAIL] Details: Patient: ${patientName}, Service: ${serviceName}, Hospital: ${hospitalName || address || '—'}, Date: ${date}, Time: ${time}, Price: ₹${price || 0}, Booking ID: #${bookingId || '—'}`);
  return { success: true, mock: true };
};

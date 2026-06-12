const crypto = require('crypto');

const ENCRYPTED_PREFIX = 'enc:v1:';
const HASH_PREFIX = 'hash:v1:';

const getKey = () => {
  const configured = process.env.PHI_ENCRYPTION_KEY;
  if (process.env.NODE_ENV === 'production' && !configured) {
    throw new Error('PHI_ENCRYPTION_KEY is required in production.');
  }
  const material = configured || process.env.JWT_SECRET || 'suvidha-local-development-key';
  return crypto.createHash('sha256').update(material).digest();
};

const encryptValue = (value) => {
  if (value === null || value === undefined || value === '') return value;
  const text = String(value);
  if (text.startsWith(ENCRYPTED_PREFIX)) return text;

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return `${ENCRYPTED_PREFIX}${Buffer.concat([iv, tag, encrypted]).toString('base64')}`;
};

const decryptValue = (value) => {
  if (!value || typeof value !== 'string' || !value.startsWith(ENCRYPTED_PREFIX)) return value;

  try {
    const payload = Buffer.from(value.slice(ENCRYPTED_PREFIX.length), 'base64');
    const iv = payload.subarray(0, 12);
    const tag = payload.subarray(12, 28);
    const encrypted = payload.subarray(28);
    const decipher = crypto.createDecipheriv('aes-256-gcm', getKey(), iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
  } catch (error) {
    console.error('[Booking Privacy] Failed to decrypt protected field:', error.message);
    return null;
  }
};

const hashValue = (value) => {
  if (value === null || value === undefined || value === '') return null;
  if (process.env.NODE_ENV === 'production' && !process.env.PHI_HASH_KEY && !process.env.PHI_ENCRYPTION_KEY) {
    throw new Error('PHI_HASH_KEY or PHI_ENCRYPTION_KEY is required in production.');
  }
  const hmacKey = process.env.PHI_HASH_KEY || process.env.PHI_ENCRYPTION_KEY || process.env.JWT_SECRET || 'suvidha-local-development-key';
  return `${HASH_PREFIX}${crypto.createHmac('sha256', hmacKey).update(String(value).trim().toLowerCase()).digest('hex')}`;
};

const encryptBookingFields = (booking) => ({
  ...booking,
  patient_name: encryptValue(booking.patient_name),
  patient_age: encryptValue(booking.patient_age),
  patient_gender: encryptValue(booking.patient_gender),
  user_phone: encryptValue(booking.user_phone),
  user_email: encryptValue(booking.user_email),
  address: encryptValue(booking.address),
  service_name: encryptValue(booking.service_name),
  patient_name_hash: hashValue(booking.patient_name),
  user_phone_hash: hashValue(booking.user_phone),
  user_email_hash: hashValue(booking.user_email),
  service_name_hash: hashValue(booking.service_name),
});

const decryptBookingRow = (booking) => {
  if (!booking) return booking;
  return {
    ...booking,
    patient_name: decryptValue(booking.patient_name),
    patient_age: decryptValue(booking.patient_age),
    patient_gender: decryptValue(booking.patient_gender),
    user_phone: decryptValue(booking.user_phone),
    user_email: decryptValue(booking.user_email),
    address: decryptValue(booking.address),
    service_name: decryptValue(booking.service_name),
  };
};

const decryptBookingRows = (rows) => rows.map(decryptBookingRow);

module.exports = {
  encryptBookingFields,
  decryptBookingRow,
  decryptBookingRows,
  hashValue,
};

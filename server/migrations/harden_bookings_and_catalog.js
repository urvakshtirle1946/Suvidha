const db = require('../db');

async function migrate() {
  const statements = [
    "ALTER TABLE bookings ALTER COLUMN user_phone TYPE TEXT",
    "ALTER TABLE bookings ALTER COLUMN patient_name TYPE TEXT",
    "ALTER TABLE bookings ALTER COLUMN patient_age TYPE TEXT USING patient_age::text",
    "ALTER TABLE bookings ALTER COLUMN patient_gender TYPE TEXT",
    "ALTER TABLE bookings ALTER COLUMN service_name TYPE TEXT",
    "ALTER TABLE bookings ALTER COLUMN status SET DEFAULT 'PendingPayment'",
    "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS user_email VARCHAR(255)",
    "ALTER TABLE bookings ALTER COLUMN user_email TYPE TEXT",
    "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS hospital_id INT REFERENCES hospitals(id)",
    "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS service_id INT REFERENCES services(id)",
    "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS transaction_id VARCHAR(255)",
    "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS patient_name_hash VARCHAR(80)",
    "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS user_phone_hash VARCHAR(80)",
    "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS user_email_hash VARCHAR(80)",
    "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS service_name_hash VARCHAR(80)",
    "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP",
    "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS hospital_id INT REFERENCES hospitals(id)",
    "ALTER TABLE hospitals ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE",
    "ALTER TABLE services ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE",
    "ALTER TABLE services ADD COLUMN IF NOT EXISTS slot_capacity INT DEFAULT 1",
    "CREATE INDEX IF NOT EXISTS idx_bookings_slot_status ON bookings (hospital_id, booking_date, booking_time, status)",
    "CREATE INDEX IF NOT EXISTS idx_bookings_service_slot_status ON bookings (service_id, booking_date, booking_time, status)",
    "DROP INDEX IF EXISTS idx_bookings_user_email",
    "CREATE INDEX IF NOT EXISTS idx_bookings_user_email_hash ON bookings(user_email_hash)",
    "CREATE INDEX IF NOT EXISTS idx_bookings_user_phone_hash ON bookings(user_phone_hash)",
    "CREATE INDEX IF NOT EXISTS idx_bookings_service_name_hash ON bookings(service_name_hash)",
    "CREATE INDEX IF NOT EXISTS idx_services_hospital_active ON services(hospital_id, is_active)",
    `CREATE TABLE IF NOT EXISTS payment_orders (
      id SERIAL PRIMARY KEY,
      razorpay_order_id VARCHAR(255) UNIQUE NOT NULL,
      razorpay_payment_id VARCHAR(255),
      user_email_hash VARCHAR(80) NOT NULL,
      amount_paise INT NOT NULL,
      items JSONB NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'Created',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
  ];

  for (const statement of statements) {
    await db.query(statement);
  }

  await db.query(`
    UPDATE bookings b
    SET service_id = (
      SELECT s.id
      FROM services s
      WHERE s.hospital_id = b.hospital_id AND s.name = b.service_name
      ORDER BY s.is_active DESC, s.id DESC
      LIMIT 1
    )
    WHERE b.service_id IS NULL
  `);

  const { encryptBookingFields } = require('../utils/bookingPrivacy');
  const plaintextRows = await db.query(`
    SELECT id, patient_name, patient_age, patient_gender, user_phone, user_email, address, service_name
    FROM bookings
    WHERE (patient_name IS NOT NULL AND patient_name <> '' AND patient_name NOT LIKE 'enc:v1:%')
       OR (patient_age IS NOT NULL AND patient_age <> '' AND patient_age NOT LIKE 'enc:v1:%')
       OR (patient_gender IS NOT NULL AND patient_gender <> '' AND patient_gender NOT LIKE 'enc:v1:%')
       OR (user_phone IS NOT NULL AND user_phone <> '' AND user_phone NOT LIKE 'enc:v1:%')
       OR (user_email IS NOT NULL AND user_email <> '' AND user_email NOT LIKE 'enc:v1:%')
       OR (address IS NOT NULL AND address <> '' AND address NOT LIKE 'enc:v1:%')
       OR (service_name IS NOT NULL AND service_name <> '' AND service_name NOT LIKE 'enc:v1:%')
  `);

  for (const row of plaintextRows.rows) {
    const secured = encryptBookingFields(row);
    await db.query(
      `UPDATE bookings
       SET patient_name = $1, patient_age = $2, patient_gender = $3, user_phone = $4, user_email = $5,
           address = $6, service_name = $7, patient_name_hash = $8, user_phone_hash = $9,
           user_email_hash = $10, service_name_hash = $11
       WHERE id = $12`,
      [
        secured.patient_name, secured.patient_age, secured.patient_gender, secured.user_phone, secured.user_email,
        secured.address, secured.service_name, secured.patient_name_hash, secured.user_phone_hash,
        secured.user_email_hash, secured.service_name_hash, row.id,
      ]
    );
  }
}

migrate()
  .then(() => {
    console.log('Booking and catalog hardening migration complete.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Booking and catalog hardening migration failed:', error);
    process.exit(1);
  });

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE,
  location VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hospitals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  rating DECIMAL(3, 1),
  discount_percentage INT,
  discount_description VARCHAR(255),
  image_url VARCHAR(255),
  phone_number VARCHAR(20),
  map_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS specialties (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS hospital_specialties (
  hospital_id INT REFERENCES hospitals(id),
  specialty_id INT REFERENCES specialties(id),
  PRIMARY KEY (hospital_id, specialty_id)
);

CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  hospital_id INT REFERENCES hospitals(id), -- Nullable if it's a generic platform service like a lab test
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50), -- 'Lab', 'OPD', 'Scan', 'Surgery'
  price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  slot_capacity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS hospital_id INT REFERENCES hospitals(id);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  user_phone TEXT,
  patient_name TEXT,
  patient_age TEXT,
  patient_gender TEXT,
  booking_date DATE,
  booking_time VARCHAR(20),
  address TEXT,
  service_name TEXT,
  service_id INT REFERENCES services(id),
  price DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'PendingPayment',
  user_email TEXT,
  hospital_id INT REFERENCES hospitals(id),
  transaction_id VARCHAR(255),
  patient_name_hash VARCHAR(80),
  user_phone_hash VARCHAR(80),
  user_email_hash VARCHAR(80),
  service_name_hash VARCHAR(80),
  cancelled_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_bookings_slot_status
  ON bookings (hospital_id, booking_date, booking_time, status);
CREATE INDEX IF NOT EXISTS idx_bookings_service_slot_status
  ON bookings (service_id, booking_date, booking_time, status);
CREATE INDEX IF NOT EXISTS idx_bookings_user_email_hash ON bookings(user_email_hash);
CREATE INDEX IF NOT EXISTS idx_bookings_user_phone_hash ON bookings(user_phone_hash);
CREATE INDEX IF NOT EXISTS idx_bookings_service_name_hash ON bookings(service_name_hash);

CREATE TABLE IF NOT EXISTS payment_orders (
  id SERIAL PRIMARY KEY,
  razorpay_order_id VARCHAR(255) UNIQUE NOT NULL,
  razorpay_payment_id VARCHAR(255),
  user_email_hash VARCHAR(80) NOT NULL,
  amount_paise INT NOT NULL,
  items JSONB NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Created',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS otp_codes (
  phone VARCHAR(20) PRIMARY KEY,
  code VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  admin_id INT REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  endpoint VARCHAR(255),
  ip_address VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS waitlist_signups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  google_id VARCHAR(255) UNIQUE,
  source VARCHAR(50) NOT NULL DEFAULT 'google',
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ambulance_requests (
  id SERIAL PRIMARY KEY,
  user_phone VARCHAR(20) NOT NULL,
  pickup_lat DECIMAL(10, 8) NOT NULL,
  pickup_lng DECIMAL(11, 8) NOT NULL,
  drop_address TEXT NOT NULL,
  ambulance_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';
ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

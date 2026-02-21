CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(20) UNIQUE NOT NULL,
  location VARCHAR(255),
  role VARCHAR(50) DEFAULT 'USER',
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  user_phone VARCHAR(20),
  patient_name VARCHAR(100),
  patient_age INT,
  patient_gender VARCHAR(20),
  booking_date DATE,
  booking_time VARCHAR(20),
  address TEXT,
  service_name VARCHAR(255),
  price DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'Confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

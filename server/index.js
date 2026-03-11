const path = require('path');
const fs = require('fs');
const rootEnvPath = path.resolve(__dirname, '../.env');
const localEnvPath = path.resolve(__dirname, '.env');
require('dotenv').config({ path: fs.existsSync(localEnvPath) ? localEnvPath : rootEnvPath });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
app.set('trust proxy', 1); // Required for secure cookies on Render
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const locationRoutes = require('./routes/locationRoutes');
const ambulanceRoutes = require('./routes/ambulanceRoutes');

// CORS configuration for web and local clients
const explicitlyAllowedOrigins = new Set([
  'https://waiting.tryzelp.app',
  'https://admin.tryzelp.app',
  'https://tryzelp.app',
  'https://waitlist.tryzelp.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'https://suvidha-client.vercel.app'
]);

const normalizeOrigin = (origin) => origin.trim().toLowerCase().replace(/\/+$/, '');

const isOriginAllowed = (origin) => {
  if (!origin) return true;

  const normalized = normalizeOrigin(origin);
  if (explicitlyAllowedOrigins.has(normalized)) return true;

  try {
    const hostname = new URL(normalized).hostname.toLowerCase();
    return hostname === 'tryzelp.app' || hostname.endsWith('.tryzelp.app');
  } catch {
    return false;
  }
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'X-HTTP-Method-Override'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(morgan('dev'));

// 3. Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false // Relaxed for OAuth popups
  })
);
app.use(cookieParser());
app.use(express.json()); // Built-in middleware replaces body-parser

const staticOptions = {
  setHeaders: (res) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
};

app.use('/uploads', express.static('uploads', staticOptions)); // For dynamic uploads
app.use('/uploads', express.static('static/uploads', staticOptions)); // Fallback for repo images

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/ambulance', ambulanceRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Suvidha Backend API Running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser'); // Removed redundant dependency

const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const locationRoutes = require('./routes/locationRoutes');
const ambulanceRoutes = require('./routes/ambulanceRoutes');

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
})); // Security Headers
app.use(morgan('dev')); // HTTP Request Logger

// CORS Configuration
const allowedOrigins = ['https://tryzelp.app', 'http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(null, true); // Temporarily allow all for debugging, or strict: callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
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
// Trigger restart

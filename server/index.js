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

// Middleware
app.use(helmet()); // Security Headers
app.use(morgan('dev')); // HTTP Request Logger
app.use(cors());
app.use(express.json()); // Built-in middleware replaces body-parser
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/hospitals', hospitalRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Suvidha Backend API Running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Trigger restart

const db = require('../db');

const smsService = require('../services/smsService');

exports.createBooking = async (req, res) => {
  const { name, age, gender, date, time, address, serviceName, price, userPhone, hospitalId } = req.body;
  
  try {
    // 1. Create Booking
    const query = `
      INSERT INTO bookings (patient_name, patient_age, patient_gender, booking_date, booking_time, address, service_name, price, user_phone, hospital_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, status
    `;
    const values = [name, age, gender, date, time, address, serviceName, price, userPhone, hospitalId || null];
    
    const result = await db.query(query, values);
    
    // 2. Notify Hospital via WhatsApp
    if (hospitalId) {
        try {
            const hospitalRes = await db.query('SELECT name, phone_number FROM hospitals WHERE id = $1', [hospitalId]);
            if (hospitalRes.rows.length > 0) {
                const hospital = hospitalRes.rows[0];
                if (hospital.phone_number) {
                    // HARDCODED FOR DEMO/TESTING: Send notification to the developer's WhatsApp
                    const adminPhone = '+919329017929'; 
                    const message = `New Booking Alert!\n\nPatient: ${name}\nService: ${serviceName}\nDate: ${date}\nTime: ${time}\nHospital: ${hospital.name}\n\nPlease confirm availability.`;
                    await smsService.sendWhatsapp(adminPhone, message);
                }
            }
        } catch (notifyError) {
            console.error('Failed to notify hospital:', notifyError);
            // Don't fail the request if notification fails
        }
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Booking created successfully',
      bookingId: result.rows[0].id,
      status: result.rows[0].status
    });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to create booking' });
  }
};

exports.getBookings = async (req, res) => {
  const { phone } = req.query;
  try {
    let query = 'SELECT * FROM bookings';
    let values = [];
    
    if (phone) {
      query += ' WHERE user_phone = $1';
      values.push(phone);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
};

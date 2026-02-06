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
            const hospitalRes = await db.query('SELECT name, phone_number, location FROM hospitals WHERE id = $1', [hospitalId]);
            
            if (hospitalRes.rows.length > 0) {
                const hospital = hospitalRes.rows[0];
                
                // HARDCODED FOR DEMO: Send notification to the developer's WhatsApp
                const adminPhone = '+919329017929'; 
                
                const message = `New Booking Alert!

Patient: ${name}
Service: ${serviceName}
Date: ${date}
Time: ${time}
Hospital: ${hospital.name}

Please confirm availability.`;

                await smsService.sendWhatsapp(adminPhone, message);

                // 3. Notify Patient (User) via WhatsApp
                if (userPhone) {
                    let formattedUserPhone = userPhone;
                    if (/^\d{10}$/.test(formattedUserPhone)) {
                        formattedUserPhone = '+91' + formattedUserPhone;
                    }

                    const userMessage = `Booking Confirmed! ✅

Hello ${name},
Your appointment is scheduled.

🏥 Hospital: ${hospital.name}
🩺 Service: ${serviceName}
📅 Date: ${date}
⏰ Time: ${time}

Location: ${hospital.location || address}

Thank you for choosing Suvidha!`;

                    console.log(`[Booking] Sending Patient Notification to: ${formattedUserPhone}`);
                    await smsService.sendWhatsapp(formattedUserPhone, userMessage);
                }
            }
        } catch (notifyError) {
            console.error('Failed to notify hospital:', notifyError);
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
    let query = `
      SELECT b.*, h.name as hospital_name
      FROM bookings b
      LEFT JOIN hospitals h ON b.hospital_id = h.id
    `;
    let values = [];
    
    if (phone) {
      query += ' WHERE b.user_phone = $1';
      values.push(phone);
    }
    
    query += ' ORDER BY b.created_at DESC';
    
    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
};

exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    const result = await db.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    res.json({ success: true, booking: result.rows[0] });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update booking status' });
  }
};

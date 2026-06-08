const db = require('../db');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const smsService = require('../services/smsService');
const { sendBookingConfirmation } = require('../services/mailService');

exports.createBooking = async (req, res) => {
  const { name, age, gender, date, time, address, serviceName, price, userPhone, userEmail, hospitalId, transactionId } = req.body;
  const finalEmail = userEmail || req.user?.email || null;
  const finalPhone = userPhone || req.user?.phone || 'Unknown';
  
  try {
    // 1. Create Booking
    const query = `
      INSERT INTO bookings (patient_name, patient_age, patient_gender, booking_date, booking_time, address, service_name, price, user_phone, user_email, hospital_id, transaction_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id, status
    `;
    const values = [name, age, gender, date, time, address, serviceName, price, finalPhone, finalEmail, hospitalId || null, transactionId || null];
    
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
Transaction ID: ${transactionId || 'N/A'}

Please confirm availability.`;

                await smsService.sendWhatsapp(adminPhone, message);

                // 3. Notify Patient (User) via WhatsApp
                if (finalPhone && finalPhone !== 'Unknown') {
                    let formattedUserPhone = finalPhone;
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

    if (finalEmail) {
      let resolvedHospitalName = null;
      try {
        if (hospitalId) {
          const hRes = await db.query('SELECT name FROM hospitals WHERE id = $1', [hospitalId]);
          resolvedHospitalName = hRes.rows[0]?.name || null;
        }
      } catch (_) {}

      sendBookingConfirmation(finalEmail, {
        patientName: name,
        serviceName,
        hospitalName: resolvedHospitalName,
        date,
        time,
        address,
        price,
        transactionId: transactionId || null,
        bookingId: result.rows[0].id,
      }).catch((err) => console.error('[Booking Email] Failed to send:', err.message));
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
    const { phone, email } = req.query;
    try {
      let query = `
        SELECT b.*, h.name as hospital_name
        FROM bookings b
        LEFT JOIN hospitals h ON b.hospital_id = h.id
      `;
      let values = [];
      const isAdmin = ['admin', 'super_admin'].includes(req.user.role);
      
      if (!isAdmin) {
          if (!req.user.email) {
            return res.status(401).json({ success: false, message: 'Unauthorized: user email missing from session.' });
          }
          query += ' WHERE b.user_email = $1';
          values.push(req.user.email);
      } else {
          // For admins, allow optional filtering logic
          if (phone && email) {
            query += ' WHERE b.user_phone = $1 OR b.user_email = $2';
            values.push(phone, email);
          } else if (phone) {
            query += ' WHERE b.user_phone = $1';
            values.push(phone);
          } else if (email) {
            query += ' WHERE b.user_email = $1';
            values.push(email);
          }
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

exports.payBooking = async (req, res) => {
    const { id } = req.params;
    const { transactionId } = req.body;

    if (!transactionId || transactionId.length < 6) {
        return res.status(400).json({ success: false, message: 'Valid Transaction ID required' });
    }

    try {
        const isAdmin = ['admin', 'super_admin'].includes(req.user?.role);

        const query = isAdmin
            ? "UPDATE bookings SET transaction_id = $1, status = 'Confirmed' WHERE id = $2 RETURNING *"
            : "UPDATE bookings SET transaction_id = $1, status = 'Confirmed' WHERE id = $2 AND user_email = $3 RETURNING *";

        const values = isAdmin
            ? [transactionId, id]
            : [transactionId, id, req.user?.email || ''];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.json({ success: true, booking: result.rows[0], message: 'Payment recorded successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ success: false, message: 'Failed to record payment' });
    }
};
exports.createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body;
  
        if (!amount) {
            return res.status(400).json({ success: false, message: 'Amount is required' });
        }
  
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
  
        const options = {
            amount: amount * 100, // amount in the smallest currency unit (paise)
            currency: 'INR',
            receipt: 'receipt_order_' + Date.now(),
        };
  
        const order = await instance.orders.create(options);
  
        if (!order) return res.status(500).send('Some error occurred while creating Razorpay order');
  
        res.json({ 
            success: true, 
            order, 
            keyId: process.env.RAZORPAY_KEY_ID 
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
};

exports.verifyRazorpayPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            bookingIds
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Payment is verified
            // Update booking(s) in db
            if (bookingIds && bookingIds.length > 0) {
                 const updatePromises = bookingIds.map(id =>
                    db.query(
                        "UPDATE bookings SET transaction_id = $1, status = 'Confirmed' WHERE id = $2",
                        [razorpay_payment_id, id]
                    )
                 );
                 await Promise.all(updatePromises);
            }
            
            return res.status(200).json({ success: true, message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ success: false, message: "Invalid signature sent!" });
        }
    } catch (error) {
        console.error('Error verifying Razorpay payment:', error);
        res.status(500).json({ success: false, message: 'Failed to verify payment' });
    }
};


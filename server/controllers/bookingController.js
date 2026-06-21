const db = require('../db');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { encryptBookingFields, decryptBookingRow, decryptBookingRows, hashValue } = require('../utils/bookingPrivacy');

const smsService = require('../services/smsService');
const { sendBookingConfirmation } = require('../services/mailService');

const ACTIVE_BOOKING_STATUSES = ['PendingPayment', 'PendingVerification', 'Confirmed'];
const DEFAULT_SLOT_CAPACITY = parseInt(process.env.DEFAULT_SLOT_CAPACITY || '-1', 10);
const OFFLINE_PAYMENT_ENABLED = process.env.ALLOW_PAY_AT_HOSPITAL === 'true';
const CANCELLABLE_STATUSES = ['PendingPayment', 'PendingVerification', 'Confirmed'];
const getConfiguredSlots = () => (process.env.BOOKING_TIME_SLOTS || '09:00 AM,09:30 AM,10:00 AM,10:30 AM,11:00 AM,11:30 AM,12:00 PM,04:00 PM,04:30 PM,05:00 PM')
  .split(',').map(slot => slot.trim()).filter(Boolean);

const getRazorpayInstance = () => new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const refundUnmatchedPayment = async (paymentId, order) => {
  try {
    const refund = await getRazorpayInstance().payments.refund(paymentId, {
      amount: order.amount_paise,
      notes: { reason: 'booking_verification_failed', razorpay_order_id: order.razorpay_order_id }
    });
    await db.query(
      `UPDATE payment_orders SET status = 'Refunded', razorpay_payment_id = $1, updated_at = CURRENT_TIMESTAMP
       WHERE razorpay_order_id = $2`,
      [paymentId, order.razorpay_order_id]
    );
    return refund;
  } catch (error) {
    console.error('[Refund] Failed to refund unmatched payment:', error.message);
    await db.query(
      `UPDATE payment_orders SET status = 'RefundPending', razorpay_payment_id = $1, updated_at = CURRENT_TIMESTAMP
       WHERE razorpay_order_id = $2`,
      [paymentId, order.razorpay_order_id]
    );
    return null;
  }
};

const getInitialStatus = (transactionId) => {
  if (transactionId === 'PAY_AT_HOSPITAL') return 'PendingPayment';
  if (transactionId) return 'PendingVerification';
  return 'PendingPayment';
};

const normalizePositiveInt = (value) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

const getEffectivePrice = (service) => Number(service.discount_price ?? service.price);

const getServiceForBooking = async (client, serviceId) => {
  const normalizedId = normalizePositiveInt(serviceId);
  if (!normalizedId) {
    const error = new Error('A valid serviceId is required.');
    error.statusCode = 400;
    throw error;
  }

  const result = await client.query(
    `SELECT id, hospital_id, name, price, discount_price, slot_capacity
     FROM services
     WHERE id = $1 AND is_active = TRUE`,
    [normalizedId]
  );
  if (result.rows.length === 0) {
    const error = new Error('This service is no longer available.');
    error.statusCode = 404;
    throw error;
  }
  return result.rows[0];
};

const lockSlotAndAssertCapacity = async (client, { service, date, time }) => {
  if (!service?.id || !date || !time) return;

  await client.query(
    'SELECT pg_advisory_xact_lock(hashtext($1))',
    [`slot:${service.id}:${date}:${time}`]
  );

  const dbCapacity = service.slot_capacity;
  const rawCapacity = dbCapacity !== null ? dbCapacity : DEFAULT_SLOT_CAPACITY;
  const capacity = rawCapacity === -1 ? -1 : Math.max(1, rawCapacity);
  if (capacity === -1) {
    return; // Unlimited capacity, bypass checks
  }

  const countRes = await client.query(
    `SELECT COUNT(*)::int AS booked
     FROM bookings
     WHERE service_id = $1
       AND booking_date = $2
       AND booking_time = $3
       AND status = ANY($4::text[])
       AND (status <> 'PendingVerification' OR created_at > CURRENT_TIMESTAMP - INTERVAL '30 minutes')`,
    [service.id, date, time, ACTIVE_BOOKING_STATUSES]
  );

  if (countRes.rows[0].booked >= capacity) {
    const error = new Error('This time slot is full. Please choose another slot.');
    error.statusCode = 409;
    throw error;
  }
};

const formatBookingDate = (dateVal) => {
  if (!dateVal) return '-';
  if (dateVal instanceof Date) {
    const y = dateVal.getFullYear();
    const m = String(dateVal.getMonth() + 1).padStart(2, '0');
    const d = String(dateVal.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return String(dateVal).split('T')[0];
};

const sendPaymentBookingEmail = async (booking) => {
  if (!booking?.user_email) {
    return { success: false, skipped: true, reason: 'missing_recipient' };
  }

  let hospitalName = booking.hospital_name || null;
  try {
    if (!hospitalName && booking.hospital_id) {
      const hospitalRes = await db.query('SELECT name FROM hospitals WHERE id = $1', [booking.hospital_id]);
      hospitalName = hospitalRes.rows[0]?.name || null;
    }

    return await sendBookingConfirmation(booking.user_email, {
      patientName: booking.patient_name,
      serviceName: booking.service_name,
      hospitalName,
      date: formatBookingDate(booking.booking_date),
      time: booking.booking_time,
      address: booking.address,
      price: booking.price,
      transactionId: booking.transaction_id,
      bookingId: booking.id,
    });
  } catch (error) {
    console.error('[Booking Email] Failed to send payment confirmation:', error.message);
    return { success: false, error: error.message };
  }
};

exports.createBooking = async (req, res) => {
  const userPhoneDigits = String(req.user?.phone || '').replace(/\D/g, '');
  if (!req.user?.phone || userPhoneDigits.length < 10 || userPhoneDigits.length > 15) {
    return res.status(400).json({
      success: false,
      message: 'A valid mobile number is required in your profile to book services. Please complete your profile.'
    });
  }

  const { name, age, gender, date, time, address, serviceId, userPhone, transactionId } = req.body;
  
  const finalEmail = req.user?.email || null;
  const finalPhone = userPhone || req.user?.phone || 'Unknown';
  const paymentStatus = getInitialStatus(transactionId);
  const bookingDate = new Date(`${date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!name?.trim() || !Number.isInteger(Number(age)) || Number(age) < 0 || Number(age) > 130) {
    return res.status(400).json({ success: false, message: 'Valid patient name and age are required.' });
  }
  if (Number.isNaN(bookingDate.getTime()) || bookingDate < today || !getConfiguredSlots().includes(time)) {
    return res.status(400).json({ success: false, message: 'Choose a valid future date and available time slot.' });
  }

  if (transactionId === 'PAY_AT_HOSPITAL' && !OFFLINE_PAYMENT_ENABLED) {
    return res.status(400).json({
      success: false,
      message: 'Pay at Hospital is currently disabled. Please pay online to reserve this slot.'
    });
  }
  
  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');
    const service = await getServiceForBooking(client, serviceId);
    await lockSlotAndAssertCapacity(client, { service, date, time });
    const serviceName = service.name;
    const price = getEffectivePrice(service);
    const hospitalId = service.hospital_id;

    const secureBooking = encryptBookingFields({
      patient_name: name,
      patient_age: age,
      patient_gender: gender,
      user_phone: finalPhone,
      user_email: finalEmail,
      address,
      service_name: serviceName,
    });

    const query = `
      INSERT INTO bookings (
        patient_name, patient_age, patient_gender, booking_date, booking_time, address,
        service_name, service_id, price, user_phone, user_email, hospital_id, transaction_id, status,
        patient_name_hash, user_phone_hash, user_email_hash, service_name_hash
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING id, status
    `;
    const values = [
      secureBooking.patient_name,
      secureBooking.patient_age,
      secureBooking.patient_gender,
      date,
      time,
      secureBooking.address,
      secureBooking.service_name,
      service.id,
      price,
      secureBooking.user_phone,
      secureBooking.user_email,
      hospitalId || null,
      transactionId || null,
      paymentStatus,
      secureBooking.patient_name_hash,
      secureBooking.user_phone_hash,
      secureBooking.user_email_hash,
      secureBooking.service_name_hash,
    ];
    
    const result = await client.query(query, values);
    await client.query('COMMIT');
    
    // 2. Notify Hospital via WhatsApp
    if (hospitalId) {
        try {
            const hospitalRes = await db.query('SELECT name, phone_number, location FROM hospitals WHERE id = $1', [hospitalId]);
            
            if (hospitalRes.rows.length > 0) {
                const hospital = hospitalRes.rows[0];
                
                // HARDCODED FOR DEMO: Send notification to the developer's WhatsApp
                const adminPhone = hospital.phone_number;
                
                const message = `New Booking Alert!

Patient: ${name}
Service: ${serviceName}
Date: ${date}
Time: ${time}
Hospital: ${hospital.name}
Transaction ID: ${transactionId || 'N/A'}

Please confirm availability.`;

                if (adminPhone) await smsService.sendWhatsapp(adminPhone, message);

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
    
    // 3. Send booking confirmation email (fire-and-forget)
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
    await client.query('ROLLBACK');
    console.error('Database Error:', error);
    res.status(error.statusCode || 500).json({ success: false, message: error.message || 'Failed to create booking' });
  } finally {
    client.release();
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
      const isPartner = req.user.role === 'hospital_partner';
      
      if (isPartner) {
          if (!req.user.hospital_id) {
            return res.status(403).json({ success: false, message: 'Partner account is not assigned to a hospital.' });
          }
          query += ' WHERE b.hospital_id = $1';
          values.push(req.user.hospital_id);
      } else if (!isAdmin) {
          if (!req.user.email) {
            return res.status(401).json({ success: false, message: 'Unauthorized: user email missing from session.' });
          }
          query += ' WHERE b.user_email_hash = $1';
          values.push(hashValue(req.user.email));
      } else {
          // For admins, allow optional filtering logic
          if (phone && email) {
            query += ' WHERE b.user_phone_hash = $1 OR b.user_email_hash = $2';
            values.push(hashValue(phone), hashValue(email));
          } else if (phone) {
            query += ' WHERE b.user_phone_hash = $1';
            values.push(hashValue(phone));
          } else if (email) {
            query += ' WHERE b.user_email_hash = $1';
            values.push(hashValue(email));
          }
      }
      
      query += ' ORDER BY b.created_at DESC';
      
      const result = await db.query(query, values);
      res.json(decryptBookingRows(result.rows));
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
};

exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const allowedStatuses = ['PendingPayment', 'PendingVerification', 'Confirmed', 'Completed', 'Cancelled', 'RefundPending', 'Refunded', 'NoShow'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid booking status.' });
  }
  if (req.user?.role === 'hospital_partner' && !['Confirmed', 'Completed', 'Cancelled', 'NoShow'].includes(status)) {
    return res.status(403).json({ success: false, message: 'Partners cannot set payment or refund statuses.' });
  }
  
  try {
    const isPartner = req.user?.role === 'hospital_partner';
    const result = await db.query(
      `UPDATE bookings
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2 AND ($3::boolean = FALSE OR hospital_id = $4)
       RETURNING *`,
      [status, id, isPartner, req.user?.hospital_id || null]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    res.json({ success: true, booking: decryptBookingRow(result.rows[0]) });
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
        const result = await db.query(
            "UPDATE bookings SET transaction_id = $1, status = 'PendingVerification', updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
            [transactionId, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        const booking = decryptBookingRow(result.rows[0]);
        const emailResult = await sendPaymentBookingEmail(booking);

        res.json({
            success: true,
            booking,
            message: 'Payment submitted for verification',
            email: emailResult
        });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ success: false, message: 'Failed to record payment' });
    }
};
exports.createRazorpayOrder = async (req, res) => {
    const userPhoneDigits = String(req.user?.phone || '').replace(/\D/g, '');
    if (!req.user?.phone || userPhoneDigits.length < 10 || userPhoneDigits.length > 15) {
        return res.status(400).json({
          success: false,
          message: 'A valid mobile number is required in your profile to book services. Please complete your profile.'
        });
    }

    try {
        const items = Array.isArray(req.body.items) ? req.body.items : [];
        if (items.length === 0) {
            return res.status(400).json({ success: false, message: 'At least one service is required.' });
        }

        const normalizedItems = items.map(item => ({
            serviceId: normalizePositiveInt(item.serviceId),
            quantity: Math.min(20, normalizePositiveInt(item.quantity) || 1),
        }));
        if (normalizedItems.some(item => !item.serviceId)) {
            return res.status(400).json({ success: false, message: 'Every item must include a valid serviceId.' });
        }

        const serviceIds = [...new Set(normalizedItems.map(item => item.serviceId))];
        const servicesResult = await db.query(
            'SELECT id, price, discount_price FROM services WHERE id = ANY($1::int[]) AND is_active = TRUE',
            [serviceIds]
        );
        if (servicesResult.rows.length !== serviceIds.length) {
            return res.status(400).json({ success: false, message: 'One or more services are unavailable.' });
        }
        const prices = new Map(servicesResult.rows.map(service => [service.id, getEffectivePrice(service)]));
        const serviceTotal = normalizedItems.reduce((sum, item) => sum + prices.get(item.serviceId) * item.quantity, 0);
        const platformFee = Number(process.env.PLATFORM_FEE_INR || 50);
        const amount = serviceTotal + platformFee;
        const instance = getRazorpayInstance();

        const options = {
            amount: Math.round(amount * 100),
            currency: 'INR',
            receipt: 'receipt_order_' + Date.now(),
            notes: { user_email_hash: hashValue(req.user?.email || ''), service_total: String(serviceTotal) },
        };
        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send('Some error occurred while creating Razorpay order');

        await db.query(
            `INSERT INTO payment_orders (razorpay_order_id, user_email_hash, amount_paise, items, status)
             VALUES ($1, $2, $3, $4::jsonb, 'Created')`,
            [order.id, hashValue(req.user?.email || ''), order.amount, JSON.stringify(normalizedItems)]
        );

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
            const orderResult = await db.query(
                `SELECT * FROM payment_orders
                 WHERE razorpay_order_id = $1 AND user_email_hash = $2 AND status = 'Created'
                 FOR UPDATE`,
                [razorpay_order_id, hashValue(req.user?.email || '')]
            );
            if (orderResult.rows.length === 0) {
                return res.status(403).json({ success: false, message: 'Payment order does not belong to this account.' });
            }

            // Payment is verified
            // Update booking(s) in db
            if (bookingIds && bookingIds.length > 0) {
                 const requestedIds = [...new Set(bookingIds.map(normalizePositiveInt))];
                 if (requestedIds.some(id => !id) || requestedIds.length !== bookingIds.length) {
                    return res.status(400).json({ success: false, message: 'Invalid or duplicate booking IDs.' });
                 }
                 const pendingResult = await db.query(
                    `SELECT id, service_id, price
                     FROM bookings
                     WHERE id = ANY($1::int[])
                       AND user_email_hash = $2
                       AND status = 'PendingVerification'
                       AND transaction_id = $3`,
                    [requestedIds, hashValue(req.user?.email || ''), razorpay_payment_id]
                 );
                 if (pendingResult.rows.length !== requestedIds.length) {
                    await refundUnmatchedPayment(razorpay_payment_id, orderResult.rows[0]);
                    return res.status(409).json({ success: false, message: 'Bookings do not match this payment. A refund has been initiated.' });
                 }

                 const expectedItems = orderResult.rows[0].items
                    .map(item => `${item.serviceId}:${item.quantity}`)
                    .sort();
                 const actualQuantities = new Map();
                 pendingResult.rows.forEach(booking => {
                    actualQuantities.set(booking.service_id, (actualQuantities.get(booking.service_id) || 0) + 1);
                 });
                 const actualItems = [...actualQuantities.entries()].map(([serviceId, quantity]) => `${serviceId}:${quantity}`).sort();
                 if (JSON.stringify(expectedItems) !== JSON.stringify(actualItems)) {
                    await refundUnmatchedPayment(razorpay_payment_id, orderResult.rows[0]);
                    return res.status(409).json({ success: false, message: 'Paid items do not match the bookings being confirmed. A refund has been initiated.' });
                 }

                 const updatePromises = bookingIds.map(id =>
                    db.query(
                        `UPDATE bookings
                         SET transaction_id = $1, status = 'Confirmed', updated_at = CURRENT_TIMESTAMP
                         WHERE id = $2 AND user_email_hash = $3 AND status = 'PendingVerification'
                         RETURNING *`,
                        [razorpay_payment_id, id, hashValue(req.user?.email || '')]
                    )
                 );
                 const updateResults = await Promise.all(updatePromises);
                 const updatedBookings = updateResults.flatMap(result => decryptBookingRows(result.rows));
                 if (updatedBookings.length !== bookingIds.length) {
                    return res.status(409).json({ success: false, message: 'One or more bookings could not be verified.' });
                 }
                 await db.query(
                    `UPDATE payment_orders SET status = 'Paid', razorpay_payment_id = $1, updated_at = CURRENT_TIMESTAMP
                     WHERE razorpay_order_id = $2`,
                    [razorpay_payment_id, razorpay_order_id]
                 );
                 const emailResults = await Promise.all(
                    updatedBookings.map(booking => sendPaymentBookingEmail(booking))
                 );

                 return res.status(200).json({
                    success: true,
                    message: "Payment verified successfully",
                    email: emailResults
                 });
            }

            await refundUnmatchedPayment(razorpay_payment_id, orderResult.rows[0]);
            return res.status(400).json({ success: false, message: 'No bookings were supplied. A refund has been initiated.' });
        } else {
            return res.status(400).json({ success: false, message: "Invalid signature sent!" });
        }
    } catch (error) {
        console.error('Error verifying Razorpay payment:', error);
        res.status(500).json({ success: false, message: 'Failed to verify payment' });
    }
};

exports.cancelBooking = async (req, res) => {
    const { id } = req.params;
    const isAdmin = ['admin', 'super_admin'].includes(req.user?.role);
    const isPartner = req.user?.role === 'hospital_partner';
    const client = await db.pool.connect();

    try {
        await client.query('BEGIN');

        const result = await client.query(
            isAdmin
                ? 'SELECT * FROM bookings WHERE id = $1 FOR UPDATE'
                : isPartner
                ? 'SELECT * FROM bookings WHERE id = $1 AND hospital_id = $2 FOR UPDATE'
                : 'SELECT * FROM bookings WHERE id = $1 AND user_email_hash = $2 FOR UPDATE',
            isAdmin ? [id] : isPartner ? [id, req.user.hospital_id] : [id, hashValue(req.user?.email || '')]
        );

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        const booking = result.rows[0];
        if (!CANCELLABLE_STATUSES.includes(booking.status)) {
            await client.query('ROLLBACK');
            return res.status(400).json({ success: false, message: `Booking cannot be cancelled from ${booking.status} status.` });
        }

        let nextStatus = 'Cancelled';
        let refund = { required: false };

        if (booking.transaction_id && booking.transaction_id !== 'PAY_AT_HOSPITAL') {
            nextStatus = 'RefundPending';
            refund = { required: true, status: 'pending_manual_review' };

            if (booking.transaction_id.startsWith('pay_') && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
                try {
                    const instance = getRazorpayInstance();
                    refund = await instance.payments.refund(booking.transaction_id, {
                        amount: Math.round(Number(booking.price) * 100),
                        notes: { booking_id: String(booking.id), reason: 'customer_cancellation' }
                    });
                    nextStatus = 'Refunded';
                } catch (refundError) {
                    console.error('[Refund] Razorpay refund failed:', refundError.message);
                    refund = { required: true, status: 'gateway_failed', message: refundError.message };
                }
            }
        }

        const updated = await client.query(
            'UPDATE bookings SET status = $1, cancelled_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
            [nextStatus, id]
        );

        await client.query('COMMIT');
        res.json({ success: true, booking: decryptBookingRow(updated.rows[0]), refund });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Database Error:', error);
        res.status(500).json({ success: false, message: 'Failed to cancel booking' });
    } finally {
        client.release();
    }
};

exports.getAvailability = async (req, res) => {
    const serviceId = normalizePositiveInt(req.query.serviceId);
    const date = String(req.query.date || '');
    if (!serviceId || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ success: false, message: 'Valid serviceId and date are required.' });
    }

    try {
        const serviceResult = await db.query(
            'SELECT id, slot_capacity FROM services WHERE id = $1 AND is_active = TRUE',
            [serviceId]
        );
        if (serviceResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Service not found.' });
        }

        const configuredSlots = getConfiguredSlots();
        const dbCapacity = serviceResult.rows[0].slot_capacity;
        const rawCapacity = dbCapacity !== null ? dbCapacity : DEFAULT_SLOT_CAPACITY;
        const isUnlimited = rawCapacity === -1;
        const capacity = isUnlimited ? -1 : Math.max(1, rawCapacity);
        const counts = await db.query(
            `SELECT booking_time, COUNT(*)::int AS booked
             FROM bookings
             WHERE service_id = $1 AND booking_date = $2 AND status = ANY($3::text[])
               AND (status <> 'PendingVerification' OR created_at > CURRENT_TIMESTAMP - INTERVAL '30 minutes')
             GROUP BY booking_time`,
            [serviceId, date, ACTIVE_BOOKING_STATUSES]
        );
        const bookedByTime = new Map(counts.rows.map(row => [row.booking_time, row.booked]));
        res.json({
            serviceId,
            date,
            slots: configuredSlots.map(time => {
                const booked = bookedByTime.get(time) || 0;
                return {
                    time,
                    capacity: isUnlimited ? 'unlimited' : capacity,
                    remaining: isUnlimited ? 999 : Math.max(0, capacity - booked),
                    available: isUnlimited ? true : booked < capacity,
                };
            }),
        });
    } catch (error) {
        console.error('Availability Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch availability.' });
    }
};



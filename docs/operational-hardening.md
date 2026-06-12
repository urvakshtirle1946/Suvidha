# Operational Hardening Deployment

Run the database migration before deploying the updated server:

```powershell
cd server
npm run db:migrate:harden-bookings
```

Required production environment variables:

```text
PHI_ENCRYPTION_KEY=<a long random secret stored in the deployment secret manager>
PHI_HASH_KEY=<a separate long random secret stored in the deployment secret manager>
RAZORPAY_KEY_ID=<razorpay key id>
RAZORPAY_KEY_SECRET=<razorpay key secret>
ALLOW_PAY_AT_HOSPITAL=false
DEFAULT_SLOT_CAPACITY=1
BOOKING_TIME_SLOTS=09:00 AM,09:30 AM,10:00 AM,10:30 AM,11:00 AM,11:30 AM,12:00 PM,04:00 PM,04:30 PM,05:00 PM
PLATFORM_FEE_INR=50
```

`PHI_ENCRYPTION_KEY` and `PHI_HASH_KEY` must be backed up securely. Losing them makes protected booking data unreadable or unsearchable.

Hospital partner accounts use the `hospital_partner` role and must be assigned to one hospital:

```sql
UPDATE users
SET role = 'hospital_partner', hospital_id = <hospital_id>
WHERE email = '<partner-email>';
```

Partners can then use the dashboard Services and Bookings pages. Their API access is scoped to the assigned hospital on the server.

Operational alerts should be configured for bookings or payment orders in `RefundPending`, because those require payment-gateway review.

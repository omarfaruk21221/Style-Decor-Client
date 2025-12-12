# Payment API Documentation

## Overview
This document describes the backend API endpoints required for the payment system. The payment system integrates with Stripe and saves payment information to a `payments` collection in MongoDB.

## Database Schema

### Payments Collection Structure
```javascript
{
  _id: ObjectId,
  bookingId: String,           // Reference to booking._id
  userId: String,              // User ID who made the payment
  userEmail: String,           // User email
  userName: String,            // User display name
  serviceName: String,         // Service name from booking
  serviceImage: String,        // Service image URL
  serviceDate: String,         // ISO date string - service delivery date
  address: String,             // Service delivery address
  amount: Number,              // Payment amount (e.g., 150.00)
  paymentMethod: String,       // "stripe" (or "paypal", "mobile" for future)
  paymentStatus: String,       // "paid" or "failed"
  transactionId: String,       // Unique transaction ID (e.g., "txn_1234567890_abc123")
  cardLast4: String,           // Last 4 digits of card (e.g., "1234")
  paymentDate: String,         // ISO date string - when payment was made
  createdAt: Date,             // Auto-generated creation timestamp
  updatedAt: Date              // Auto-generated update timestamp
}
```

## API Endpoints

### 1. POST /payments
Create a new payment record (called after successful Stripe payment).

**Authentication:** Required (verifyFBToken)

**Request Body:**
```javascript
{
  bookingId: "booking_id_here",
  userId: "user_id_here",
  userEmail: "user@example.com",
  userName: "John Doe",
  serviceName: "Interior Design Consultation",
  serviceImage: "https://example.com/image.jpg",
  serviceDate: "2024-12-25T00:00:00.000Z",
  address: "123 Main St, City, State",
  amount: 150.00,
  paymentMethod: "stripe",
  paymentStatus: "paid",
  transactionId: "txn_1234567890_abc123",
  cardLast4: "1234",
  paymentDate: "2024-11-20T10:30:00.000Z"
}
```

**Success Response (201):**
```javascript
{
  insertedId: "payment_object_id_here",
  message: "Payment saved successfully"
}
```

**Error Response (400/500):**
```javascript
{
  message: "Error message here",
  // or
  massage: "Error message here" // Note: Backend typo (use both for compatibility)
}
```

**Backend Implementation Example (Node.js/Express):**
```javascript
const express = require('express');
const router = express.Router();
const { verifyFBToken } = require('../middleware/verifyFBToken');
const { MongoClient } = require('mongodb');

// POST /payments
router.post('/payments', verifyFBToken, async (req, res) => {
  try {
    const db = req.db; // Assuming db is attached to req
    const paymentsCollection = db.collection('payments');

    const paymentData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await paymentsCollection.insertOne(paymentData);

    res.status(201).json({
      insertedId: result.insertedId,
      message: "Payment saved successfully"
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({
      message: "Failed to save payment",
      massage: "Failed to save payment" // Typo for compatibility
    });
  }
});
```

---

### 2. GET /payments?email=user@example.com
Get all payments for a specific user.

**Authentication:** Required (verifyFBToken)

**Query Parameters:**
- `email` (required): User email address

**Success Response (200):**
```javascript
[
  {
    _id: "payment_id_1",
    bookingId: "booking_id_1",
    userId: "user_id_1",
    userEmail: "user@example.com",
    userName: "John Doe",
    serviceName: "Interior Design Consultation",
    serviceImage: "https://example.com/image.jpg",
    serviceDate: "2024-12-25T00:00:00.000Z",
    address: "123 Main St, City, State",
    amount: 150.00,
    paymentMethod: "stripe",
    paymentStatus: "paid",
    transactionId: "txn_1234567890_abc123",
    cardLast4: "1234",
    paymentDate: "2024-11-20T10:30:00.000Z",
    createdAt: "2024-11-20T10:30:00.000Z",
    updatedAt: "2024-11-20T10:30:00.000Z"
  },
  // ... more payments
]
```

**Empty Response (200):**
```javascript
[]
```

**Error Response (400/500):**
```javascript
{
  message: "Error message here"
}
```

**Backend Implementation Example:**
```javascript
// GET /payments
router.get('/payments', verifyFBToken, async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        message: "Email parameter is required"
      });
    }

    const db = req.db;
    const paymentsCollection = db.collection('payments');

    const payments = await paymentsCollection
      .find({ userEmail: email })
      .sort({ paymentDate: -1 }) // Latest first
      .toArray();

    res.status(200).json(payments);
  } catch (error) {
    console.error("Fetch payments error:", error);
    res.status(500).json({
      message: "Failed to fetch payments"
    });
  }
});
```

---

## Stripe Integration

### Stripe Payment Flow
1. **Frontend:** User enters card details in Payment.jsx
2. **Frontend:** Calls backend API `/payments/create-payment-intent` (optional, if using Stripe Elements)
3. **Backend:** Creates Stripe PaymentIntent and returns client_secret
4. **Frontend:** Confirms payment with Stripe using client_secret
5. **Frontend:** On success, calls `POST /payments` with payment data
6. **Backend:** Saves payment to database
7. **Backend:** Updates booking paymentStatus to "paid"

### Optional: POST /payments/create-payment-intent
Create Stripe PaymentIntent (if using Stripe Elements on frontend).

**Request Body:**
```javascript
{
  amount: 15000, // Amount in cents (150.00 * 100)
  currency: "usd",
  bookingId: "booking_id_here"
}
```

**Success Response:**
```javascript
{
  clientSecret: "pi_xxxxx_secret_xxxxx"
}
```

**Backend Implementation:**
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/payments/create-payment-intent', verifyFBToken, async (req, res) => {
  try {
    const { amount, currency = 'usd', bookingId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: currency,
      metadata: {
        bookingId: bookingId
      }
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({
      message: "Failed to create payment intent"
    });
  }
});
```

---

## Environment Variables Required

```env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
MONGODB_URI=mongodb://localhost:27017/style-decor
```

---

## Security Considerations

1. **Authentication:** All endpoints should use `verifyFBToken` middleware
2. **Validation:** Validate all input data before saving to database
3. **User Authorization:** Ensure users can only access their own payments
4. **Stripe:** Never expose secret keys to frontend
5. **Transaction IDs:** Generate unique transaction IDs server-side
6. **Card Data:** Never store full card numbers, only last 4 digits

---

## Database Indexes (Recommended)

```javascript
// Create indexes for better query performance
db.payments.createIndex({ userEmail: 1 });
db.payments.createIndex({ bookingId: 1 });
db.payments.createIndex({ transactionId: 1 }, { unique: true });
db.payments.createIndex({ paymentDate: -1 });
```

---

## Testing

### Test Payment Creation
```bash
curl -X POST http://localhost:3000/payments \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bookingId": "test_booking_id",
    "userId": "test_user_id",
    "userEmail": "test@example.com",
    "userName": "Test User",
    "serviceName": "Test Service",
    "serviceImage": "https://example.com/image.jpg",
    "serviceDate": "2024-12-25T00:00:00.000Z",
    "address": "123 Test St",
    "amount": 150.00,
    "paymentMethod": "stripe",
    "paymentStatus": "paid",
    "transactionId": "txn_test_123",
    "cardLast4": "1234",
    "paymentDate": "2024-11-20T10:30:00.000Z"
  }'
```

### Test Fetch Payments
```bash
curl -X GET "http://localhost:3000/payments?email=test@example.com" \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN"
```

---

## Frontend Integration Points

1. **Payment.jsx** - Calls `POST /payments` after successful Stripe payment
2. **PaymentHistory.jsx** - Calls `GET /payments?email=...` to fetch user payments
3. **BookServices.jsx** - Already has booking update logic (can be enhanced)

---

## Error Handling

The frontend expects error responses in this format:
```javascript
{
  message: "Error message" // Standard
  // or
  massage: "Error message" // Backend typo (for compatibility)
}
```

Both fields are checked in the frontend for maximum compatibility.

---

## Notes

- Payment status should match booking paymentStatus
- Transaction IDs should be unique
- All dates stored as ISO strings
- Amount stored as Number (not string)
- Card information should never include full card numbers

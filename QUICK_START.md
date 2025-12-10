# Quick Start Guide

## Prerequisites
- Node.js installed
- MongoDB running (local or Atlas)

## Step 1: Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/skyevents
PORT=5000
RAZORPAY_KEY_ID=rzp_test_1DP5mmOlF5G5ag
RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_here
```

Start the backend:
```bash
npm start
```

## Step 2: Frontend Setup

```bash
cd client
npm install
```

Start the frontend:
```bash
npm run dev
```

## Step 3: Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Testing Payment

Use Razorpay test credentials:
- Card Number: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date
- Name: Any name

## API Endpoints

- Get all purchases: `GET http://localhost:5000/api/purchases`
- Download Excel: `GET http://localhost:5000/api/purchases/download-excel`

## Notes

- Make sure MongoDB is running before starting the backend
- Update Razorpay secret key in `.env` for payment to work
- Configure email settings for invoice emails to be sent


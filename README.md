# Sky Events New Year Bash - Ticket Booking System

A full-stack web application for selling New Year event tickets with payment integration, email notifications, and admin features.

## Features

- 🎫 Multiple ticket categories (VVIP, VIP, Standard)
- 💳 Razorpay payment integration
- 📧 Automated email invoices with venue details
- 📊 Admin API to download all purchases as Excel
- 🎨 Colorful, attractive Indian-style UI
- 📱 Responsive design

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS (v4 with Vite plugin)

### Backend
- Node.js
- Express.js
- MongoDB
- Razorpay SDK
- Nodemailer
- XLSX (for Excel export)

## Project Structure

```
.
├── client/          # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── server/          # Backend Node.js application
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Razorpay account (test credentials)

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
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

4. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

## Ticket Categories

### VVIP
- VVIP (4) - ₹6,999
- VVIP (2) - ₹5,999
- VVIP (1) - ₹1,999
- Includes: Unlimited buffet with 2 non-veg starters, 1 veg starter, and full meal

### VIP
- VIP (4) - ₹5,999
- VIP (2) - ₹3,999
- VIP (1) - ₹1,999
- Includes: Unlimited buffet with 1 non-veg starter, 1 veg starter, and full meal

### Standard
- Standard (1) - ₹699
- No food included (food stalls available at venue)

## API Endpoints

### Payment
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify-payment` - Verify payment and send email

### Purchases
- `GET /api/purchases` - Get all purchases
- `GET /api/purchases/download-excel` - Download all purchases as Excel file

## Pages

- **Home** (`/`) - Event overview and ticket categories
- **Book Tickets** (`/book-tickets`) - Ticket booking form with payment
- **About Us** (`/about-us`) - Information about Sky Events
- **Contact Us** (`/contact-us`) - Contact information and Google Maps

## Payment Integration

The application uses Razorpay for payment processing. Test credentials are configured by default. For production, update the Razorpay keys in the `.env` file.

## Email Configuration

Configure your email settings in the `.env` file. For Gmail, you may need to:
1. Enable "Less secure app access" or
2. Use an App Password

## MongoDB

Make sure MongoDB is running locally or update the `MONGODB_URI` in `.env` to point to your MongoDB Atlas cluster.

## Notes

- The UI is designed with a colorful, Indian-style theme
- All ticket purchases are stored in MongoDB
- Email invoices are sent automatically after successful payment
- Admin can download all purchases as an Excel file via API

## License

ISC


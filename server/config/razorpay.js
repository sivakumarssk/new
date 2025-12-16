const Razorpay = require('razorpay')

// Get Razorpay credentials from environment variables
const keyId = process.env.RAZORPAY_KEY_ID
const keySecret = process.env.RAZORPAY_KEY_SECRET

// Validate credentials
if (!keyId || !keySecret) {
  throw new Error(
    'Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env file.'
  )
}

const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
})

module.exports = razorpay


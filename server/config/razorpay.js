const Razorpay = require('razorpay')

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_razorpay_secret_key_here',
})

module.exports = razorpay


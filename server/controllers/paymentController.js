const razorpay = require('../config/razorpay')
const Purchase = require('../models/Purchase')
const { sendInvoiceEmail } = require('../config/email')
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils')

// Get Razorpay Key
exports.getKey = (req, res) => {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID
    if (!keyId) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay key not configured. Please set RAZORPAY_KEY_ID in .env file',
      })
    }
    res.status(200).json({
      key: keyId,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting Razorpay key',
      error: error.message,
    })
  }
}

// Create Razorpay Order
exports.createOrder = async (req, res) => {
  try {
    const {
      amount,
      ticketCategory,
      ticketName,
      ticketPrice,
      earlyBirdPrice,
      taxAmount,
      totalAmount,
      ticketType,
      ticketSeats,
      quantity,
      customerName,
      customerEmail,
      customerPhone,
    } = req.body

    // Create Razorpay order
    const options = {
      amount: amount, // amount in paise (currency subunits)
      currency: 'INR',
      receipt: `receipt_${Date.now()}_${ticketCategory}`,
      notes: {
        ticketCategory: ticketCategory,
        ticketName: ticketName,
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
      },
    }

    const razorpayOrder = await razorpay.orders.create(options)

    // Save purchase record with pending status
    const purchase = new Purchase({
      orderId: razorpayOrder.id,
      razorpayOrderId: razorpayOrder.id,
      ticketCategory,
      ticketName,
      ticketType,
      ticketSeats,
      quantity: quantity || 1,
      ticketPrice: ticketPrice || (totalAmount - (taxAmount || 0)),
      earlyBirdPrice: earlyBirdPrice,
      taxAmount: taxAmount || 0,
      totalAmount: totalAmount || amount / 100,
      customerName,
      customerEmail,
      customerPhone,
      paymentStatus: 'pending',
      razorpayPaymentId: '',
      razorpaySignature: '',
    })

    await purchase.save()

    res.status(200).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    })
  } catch (error) {
    console.error('Error creating order:', error.message)
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message,
    })
  }
}

// Verify Razorpay Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
    } = req.body

    // Find purchase record
    const purchase = await Purchase.findOne({ razorpayOrderId: razorpay_order_id })
    
    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      })
    }

    // Verify signature using Razorpay's official utility
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keySecret) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay secret key not configured',
      })
    }

    try {
      const isValid = validatePaymentVerification(
        {
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
        },
        razorpay_signature,
        keySecret
      )

      if (!isValid) {
        purchase.paymentStatus = 'failed'
        await purchase.save()
        return res.status(400).json({
          success: false,
          message: 'Payment verification failed: Invalid signature',
        })
      }
    } catch (validationError) {
      purchase.paymentStatus = 'failed'
      await purchase.save()
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed: ' + validationError.message,
      })
    }

    // Update purchase with payment details
    purchase.razorpayPaymentId = razorpay_payment_id
    purchase.razorpaySignature = razorpay_signature
    purchase.paymentStatus = 'completed'
    await purchase.save()

    // Send email
    const emailSent = await sendInvoiceEmail(purchase)
    if (emailSent) {
      purchase.emailSent = true
      await purchase.save()
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      purchase,
    })
  } catch (error) {
    console.error('Error verifying payment:', error.message)
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message,
    })
  }
}


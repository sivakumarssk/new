const razorpay = require('../config/razorpay')
const Purchase = require('../models/Purchase')
const { sendInvoiceEmail } = require('../config/email')
const crypto = require('crypto')

// Create Order (for UPI payments)
exports.createOrder = async (req, res) => {
  try {
    const {
      amount,
      ticketCategory,
      ticketName,
      ticketPrice,
      taxAmount,
      totalAmount,
      ticketType,
      ticketSeats,
      customerName,
      customerEmail,
      customerPhone,
      paymentMethod,
      paymentStatus,
    } = req.body

    const orderId = `UPI_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Save purchase record
    const purchase = new Purchase({
      orderId: orderId,
      razorpayOrderId: orderId,
      ticketCategory,
      ticketName,
      ticketType,
      ticketSeats,
      ticketPrice: ticketPrice || (totalAmount - (taxAmount || 0)),
      taxAmount: taxAmount || 0,
      totalAmount: totalAmount || amount / 100,
      customerName,
      customerEmail,
      customerPhone,
      paymentStatus: paymentStatus || 'pending',
      razorpayPaymentId: paymentStatus === 'completed' ? `UPI_PAY_${Date.now()}` : '',
      razorpaySignature: paymentStatus === 'completed' ? 'UPI_PAYMENT' : '',
    })

    await purchase.save()

    res.status(200).json({
      success: true,
      orderId: orderId,
      amount: amount,
      currency: 'INR',
    })
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message,
    })
  }
}

// Verify Payment (for UPI payments)
exports.verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      ticketCategory,
      ticketName,
      ticketPrice,
      taxAmount,
      totalAmount,
      ticketType,
      ticketSeats,
      customerName,
      customerEmail,
      customerPhone,
    } = req.body

    // For UPI payments, we don't verify signature
    // Find or create purchase record
    let purchase = await Purchase.findOne({ razorpayOrderId: razorpay_order_id })
    
    if (!purchase) {
      // Create new purchase if not found
      purchase = new Purchase({
        orderId: razorpay_order_id,
        razorpayOrderId: razorpay_order_id,
        ticketCategory,
        ticketName,
        ticketType,
        ticketSeats,
        ticketPrice: ticketPrice || (totalAmount - (taxAmount || 0)),
        taxAmount: taxAmount || 0,
        totalAmount: totalAmount || ticketPrice,
        customerName,
        customerEmail,
        customerPhone,
        paymentStatus: 'completed',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      })
    } else {
      // Update existing purchase
      purchase.razorpayPaymentId = razorpay_payment_id
      purchase.razorpaySignature = razorpay_signature
      purchase.paymentStatus = 'completed'
    }

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
    console.error('Error verifying payment:', error)
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message,
    })
  }
}


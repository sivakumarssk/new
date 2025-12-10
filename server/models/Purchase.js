const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  razorpayOrderId: {
    type: String,
    required: true,
  },
  razorpayPaymentId: {
    type: String,
    required: true,
  },
  razorpaySignature: {
    type: String,
    required: true,
  },
  ticketCategory: {
    type: String,
    required: true,
  },
  ticketName: {
    type: String,
    required: true,
  },
  ticketType: {
    type: String,
    required: true,
    enum: ['VVIP', 'VIP', 'Standard', 'Fanpit', 'MIP'],
  },
  ticketSeats: {
    type: Number,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  taxAmount: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  emailSent: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Purchase', purchaseSchema)


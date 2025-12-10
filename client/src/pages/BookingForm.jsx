import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { QRCodeSVG } from 'qrcode.react'

const TICKET_CATEGORIES = {
  'standard-1': { name: 'Standard', price: 699, type: 'Standard', seats: 1, features: ['Fireworks Show', 'Live Music'] },
  'vip-1': { name: 'VIP', price: 1499, type: 'VIP', seats: 1, features: ['Fireworks Show', 'Live Music', 'Food'] },
  'fanpit-1': { name: 'Fanpit', price: 2099, type: 'Fanpit', seats: 1, features: ['Fireworks Show', 'Live Music', 'Food'] },
  'mip-1': { name: 'MIP', price: 2999, type: 'MIP', seats: 1, features: ['Fireworks Show', 'Live Music', 'Food'] },
  'vvip-couple': { name: 'VVIP (Couple)', price: 3499, type: 'VVIP', seats: 2, features: ['Fireworks Show', 'Live Music', 'Food'] },
  'vip-4pax': { name: 'VIP (4PAX)', price: 5999, type: 'VIP', seats: 4, features: ['Fireworks Show', 'Live Music', 'Food'] },
  'vvip-family': { name: 'VVIP (Family)', price: 6999, type: 'VVIP', seats: 4, features: ['Fireworks Show', 'Live Music', 'Food'] },
}

const FOOD_DETAILS = {
  'VVIP': {
    title: 'Unlimited Buffet Included',
    items: [
      '2 Non-Veg Starters',
      '1 Veg Starter',
      'Prawn Biriyani',
      'Chicken Curry',
      'Chicken Fry',
      'Veg Curry',
      'Bagar Rice',
      'Bisebellebath',
      'Curd Rice',
    ]
  },
  'VIP': {
    title: 'Unlimited Buffet Included',
    items: [
      '2 Non-Veg Starter',
      '1 Veg Starter',
      'Prawn Biriyani',
      'Chicken Curry',
      'Chicken Fry',
      'Veg Curry',
      'Bagar Rice',
      'Bisebellebath',
      'Curd Rice',
    ]
  },
  'Fanpit': {
    title: 'Limited Food Included',
    items: [
      '1 Non-Veg Starter',
      '1 Veg Starter',
      'Prawn Biriyani',
      'Chicken Curry',
      'Chicken Fry',
      'Veg Curry',
      'Bagar Rice',
      'Bisebellebath',
      'Curd Rice',
    ]
  },
  'MIP': {
    title: 'Limited Food Included',
    items: [
      '1 Non-Veg Starter',
      '1 Veg Starter',
      'Prawn Biriyani',
      'Chicken Curry',
      'Chicken Fry',
      'Veg Curry',
      'Bagar Rice',
      'Bisebellebath',
      'Curd Rice',
    ]
  },
  'Standard': {
    title: 'Food Information',
    items: [
      'No food included with ticket',
      'Food stalls will be available at the event',
      'You may conveniently purchase meals and refreshments',
    ]
  }
}

// Generate UPI string with amount
const generateUPIString = (amount) => {
  // Format amount to 2 decimal places (e.g., 699.00)
  const formattedAmount = amount.toFixed(2)
  return `upi://pay?ver=01&mode=01&purpose=00&mc=0000&qrMedium=02&pa=9989929886-2@ybl&pn=Sky Events&am=${formattedAmount}&cu=INR`
}

function BookingForm() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const ticketKey = searchParams.get('package')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [showPayment, setShowPayment] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes in seconds
  const [showPaymentButton, setShowPaymentButton] = useState(false)
  const [paymentSubmitted, setPaymentSubmitted] = useState(false)

  const ticket = ticketKey ? TICKET_CATEGORIES[ticketKey] : null
  const foodDetails = ticket ? FOOD_DETAILS[ticket.type] : null

  // Calculate amounts
  const basePrice = ticket ? ticket.price : 0
  const tax = basePrice * 0.05 // 5% tax
  const totalAmount = basePrice + tax

  useEffect(() => {
    if (!ticket) {
      navigate('/book-tickets')
    }
  }, [ticket, navigate])

  // Timer for payment
  useEffect(() => {
    if (showPayment && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            // After 5 minutes, wait 30 seconds then show button
            setTimeout(() => {
              setShowPaymentButton(true)
            }, 30000) // 30 seconds
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [showPayment, timeRemaining])

  if (!ticket) {
    return null
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all details')
      return
    }

    setShowPayment(true)
    setTimeRemaining(300) // Reset to 5 minutes
  }

  const handlePaymentDone = async () => {
    try {
      // Save purchase to backend
      await axios.post('http://localhost:5000/api/payments/create-order', {
        amount: totalAmount * 100, // Convert to paise
        ticketCategory: ticketKey,
        ticketName: ticket.name,
        ticketPrice: basePrice,
        taxAmount: tax,
        totalAmount: totalAmount,
        ticketType: ticket.type,
        ticketSeats: ticket.seats,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        paymentMethod: 'UPI',
        paymentStatus: 'completed',
      })

      // Send email
      await axios.post('http://localhost:5000/api/payments/verify-payment', {
        razorpay_order_id: `UPI_${Date.now()}`,
        razorpay_payment_id: `UPI_PAY_${Date.now()}`,
        razorpay_signature: 'UPI_PAYMENT',
        ticketCategory: ticketKey,
        ticketName: ticket.name,
        ticketPrice: basePrice,
        taxAmount: tax,
        totalAmount: totalAmount,
        ticketType: ticket.type,
        ticketSeats: ticket.seats,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
      })

      setPaymentSubmitted(true)
      alert('Payment confirmed! Check your email for ticket details.')
      setTimeout(() => {
        navigate('/book-tickets')
      }, 2000)
    } catch (error) {
      console.error('Payment submission error:', error)
      alert('Error processing payment. Please contact support.')
    }
  }

  if (paymentSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-8">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-white mb-4">Payment Confirmed!</h2>
            <p className="text-gray-300">Your ticket has been confirmed. Check your email for details.</p>
          </div>
        </div>
      </div>
    )
  }

  if (showPayment) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Scan & Pay via UPI</h2>
            
            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG value={generateUPIString(totalAmount)} size={256} />
              </div>
            </div>

            {/* Amount Details */}
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between text-white">
                  <span>Base Price:</span>
                  <span>₹{basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Tax (5%):</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/20 pt-2 mt-2">
                  <div className="flex justify-between text-yellow-400 font-bold text-lg">
                    <span>Total Amount:</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timer */}
            {timeRemaining > 0 && (
              <div className="text-center mb-6">
                <p className="text-gray-300 mb-2">Time remaining to complete payment:</p>
                <p className="text-3xl font-bold text-yellow-400">{formatTime(timeRemaining)}</p>
              </div>
            )}

            {/* Payment Done Button */}
            {showPaymentButton && (
              <div className="text-center">
                <p className="text-gray-300 mb-4">Have you completed the payment?</p>
                <button
                  onClick={handlePaymentDone}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Payment Done
                </button>
              </div>
            )}

            {!showPaymentButton && timeRemaining === 0 && (
              <div className="text-center">
                <p className="text-gray-300 mb-4">Please wait...</p>
              </div>
            )}

            <div className="text-center mt-6">
              <button
                onClick={() => setShowPayment(false)}
                className="text-yellow-400 hover:text-yellow-300 text-sm"
              >
                ← Back to Form
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/book-tickets')}
            className="text-yellow-400 hover:text-yellow-300 mb-4 flex items-center gap-2 mx-auto"
          >
            <span>←</span> Back to Packages
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">Complete Your Booking</h1>
          <p className="text-gray-300">Fill in your details to proceed with payment</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Package Info */}
          <div className="lg:col-span-2">
            {/* Package Details */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">Selected Package</h2>
              <div className="bg-white/10 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-white font-bold text-xl mb-1">{ticket.name}</p>
                    <p className="text-gray-300 text-sm mb-2">{ticket.seats} Seat{ticket.seats > 1 ? 's' : ''}</p>
                    <p className="text-yellow-400 font-bold text-2xl">₹{basePrice.toLocaleString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    ticket.type === 'VVIP' ? 'bg-yellow-400/20 text-yellow-400' :
                    ticket.type === 'VIP' ? 'bg-purple-400/20 text-purple-400' :
                    'bg-blue-400/20 text-blue-400'
                  }`}>
                    {ticket.type}
                  </span>
                </div>
              </div>

              {/* Food Details */}
              {foodDetails && (
                <div className="bg-white/10 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-3">{foodDetails.title}</h4>
                  <ul className="space-y-2">
                    {foodDetails.items.map((item, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Booking Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    placeholder="Enter your phone"
                  />
                </div>

                {/* Price Breakdown */}
                <div className="bg-white/10 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-white text-sm">
                    <span>Base Price:</span>
                    <span>₹{basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white text-sm">
                    <span>Tax (5%):</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/20 pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Total Amount</span>
                      <span className="text-yellow-400 font-bold text-xl">
                        ₹{totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingForm

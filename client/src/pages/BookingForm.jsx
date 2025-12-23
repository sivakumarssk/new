import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const TICKET_CATEGORIES = {
  'standard-1': { name: 'Standard', price: 699, type: 'Standard', seats: 1, features: ['Fireworks Show', 'Live Music'] },
  'fanpit-1': { name: 'Fan Pit', price: 1999, type: 'Fanpit', seats: 1, features: ['Fireworks Show', 'Live Music'] },
  'vip-1': { name: 'VIP (Single)', price: 1499, type: 'VIP', seats: 1, features: ['Fireworks Show', 'Live Music', 'Food'] },
  'vip-family': { name: 'VIP (Family)', price: 5999, type: 'VIP', seats: 4, features: ['Fireworks Show', 'Live Music', 'Food'] },
  'vvip-couple': { name: 'VVIP (Couple)', price: 3499, type: 'VVIP', seats: 2, features: ['Fireworks Show', 'Live Music', 'Food'] },
  'vvip-family': { name: 'VVIP (Family)', price: 6999, type: 'VVIP', seats: 3, features: ['Fireworks Show', 'Live Music', 'Food'] },
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

// Load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
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
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [paymentSubmitted, setPaymentSubmitted] = useState(false)

  const ticket = ticketKey ? TICKET_CATEGORIES[ticketKey] : null
  const foodDetails = ticket ? FOOD_DETAILS[ticket.type] : null

  // Calculate amounts
  const basePricePerTicket = ticket ? ticket.price : 0
  const basePrice = basePricePerTicket * quantity
  const tax = basePrice * 0.05 // 5% tax
  const totalAmount = basePrice + tax

  useEffect(() => {
    if (!ticket) {
      navigate('/book-tickets')
    }
  }, [ticket, navigate])

  if (!ticket) {
    return null
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all details')
      return
    }

    setLoading(true)

    try {
      // Load Razorpay script
      const razorpayLoaded = await loadRazorpayScript()
      if (!razorpayLoaded) {
        alert('Razorpay SDK failed to load. Please check your connection.')
        setLoading(false)
        return
      }

      // Create order in backend
      const orderResponse = await axios.post('https://skynewyearbash.com/api/payments/create-order', {
        amount: Math.round(totalAmount * 100), // Convert to paise
        ticketCategory: ticketKey,
        ticketName: ticket.name,
        ticketPrice: ticket.price,
        taxAmount: tax,
        totalAmount: totalAmount,
        ticketType: ticket.type,
        ticketSeats: ticket.seats,
        quantity: quantity,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
      })

      const { orderId, amount, currency } = orderResponse.data

      // Get Razorpay key from backend
      const keyResponse = await axios.get('https://skynewyearbash.com/api/payments/get-key')
      const razorpayKey = keyResponse.data.key

      // Open Razorpay Checkout
      const options = {
        key: razorpayKey,
        amount: amount,
        currency: currency,
        name: 'Sky Events New Year Bash',
        description: `Ticket: ${ticket.name} (Qty: ${quantity})`,
        order_id: orderId,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await axios.post('https://skynewyearbash.com/api/payments/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })

            if (verifyResponse.data.success) {
              setPaymentSubmitted(true)
              alert('Payment successful! Check your email for ticket details.')
              setTimeout(() => {
                navigate('/book-tickets')
              }, 2000)
            } else {
              alert('Payment verification failed. Please contact support.')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            alert('Error verifying payment. Please contact support.')
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#9333ea',
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error('Payment initiation error:', error)
      alert('Error initiating payment. Please try again.')
      setLoading(false)
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
                    {ticket.seats > 1 && (
                      <p className="text-gray-300 text-sm mb-2">{ticket.seats} Seats</p>
                    )}
                    <div>
                      <p className="text-yellow-400 font-bold text-2xl">₹{basePricePerTicket.toLocaleString()}</p>
                      <p className="text-gray-400 text-xs mt-1">per ticket</p>
                    </div>
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

                {/* Quantity Selector */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 flex items-center justify-center font-bold text-lg"
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1
                        setQuantity(Math.max(1, Math.min(50, val)))
                      }}
                      className="w-20 px-4 py-2.5 rounded-lg bg-white/10 text-white border border-white/20 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-center font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(50, quantity + 1))}
                      className="w-10 h-10 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 flex items-center justify-center font-bold text-lg"
                      disabled={quantity >= 50}
                    >
                      +
                    </button>
                    <span className="text-gray-300 text-sm ml-2">
                      {quantity} {quantity === 1 ? 'ticket' : 'tickets'}
                    </span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-white/10 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-white text-sm">
                    <span>Price per ticket:</span>
                    <span>₹{basePricePerTicket.toLocaleString()}</span>
                  </div>
                  {quantity > 1 && (
                    <>
                      <div className="flex justify-between text-white text-sm">
                        <span>Quantity:</span>
                        <span>{quantity} × ₹{basePricePerTicket.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-white text-sm">
                        <span>Subtotal:</span>
                        <span>₹{basePrice.toLocaleString()}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between text-white text-sm">
                    <span>GST (5%):</span>
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
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
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

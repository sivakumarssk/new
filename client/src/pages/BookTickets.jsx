import { useNavigate } from 'react-router-dom'
// Package Images - Update these paths when you upload the images
import standardImage from '../assets/standard.jpg'
import vipImage from '../assets/vip.jpg'
import fanpitImage from '../assets/fanpit.png'
import mipImage from '../assets/mip.png'
import vvipCoupleImage from '../assets/vvipcouple.png'
import vip4paxImage from '../assets/vip4pax.png'
import vvipFamilyImage from '../assets/vvipfamily.jpg'
// Banner Images and Video
import banner1 from '../assets/banner1.jpeg'
import banner2 from '../assets/banner2.jpeg'
import bannerVideo from '../assets/bannervideo.mp4'
import calendarIcon from '../assets/calendar.png'

const PACKAGE_IMAGES = {
  'standard-1': standardImage,
  'vip-1': vipImage,
  'fanpit-1': fanpitImage,
  'vvip-couple': vvipCoupleImage,
  'vip-family': vip4paxImage,
  'vvip-family': vvipFamilyImage,
}

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

function BookTickets() {
  const navigate = useNavigate()

  const handlePackageSelect = (packageKey) => {
    navigate(`/booking-form?package=${packageKey}`)
  }

  // Group tickets by type
  const standardTickets = Object.entries(TICKET_CATEGORIES).filter(([_, ticket]) => ticket.type === 'Standard')
  const fanpitTickets = Object.entries(TICKET_CATEGORIES).filter(([_, ticket]) => ticket.type === 'Fanpit')
  const vipTickets = Object.entries(TICKET_CATEGORIES).filter(([_, ticket]) => ticket.type === 'VIP')
  const vvipTickets = Object.entries(TICKET_CATEGORIES).filter(([_, ticket]) => ticket.type === 'VVIP')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Book Your Tickets
        </h1>
        <p className="text-xl text-gray-200">
          Select your preferred ticket package to continue
        </p>
      </div>

      {/* Event Details Section */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
            <span><img className='w-12 h-12' src={calendarIcon} alt="Date" /></span>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Date & Time</h3>
                <p className="text-gray-200">31st December 2025</p>
                <p className="text-yellow-400 font-semibold">Night Event</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl">📍</span>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Location</h3>
                <p className="text-gray-200">JN Road, <br />
                Manayam Ground, <br />
                Rajamahendravaram,
                Andhra Pradesh </p>
                <p className="text-sm text-gray-300">2R43+V75</p>
              </div>
            </div>
          </div>
          
          {/* Location Map */}
          <div className="mt-6">
            <div className="rounded-lg overflow-hidden border-2 border-white/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.5!2d81.8032222!3d17.0071389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDAwJzI1LjciTiA4McKwNDgnMTEuNiJF!5e0!3m2!1sen!2sin!4v1764888534333!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
          </div>

          {/* Banner Images and Video */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-4 text-center">Event Highlights</h3>
            
            {/* Two Banner Images in Flex */}
            <div className="flex gap-4 mb-4 justify-center">
              <div className="flex-1 rounded-lg max-h-[600px] max-w-[400px]  overflow-hidden border-2 border-white/20">
                <img 
                  src={banner1} 
                  alt="Event Banner 1" 
                  className="w-full h-full object-fill"
                />
              </div>
              <div className="flex-1 rounded-lg max-h-[600px] max-w-[400px] overflow-hidden border-2 border-white/20">
                <img 
                  src={banner2} 
                  alt="Event Banner 2" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Banner Video */}
            <div className='flex justify-center'>
            <div className="rounded-lg max-h-[600px] max-w-[600px] overflow-hidden border-2 border-white/20">
              <video 
                src={bannerVideo}
                controls
                autoPlay
                muted
                loop
                className="w-full h-auto object-fill"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Select Ticket Package</h2>

          {/* Standard Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-cyan-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-blue-400">Standard</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {standardTickets.map(([key, ticket]) => (
                <div
                  key={key}
                  onClick={() => handlePackageSelect(key)}
                  className="p-5 rounded-xl cursor-pointer transition-all border-2 bg-white/5 border-white/10 hover:border-blue-400 hover:bg-blue-400/10 hover:scale-105"
                >
                  <div className="h-32 w-full rounded-lg overflow-hidden mb-3">
                    <img 
                      src={PACKAGE_IMAGES[key]} 
                      alt={ticket.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.className = 'h-32 w-full rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-3'
                        e.target.parentElement.innerHTML = '<span class="text-4xl">🎫</span>'
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-blue-400">{ticket.type}</span>
                  </div>
                  {ticket.seats > 1 && (
                    <p className="text-white font-bold text-lg mb-1">{ticket.seats} Seats</p>
                  )}
                  <div className="mb-3">
                    <p className="text-blue-400 font-bold text-xl">₹{ticket.price.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 mb-3">
                    <p className="text-white text-xs font-semibold mb-2">Includes:</p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {ticket.features.map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-300 mt-2">No food included</p>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white font-bold py-2 px-4 rounded-lg hover:from-blue-500 hover:to-cyan-600 transition-all">
                    Select Package
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Fanpit Section */}
          {fanpitTickets.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-green-400">Fan Pit</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {fanpitTickets.map(([key, ticket]) => (
                  <div
                    key={key}
                    onClick={() => handlePackageSelect(key)}
                    className="p-5 rounded-xl cursor-pointer transition-all border-2 bg-white/5 border-white/10 hover:border-green-400 hover:bg-green-400/10 hover:scale-105"
                  >
                    <div className="h-32 w-full rounded-lg overflow-hidden mb-3">
                      <img 
                        src={PACKAGE_IMAGES[key]} 
                        alt={ticket.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.className = 'h-32 w-full rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center mb-3'
                          e.target.parentElement.innerHTML = '<span class="text-4xl">🎸</span>'
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-green-400">{ticket.type}</span>
                    </div>
                    {ticket.seats > 1 && (
                    <p className="text-white font-bold text-lg mb-1">{ticket.seats} Seats</p>
                  )}
                    <div className="mb-3">
                      <p className="text-green-400 font-bold text-xl">₹{ticket.price.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 mb-3">
                      <p className="text-white text-xs font-semibold mb-2">Includes:</p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {ticket.features.map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                    <p className="text-gray-400 text-xs mt-2">No food included</p>
                    </div>
                    <button className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold py-2 px-4 rounded-lg hover:from-green-500 hover:to-emerald-600 transition-all">
                      Select Package
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIP Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-purple-400">VIP Packages</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {vipTickets.map(([key, ticket]) => (
                <div
                  key={key}
                  onClick={() => handlePackageSelect(key)}
                  className="p-5 rounded-xl cursor-pointer transition-all border-2 bg-white/5 border-white/10 hover:border-purple-400 hover:bg-purple-400/10 hover:scale-105"
                >
                  <div className="h-32 w-full rounded-lg overflow-hidden mb-3">
                    <img 
                      src={PACKAGE_IMAGES[key]} 
                      alt={ticket.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.className = 'h-32 w-full rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-3'
                        e.target.parentElement.innerHTML = '<span class="text-4xl">✨</span>'
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-purple-400">{ticket.type}</span>
                  </div>
                  {ticket.seats > 1 && (
                    <p className="text-white font-bold text-lg mb-1">{ticket.seats} Seats</p>
                  )}
                  <div className="mb-3">
                    <p className="text-purple-400 font-bold text-xl">₹{ticket.price.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 mb-3">
                    <p className="text-white text-xs font-semibold mb-2">Includes:</p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {ticket.features.map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                    <p className="text-purple-400 text-xs mt-2">+ All Food Items</p>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-500 hover:to-pink-600 transition-all">
                    Select Package
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* VVIP Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-yellow-400">VVIP Packages</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {vvipTickets.map(([key, ticket]) => (
                <div
                  key={key}
                  onClick={() => handlePackageSelect(key)}
                  className="p-5 rounded-xl cursor-pointer transition-all border-2 bg-white/5 border-white/10 hover:border-yellow-400 hover:bg-yellow-400/10 hover:scale-105"
                >
                  <div className="h-32 w-full rounded-lg overflow-hidden mb-3">
                    <img 
                      src={PACKAGE_IMAGES[key]} 
                      alt={ticket.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.className = 'h-32 w-full rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center mb-3'
                        e.target.parentElement.innerHTML = '<span class="text-4xl">⭐</span>'
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-yellow-400">{ticket.type}</span>
                  </div>
                  {ticket.seats > 1 && (
                    <p className="text-white font-bold text-lg mb-1">{ticket.seats} Seats</p>
                  )}
                  <div className="mb-3">
                    <p className="text-yellow-400 font-bold text-xl">₹{ticket.price.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 mb-3">
                    <p className="text-white text-xs font-semibold mb-2">Includes:</p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {ticket.features.map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                    <p className="text-yellow-400 text-xs mt-2">+ All Food Items</p>
                  </div>
                  <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-2 px-4 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all">
                    Select Package
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BookTickets

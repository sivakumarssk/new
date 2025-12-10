import { Link } from 'react-router-dom'
// Package Images - Update these paths when you upload the images
import standardImage from '../assets/standard.jpg'
import vipImage from '../assets/vip.jpg'
import fanpitImage from '../assets/fanpit.png'
import mipImage from '../assets/mip.png'
import vvipCoupleImage from '../assets/vvipcouple.png'
import vip4paxImage from '../assets/vip4pax.png'
import vvipFamilyImage from '../assets/vvipfamily.jpg'

function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold text-white mb-4 animate-pulse">
          🎊 Sky Events New Year Bash 🎊
        </h1>
        <p className="text-2xl text-yellow-300 mb-8 font-semibold">
          Welcome 2025 with Style & Celebration!
        </p>
        <Link
          to="/book-tickets"
          className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all shadow-2xl"
        >
          Book Your Tickets Now! 🎫
        </Link>
      </div>

      {/* Event Details Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-center text-yellow-300 mb-8">Event Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="text-4xl">📅</span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Date & Time</h3>
                  <p className="text-lg text-gray-200">31st December 2025</p>
                  <p className="text-lg text-yellow-300 font-semibold">Night Event</p>
                </div>
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="text-4xl">📍</span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Location</h3>
                  <p className="text-lg text-gray-200">Rajamahendravaram</p>
                  <p className="text-lg text-gray-200">Andhra Pradesh</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Location Map */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Event Venue</h3>
            <div className="rounded-lg overflow-hidden border-2 border-white/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.5!2d81.8032222!3d17.0071389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDAwJzI1LjciTiA4McKwNDgnMTEuNiJF!5e0!3m2!1sen!2sin!4v1764888534333!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
            <p className="text-center text-gray-300 mt-4 text-sm">
              2R43+V75 Rajamahendravaram, Andhra Pradesh
            </p>
          </div>
        </div>
      </div>

      {/* Ticket Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
        {/* Standard Card */}
        <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all">
          <div className="h-48 w-full overflow-hidden">
            <img 
              src={standardImage} 
              alt="Standard Package" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = '<div class="h-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center"><span class="text-6xl">🎫</span></div>'
              }}
            />
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Standard</h2>
            <p className="text-white font-bold text-xl mb-3">₹699</p>
            <p className="text-white text-sm mb-4">1 Seat</p>
            <div className="bg-white/20 rounded-lg p-3 mb-3">
              <p className="text-white font-semibold text-xs mb-2">Includes:</p>
              <ul className="text-xs text-white space-y-1">
                <li>• Fireworks Show</li>
                <li>• Live Music</li>
              </ul>
            </div>
            <p className="text-xs text-white/80">No food included</p>
          </div>
        </div>

        {/* VIP Card */}
        <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all">
          <div className="h-48 w-full overflow-hidden">
            <img 
              src={vipImage} 
              alt="VIP Package" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = '<div class="h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center"><span class="text-6xl">✨</span></div>'
              }}
            />
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">VIP</h2>
            <p className="text-white font-bold text-xl mb-3">₹1,499</p>
            <p className="text-white text-sm mb-4">1 Seat</p>
            <div className="bg-white/20 rounded-lg p-3 mb-3">
              <p className="text-white font-semibold text-xs mb-2">Includes:</p>
              <ul className="text-xs text-white space-y-1">
                <li>• Fireworks Show</li>
                <li>• Live Music</li>
                <li>• Unlimited Food</li>
              </ul>
            </div>
            <p className="text-xs text-white/80">Unlimited Buffet</p>
          </div>
        </div>

        {/* Fanpit Card */}
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all">
          <div className="h-48 w-full overflow-hidden">
            <img 
              src={fanpitImage} 
              alt="Fanpit Package" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = '<div class="h-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center"><span class="text-6xl">🎸</span></div>'
              }}
            />
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Fanpit</h2>
            <p className="text-white font-bold text-xl mb-3">₹2,099</p>
            <p className="text-white text-sm mb-4">1 Seat</p>
            <div className="bg-white/20 rounded-lg p-3 mb-3">
              <p className="text-white font-semibold text-xs mb-2">Includes:</p>
              <ul className="text-xs text-white space-y-1">
                <li>• Fireworks Show</li>
                <li>• Live Music</li>
                <li>• 1 Non-Veg Starter Only</li>
              </ul>
            </div>
            <p className="text-xs text-white/80"> Unlimited Buffet + 1 Non-Veg Starter Only</p>
          </div>
        </div>

        {/* MIP Card */}
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all">
          <div className="h-48 w-full overflow-hidden">
            <img 
              src={mipImage} 
              alt="MIP Package" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = '<div class="h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center"><span class="text-6xl">⭐</span></div>'
              }}
            />
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">MIP</h2>
            <p className="text-white font-bold text-xl mb-3">₹2,999</p>
            <p className="text-white text-sm mb-4">1 Seat</p>
            <div className="bg-white/20 rounded-lg p-3 mb-3">
              <p className="text-white font-semibold text-xs mb-2">Includes:</p>
              <ul className="text-xs text-white space-y-1">
                <li>• Fireworks Show</li>
                <li>• Live Music</li>
                <li>• 1 Non-Veg Starter Only</li>
              </ul>
            </div>
            <p className="text-xs text-white/80"> Unlimited Buffet + 1 Non-Veg Starter Only</p>
          </div>
        </div>

        {/* VVIP Couple Card */}
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all">
          <div className="h-48 w-full overflow-hidden">
            <img 
              src={vvipCoupleImage} 
              alt="VVIP Couple Package" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = '<div class="h-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center"><span class="text-6xl">💑</span></div>'
              }}
            />
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">VVIP Couple</h2>
            <p className="text-white font-bold text-xl mb-3">₹3,499</p>
            <p className="text-white text-sm mb-4">2 Seats</p>
            <div className="bg-white/20 rounded-lg p-3 mb-3">
              <p className="text-white font-semibold text-xs mb-2">Includes:</p>
              <ul className="text-xs text-white space-y-1">
                <li>• Fireworks Show</li>
                <li>• Live Music</li>
                <li>• Unlimited Food</li>
              </ul>
            </div>
            <p className="text-xs text-white/80">Unlimited Buffet</p>
          </div>
        </div>

        {/* VIP 4PAX Card */}
        <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all">
          <div className="h-48 w-full overflow-hidden">
            <img 
              src={vip4paxImage} 
              alt="VIP 4PAX Package" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = '<div class="h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center"><span class="text-6xl">👥</span></div>'
              }}
            />
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">VIP (4PAX)</h2>
            <p className="text-white font-bold text-xl mb-3">₹5,999</p>
            <p className="text-white text-sm mb-4">4 Seats</p>
            <div className="bg-white/20 rounded-lg p-3 mb-3">
              <p className="text-white font-semibold text-xs mb-2">Includes:</p>
              <ul className="text-xs text-white space-y-1">
                <li>• Fireworks Show</li>
                <li>• Live Music</li>
                <li>• Unlimited Food</li>
              </ul>
            </div>
            <p className="text-xs text-white/80">Unlimited Buffet</p>
          </div>
        </div>

        {/* VVIP Family Card */}
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all">
          <div className="h-48 w-full overflow-hidden">
            <img 
              src={vvipFamilyImage} 
              alt="VVIP Family Package" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = '<div class="h-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center"><span class="text-6xl">👨‍👩‍👧‍👦</span></div>'
              }}
            />
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">VVIP Family</h2>
            <p className="text-white font-bold text-xl mb-3">₹6,999</p>
            <p className="text-white text-sm mb-4">4 Seats</p>
            <div className="bg-white/20 rounded-lg p-3 mb-3">
              <p className="text-white font-semibold text-xs mb-2">Includes:</p>
              <ul className="text-xs text-white space-y-1">
                <li>• Fireworks Show</li>
                <li>• Live Music</li>
                <li>• Unlimited Food</li>
              </ul>
            </div>
            <p className="text-xs text-white/80">Unlimited Buffet</p>
          </div>
        </div>
      </div>

      {/* Event Highlights */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-16">
        <h2 className="text-4xl font-bold text-center text-yellow-300 mb-8">Event Highlights</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🎵</span>
            <p className="text-white text-lg">Live Music & DJ</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-4xl">🎆</span>
            <p className="text-white text-lg">Fireworks Display</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-4xl">🍽️</span>
            <p className="text-white text-lg">Delicious Buffet</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-4xl">💃</span>
            <p className="text-white text-lg">Dance Floor</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

import { useState } from 'react'

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you can add API call to send the form data
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold text-center text-white mb-12">
        Contact Us
      </h1>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Contact Information - Compact */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-300 mb-4">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">Email</h3>
                  <p className="text-gray-300 text-sm">info@skyevents.com</p>
                  <p className="text-gray-300 text-sm">support@skyevents.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">Phone</h3>
                  <p className="text-gray-300 text-sm">+91 7799203333</p>
                  {/* <p className="text-gray-300 text-sm">+91 98765 43211</p> */}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">Address</h3>
                  <p className="text-gray-300 text-sm">
                    114-2-631/1<br />
                    Sy No 165 & 166<br />
                    Krishna Nagar<br />
                    Rajanagaram Road<br />
                    Swagat Petrol Bunk<br />
                    Diwancheruvu<br />
                    Rajamahendravaram
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-300 mb-4">
              Send us a Message
            </h2>
            {submitted ? (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-center">
                <p className="text-green-400 font-semibold">Thank you! Your message has been sent.</p>
              </div>
            ) : (
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
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 resize-none"
                    placeholder="Enter your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Google Maps */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4">
            Event Location
          </h2>
          <div className="rounded-lg overflow-hidden border-2 border-white/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4073.666961551027!2d81.8032222!3d17.007138899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDAwJzI1LjciTiA4McKwNDgnMTEuNiJF!5e1!3m2!1sen!2sin!4v1764888534333!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
          <p className="text-center text-gray-300 mt-4 text-sm">
            2R43+V75 Rajamahendravaram, Andhra Pradesh
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactUs

import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BookTickets from './pages/BookTickets'
import BookingForm from './pages/BookingForm'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-tickets" element={<BookTickets />} />
        <Route path="/booking-form" element={<BookingForm />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </div>
  )
}

export default App

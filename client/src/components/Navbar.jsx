import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            onClick={closeMenu}
          >
            <img 
              src={logo} 
              alt="Sky Events Logo" 
              className="h-16 md:h-20 w-auto"
            />
            <span className="text-xl md:text-2xl font-bold text-white hidden sm:inline">
              Sky Events New Year Bash
            </span>
            <span className="text-lg font-bold text-white sm:hidden">
              Sky Events
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            <Link 
              to="/" 
              className="text-white hover:text-yellow-300 font-semibold transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/book-tickets" 
              className="text-white hover:text-yellow-300 font-semibold transition-colors"
            >
              Book Tickets
            </Link>
            <Link 
              to="/about-us" 
              className="text-white hover:text-yellow-300 font-semibold transition-colors"
            >
              About Us
            </Link>
            <Link 
              to="/contact-us" 
              className="text-white hover:text-yellow-300 font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-yellow-300 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 pb-2">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-white hover:text-yellow-300 font-semibold transition-colors py-2 border-b border-white/20"
            >
              Home
            </Link>
            <Link
              to="/book-tickets"
              onClick={closeMenu}
              className="text-white hover:text-yellow-300 font-semibold transition-colors py-2 border-b border-white/20"
            >
              Book Tickets
            </Link>
            <Link
              to="/about-us"
              onClick={closeMenu}
              className="text-white hover:text-yellow-300 font-semibold transition-colors py-2 border-b border-white/20"
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              onClick={closeMenu}
              className="text-white hover:text-yellow-300 font-semibold transition-colors py-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

import { useState } from 'react'
import { Link } from 'react-router-dom'

const navLinks = ['Used Cars', 'New Cars', 'Trucks', 'Motorcycles', 'Sell Car']

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white w-full px-6 py-4 fixed top-0 left-0 z-50 shadow-md">
      
      {/* Top Row */}
      <div className="flex justify-between items-center">
        
        <a href="/" className="flex items-center">
          <img src="/Logo.png" alt="GariHat Logo" 
            className="h-10 w-auto mix-blend-multiply" />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a key={link} href="#" 
              className="text-gray-700 text-sm hover:text-blue-600">
              {link}
            </a>
          ))}
        </div>

        {/* Right side: Post Ad + Sign In */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/post-ad" 
            className="flex items-center gap-1 bg-[#DB1408] text-white px-4 py-2 rounded font-bold text-sm hover:bg-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            Post an Ad
          </Link>

          <a href="#" 
            className="border-2 border-[#DB1408] text-[#DB1408] px-5 py-2 rounded font-bold text-sm hover:bg-red-50">
            Sign In
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 text-2xl">
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4">
          {navLinks.map((link) => (
            <a key={link} href="#" 
              className="text-gray-700 text-sm hover:text-blue-600">
              {link}
            </a>
          ))}
          <Link to="/post-ad" 
            className="bg-[#DB1408] text-white px-5 py-2 rounded font-bold text-sm text-center">
            + Post an Ad
          </Link>
          <a href="#" 
            className="bg-[#1B0EA6] text-white px-5 py-2 rounded font-bold text-sm text-center">
            Sign In
          </a>
        </div>
      )}

    </nav>
  )
}

export default Navbar

import { useState } from 'react'

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

        {/* Desktop Sign In */}
        <a href="#" 
          className="hidden md:block bg-[#DB1408] text-white px-5 py-2 rounded font-bold text-sm">
          Sign In
        </a>

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
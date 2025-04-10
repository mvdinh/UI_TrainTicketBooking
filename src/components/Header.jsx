import React, { useState } from 'react'
import { Search, ChevronRight, Phone, Calendar, Train, Users, MapPin, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-xl font-bold">iVIVU.com</div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation and Contact Info */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 right-0 bg-blue-900 md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none z-50 md:justify-between md:flex-1 md:ml-6`}>
          <nav className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            <a href="#" className="border-b-2 border-yellow-400 hover:text-blue-200 py-2 md:py-0">Vé tàu</a>
            <a href="#" className="hover:text-blue-200 border-b-2 border-transparent hover:border-yellow-400 py-2 md:py-0">Tra cứu vé</a>
          </nav>
          
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            <div className="flex items-center cursor-pointer">
              <span className="inline">Tài khoản</span>
              <ChevronRight size={16} />
            </div>
            <div className="text-orange-400 font-bold flex items-center">
              <Phone size={16} className="mr-1" />
              <span>1900 2087</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
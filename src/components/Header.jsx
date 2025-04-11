import React, { useState } from 'react';
import { Search, ChevronRight, Phone, Train, Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

  return (
    <header className="bg-blue-900 shadow-md text-white">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-white font-bold text-2xl">
            iVIVU.com
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2 text-white hover:text-gray-300">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation - centered */}
        <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
          <Link to="/" className="flex items-center text-white text-lg hover:text-yellow-300">
            <Train size={20} className="mr-2" />
            <span>Vé tàu</span>
          </Link>
          <Link to="/tra-cuu-ve" className="flex items-center text-white text-lg hover:text-yellow-300">
            <Search size={20} className="mr-2" />
            <span>Tra cứu vé</span>
          </Link>
        </nav>

        {/* Account and Contact Info */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Account with Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleAccountDropdown}
              className="flex items-center text-white text-lg hover:text-yellow-300"
            >
              <User size={20} className="mr-1" />
              <span>Tài khoản</span>
              <ChevronRight size={16} className={`ml-1 transition-transform ${isAccountDropdownOpen ? 'rotate-90' : ''}`} />
            </button>
            
            {/* Account Dropdown */}
            {isAccountDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-800">
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">
                  Đăng nhập
                </Link>
                <Link to="/register" className="block px-4 py-2 hover:bg-gray-100">
                  Đăng ký
                </Link>
                <hr className="my-1" />
                <Link to="/logout" className="block px-4 py-2 hover:bg-gray-100">
                  Đăng xuất
                </Link>
              </div>
            )}
          </div>

          {/* Contact */}
          <a href="tel:19002087" className="flex items-center text-white text-lg hover:text-yellow-300">
            <Phone size={20} className="mr-2" />
            <span>1900 2087</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-900 py-2 px-4 text-white">
          <nav className="flex flex-col space-y-4 text-lg">
            <Link to="/ve-tau" className="flex items-center hover:text-yellow-300">
              <Train size={20} className="mr-2" />
              <span>Vé tàu</span>
            </Link>
            <Link to="/tra-cuu-ve" className="flex items-center hover:text-yellow-300">
              <Search size={20} className="mr-2" />
              <span>Tra cứu vé</span>
            </Link>
            <div className="relative">
              <button 
                onClick={toggleAccountDropdown}
                className="flex items-center w-full justify-between hover:text-yellow-300"
              >
                <div className="flex items-center">
                  <User size={20} className="mr-2" />
                  <span>Tài khoản</span>
                </div>
                <ChevronRight size={16} className={`transition-transform ${isAccountDropdownOpen ? 'rotate-90' : ''}`} />
              </button>
              
              {/* Mobile Account Dropdown */}
              {isAccountDropdownOpen && (
                <div className="pl-6 mt-2 space-y-2 text-base">
                  <Link to="/login" className="block py-1 hover:text-yellow-300">
                    Đăng nhập
                  </Link>
                  <Link to="/register" className="block py-1 hover:text-yellow-300">
                    Đăng ký
                  </Link>
                  <Link to="/logout" className="block py-1 hover:text-yellow-300">
                    Đăng xuất
                  </Link>
                </div>
              )}
            </div>
            <a href="tel:19002087" className="flex items-center hover:text-yellow-300">
              <Phone size={20} className="mr-2" />
              <span>1900 2087</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

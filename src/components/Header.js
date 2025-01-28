import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCheck, FiShield } from 'react-icons/fi';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            to="/" 
            className="flex items-center text-xl md:text-2xl font-bold text-primary hover:scale-105 transition-transform"
          >
            ⚡ App Deals
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/about"
              className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                isActive('/about')
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-600 hover:bg-primary/10'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                isActive('/contact')
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-600 hover:bg-primary/10'
              }`}
            >
              Contact
            </Link>
            <Link
              to="/faq"
              className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                isActive('/faq')
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-600 hover:bg-primary/10'
              }`}
            >
              FAQ
            </Link>
            <div className="relative group">
              <button className="px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 text-gray-600 hover:bg-primary/10">
                Products
                <span className="ml-1">▼</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link
                  to="/products/software"
                  className="block px-4 py-2 hover:bg-primary/10 rounded-t-xl"
                >
                  Software
                </Link>
                <Link
                  to="/products/courses"
                  className="block px-4 py-2 hover:bg-primary/10 rounded-b-xl"
                >
                  Courses
                </Link>
              </div>
            </div>
          </nav>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link
              to="/about"
              className={`block px-4 py-2 rounded-full transition-all ${
                isActive('/about')
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-primary/10'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block px-4 py-2 rounded-full transition-all ${
                isActive('/contact')
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-primary/10'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/faq"
              className={`block px-4 py-2 rounded-full transition-all ${
                isActive('/faq')
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-primary/10'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/products"
              className={`block px-4 py-2 rounded-full transition-all ${
                isActive('/products')
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'text-gray-600 hover:bg-primary/10'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 
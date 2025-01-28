import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield, FiDollarSign, FiThumbsUp, FiGift } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Lava Background */}
      <div className="relative bg-gradient-to-b from-black to-transparent pt-24 overflow-hidden">
        {/* Animated Lava Background */}
        <div 
          className="absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(circle at center, #ff4d4d 0%, #990000 100%)
            `,
            animation: 'pulse 3s infinite',
            opacity: '0.8'
          }}
        >
          <div className="absolute inset-0 bg-black/30" /> {/* Overlay for better text readability */}
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Exclusive Software Deals
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Save up to 90% on Premium Tools & Digital Products
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products/software"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-lg"
              >
                Browse Deals
              </Link>
              <Link
                to="/products/courses"
                className="bg-transparent text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-all border-2 border-white transform hover:-translate-y-1"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4 justify-center bg-gray-50 p-6 rounded-lg transform hover:-translate-y-1 transition-all">
              <FiShield className="text-4xl text-red-600" />
              <div>
                <h3 className="font-semibold">Verified Deals</h3>
                <p className="text-sm text-gray-600">100% Genuine Products</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center bg-gray-50 p-6 rounded-lg transform hover:-translate-y-1 transition-all">
              <FiDollarSign className="text-4xl text-red-600" />
              <div>
                <h3 className="font-semibold">Best Prices</h3>
                <p className="text-sm text-gray-600">Exclusive Discounts</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center bg-gray-50 p-6 rounded-lg transform hover:-translate-y-1 transition-all">
              <FiThumbsUp className="text-4xl text-red-600" />
              <div>
                <h3 className="font-semibold">Trusted Partners</h3>
                <p className="text-sm text-gray-600">Leading Brands</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center bg-gray-50 p-6 rounded-lg transform hover:-translate-y-1 transition-all">
              <FiGift className="text-4xl text-red-600" />
              <div>
                <h3 className="font-semibold">Bonus Rewards</h3>
                <p className="text-sm text-gray-600">Special Benefits</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Never Miss a Deal</h2>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter and get exclusive deals delivered to your inbox.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home; 
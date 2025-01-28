import React, { useState, useEffect } from 'react';
import { FiClock, FiX } from 'react-icons/fi';

const FomoBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 59,
    seconds: 59
  });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-bounce-slow">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-4 rounded-lg shadow-2xl max-w-sm">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-white/80 hover:text-white"
        >
          <FiX />
        </button>
        
        <div className="flex items-center gap-3 mb-2">
          <FiClock className="text-xl animate-pulse" />
          <h3 className="font-bold text-lg">Limited Time Offer!</h3>
        </div>
        
        <p className="text-sm mb-3">
          🔥 Flash Sale: 50+ Premium Software Deals Ending Soon!
        </p>
        
        <div className="flex justify-center gap-2 text-center">
          <div className="bg-black/20 px-3 py-2 rounded">
            <span className="text-xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <p className="text-xs">Hours</p>
          </div>
          <div className="bg-black/20 px-3 py-2 rounded">
            <span className="text-xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <p className="text-xs">Minutes</p>
          </div>
          <div className="bg-black/20 px-3 py-2 rounded">
            <span className="text-xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <p className="text-xs">Seconds</p>
          </div>
        </div>
        
        <div className="mt-3 text-center">
          <a 
            href="/products/software" 
            className="inline-block bg-white text-red-600 px-4 py-2 rounded font-medium text-sm hover:bg-gray-100 transition-colors"
          >
            Shop Now →
          </a>
        </div>
      </div>
    </div>
  );
};

export default FomoBanner; 
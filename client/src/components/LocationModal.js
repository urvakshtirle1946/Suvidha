'use client';
import { useState, useEffect } from 'react';
import { Search, MapPin, X, Building2 } from 'lucide-react';

const POPULAR_CITIES = [
  { name: 'Mumbai', icon: '/icons/mumbai.png' },
  { name: 'Delhi-NCR', icon: '/icons/delhi.png' },
  { name: 'Bengaluru', icon: '/icons/bangalore.png' },
  { name: 'Hyderabad', icon: '/icons/hyderabad.png' },
  { name: 'Chandigarh', icon: '/icons/chandigarh.png' },
  { name: 'Ahmedabad', icon: '/icons/ahmedabad.png' },
  { name: 'Pune', icon: '/icons/pune.png' },
  { name: 'Chennai', icon: '/icons/chennai.png' },
  { name: 'Kolkata', icon: '/icons/kolkata.png' },
  { name: 'Kochi', icon: '/icons/kochi.png' },
];

export default function LocationModal({ isOpen, onClose, onSelectLocation, onDetectLocation }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="modal-close"
        >
          <X size={20} color="#6b7280" />
        </button>

        {/* Search Bar */}
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search for your city"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Detect Location */}
        <button 
          onClick={() => {
            onDetectLocation();
            onClose();
          }}
          className="detect-btn"
        >
          <MapPin size={18} />
          <span>Detect my location</span>
        </button>

        {/* Popular Cities Section */}
        <div className="text-center">
          <h3 className="popular-cities-title">Popular Cities</h3>
          
          <div className="cities-grid">
            {POPULAR_CITIES.map((city) => (
              <button
                key={city.name}
                onClick={() => {
                  onSelectLocation(city.name + ', India');
                  onClose();
                }}
                className="city-item"
              >
                {/* Icon Placeholder */}
                <div className="city-icon-box">
                   <Building2 className="city-icon" size={24} color="#9ca3af" />
                </div>
                <span className="city-name">
                  {city.name}
                </span>
              </button>
            ))}
          </div>

          <button className="view-all-btn">
            View All Cities
          </button>
        </div>

      </div>
    </div>
  );
}

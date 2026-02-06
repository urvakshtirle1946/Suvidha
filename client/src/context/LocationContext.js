'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [location, setLocation] = useState('Detecting location...');
  const [city, setCity] = useState('');

  const detectLocation = () => {
    setLocation('Detecting...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const detectedCity = data.address.city || data.address.town || data.address.state_district || 'Mumbai';
          
          // Strict check for Indore
          if (!detectedCity.toLowerCase().includes('indore')) {
            alert(`We currently serve only in Indore. We are coming soon to ${detectedCity}!`);
            setCity('Indore'); 
            setLocation('Indore, India');
            return;
          }

          const detectedArea = data.address.suburb || data.address.neighbourhood || data.address.road || '';
          
          setCity(detectedCity);
          setLocation(`${detectedArea ? detectedArea + ', ' : ''}${detectedCity}`);
        } catch (error) {
          console.error("Location fetch failed", error);
          setCity('Indore');
          setLocation('Indore, India');
        }
      }, (err) => {
        console.warn("Location permission denied", err);
        setLocation('Indore, India');
        setCity('Indore');
      });
    } else {
      setLocation('Indore, India');
      setCity('Indore');
    }
  };

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, city, setLocation, setCity, detectLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);

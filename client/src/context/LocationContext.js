'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [location, setLocation] = useState('Detecting location...');
  const [city, setCity] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const detectedCity = data.address.city || data.address.town || data.address.state_district || 'Mumbai';
          const detectedArea = data.address.suburb || data.address.neighbourhood || data.address.road || '';
          
          setCity(detectedCity);
          setLocation(`${detectedArea ? detectedArea + ', ' : ''}${detectedCity}`);
        } catch (error) {
          console.error("Location fetch failed", error);
          setLocation('Mumbai, India');
          setCity('Mumbai');
        }
      }, (err) => {
        console.warn("Location permission denied", err);
        setLocation('Mumbai, India');
        setCity('Mumbai');
      });
    } else {
      setLocation('Mumbai, India');
      setCity('Mumbai');
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, city, setLocation, setCity }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);

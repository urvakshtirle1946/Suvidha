'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

// Create custom pulsing blue icon to represent user
const pulseIcon = L.divIcon({
    className: 'custom-pulse-icon',
    html: `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: rgba(59, 130, 246, 0.4); border-radius: 50%; animation: pulse 2s infinite ease-out; pointer-events: none;"></div>
        <div style="width: 16px; height: 16px; border-radius: 50%; background: #3b82f6; border: 3px solid white; box-shadow: 0 0 0 1px rgba(0,0,0,0.1); position: relative; z-index: 2; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
        <style>
            @keyframes pulse {
                0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
            }
            .dummy-car-icon {
                transition: transform 1s linear;
                filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
            }
        </style>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

// Create custom car icon with memory caching to stop React-Leaflet appendChild thrashing
const iconCache = {};
const getCarIcon = (heading) => {
    const rounded = Math.round(heading || 0);
    if (!iconCache[rounded]) {
        iconCache[rounded] = L.divIcon({
            className: 'dummy-car-icon',
            html: `
                <div style="transform: rotate(${rounded}deg); width: 20px; height: 40px; transform-origin: center center;">
                    <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
                        <rect x="5" y="30" width="15" height="30" rx="5" fill="#333"/>
                        <rect x="80" y="30" width="15" height="30" rx="5" fill="#333"/>
                        <rect x="5" y="140" width="15" height="30" rx="5" fill="#333"/>
                        <rect x="80" y="140" width="15" height="30" rx="5" fill="#333"/>
                        <rect x="15" y="15" width="70" height="170" rx="20" fill="#facc15"/>
                        <path d="M 25 60 L 75 60 L 80 85 L 20 85 Z" fill="#374151"/>
                        <path d="M 25 150 L 75 150 L 70 125 L 30 125 Z" fill="#374151"/>
                        <rect x="25" y="85" width="50" height="40" fill="#eab308"/>
                    </svg>
                </div>
            `,
            iconSize: [20, 40],
            iconAnchor: [10, 20]
        });
    }
    return iconCache[rounded];
};

export default function LiveMap({ center, isBookingActive, onArrival }) {
    // Dummy moving cars logic
    const [cars, setCars] = useState([]);

    // Active Booking logic
    const [driverRoute, setDriverRoute] = useState([]);
    const [driverPos, setDriverPos] = useState({ lat: center.lat - 0.005, lng: center.lng - 0.003 });
    const [driverHeading, setDriverHeading] = useState(30);

    // Dummy Cars Effect
    useEffect(() => {
        if (isBookingActive) return;
        // Initialize 4 scattered cars far from the center
        const initialCars = [
            { id: 1, lat: center.lat + 0.008, lng: center.lng + 0.009, speedLat: -0.00005, speedLng: -0.00002, heading: 200 },
            { id: 2, lat: center.lat - 0.007, lng: center.lng + 0.008, speedLat: 0.00006, speedLng: -0.00004, heading: 320 },
            { id: 3, lat: center.lat + 0.006, lng: center.lng - 0.007, speedLat: -0.00004, speedLng: 0.00007, heading: 120 },
            { id: 4, lat: center.lat - 0.008, lng: center.lng - 0.006, speedLat: 0.00005, speedLng: 0.00003, heading: 35 },
        ];
        
        setCars(initialCars);

        const interval = setInterval(() => {
            setCars(prevCars => prevCars.map(car => ({
                ...car,
                lat: car.lat + car.speedLat,
                lng: car.lng + car.speedLng
            })));
        }, 1000); // Move every second

        return () => clearInterval(interval);
    }, [center.lat, center.lng, isBookingActive]); // Re-init relative to center when map center drastically changes

    // Active Driver Effect
    useEffect(() => {
        if (!isBookingActive) return;
        
        // Define an L-shaped street route covering two turns
        const start = { lat: center.lat - 0.006, lng: center.lng - 0.004 };
        const mid = { lat: center.lat, lng: center.lng - 0.004 };
        const end = { lat: center.lat, lng: center.lng };
        const routePoints = [start, mid, end];
        
        setDriverRoute(routePoints);
        setDriverPos(start);
        
        let targetIdx = 1;
        let currentPos = { ...start };

        const speed = 0.00008; // Slower, more realistic animation distance per tick
        const interval = setInterval(() => {
            setDriverPos(prev => {
                if (targetIdx >= routePoints.length) {
                    if (onArrival) {
                        // Push up to macro-task queue to avoid synchronous React setState render collision
                        setTimeout(() => onArrival(), 0);
                    }
                    return prev; // Reached end
                }
                
                const target = routePoints[targetIdx];
                const dx = target.lng - currentPos.lng;
                const dy = target.lat - currentPos.lat;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < speed) {
                    currentPos = { lat: target.lat, lng: target.lng };
                    targetIdx++; // Move to next waypoint
                    return currentPos;
                }

                const moveLat = (dy / dist) * speed;
                const moveLng = (dx / dist) * speed;
                
                // Update direction heading
                const heading = Math.atan2(dx, dy) * (180 / Math.PI);
                setDriverHeading(heading);

                currentPos = { lat: currentPos.lat + moveLat, lng: currentPos.lng + moveLng };
                return currentPos;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isBookingActive, center]);

    return (
        <MapContainer 
            key={`${center.lat}-${center.lng}`}
            center={center} 
            zoom={15} 
            style={{ width: '100%', height: '100%', zIndex: 1 }} 
            zoomControl={false} 
            attributionControl={false}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <ChangeView center={center} />
            <Marker position={center} icon={pulseIcon} zIndexOffset={100} />
            
            {/* Render Dummy Cars when selecting */}
            {!isBookingActive && cars.map(car => (
                <Marker 
                    key={car.id} 
                    position={[car.lat, car.lng]} 
                    icon={getCarIcon(car.heading)} 
                />
            ))}

            {/* Active Booking Route Elements */}
            {isBookingActive && driverRoute.length > 0 && (
                <Polyline 
                    positions={driverRoute.map(p => [p.lat, p.lng])} 
                    color="#22c55e" 
                    weight={5} 
                    opacity={0.8} 
                />
            )}
            
            {isBookingActive && (
                <Marker 
                    position={[driverPos.lat, driverPos.lng]} 
                    icon={getCarIcon(driverHeading)} 
                    zIndexOffset={200}
                />
            )}
        </MapContainer>
    );
}

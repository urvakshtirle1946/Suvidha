'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (map) {
            // Use setView with no animation to prevent '_leaflet_pos' errors during fast updates/unmounts
            map.setView(center, zoom, { animate: false }); 
        }
    }, [center, zoom, map]);
    return null;
}

export default function LeafletMap({ center, zoom }) {
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Fix Leaflet Default Icon issue
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl,
                iconUrl,
                shadowUrl,
            });
            setInit(true);
        }
    }, []);

    if (!init) return <div style={{height: '100%', width: '100%', background: '#f0f0f0'}}>Loading Map...</div>;

    return (
        <MapContainer 
            // Important: Use a key to force re-initialization if needed, 
            // or keep it stable if we want performance. 
            // Here, using a static key since we use ChangeView for updates.
            key="leaflet-map-container"
            center={center} 
            zoom={zoom} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
        >
            <ChangeView center={center} zoom={zoom} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={center}>
                <Popup>
                    Pickup Location
                </Popup>
            </Marker>
        </MapContainer>
    );
}

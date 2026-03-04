import { useState, useEffect } from 'react';
import { Menu, ArrowRight, User, Ambulance, X, ChevronUp, ChevronDown, CheckCircle2, Star, Clock, MapPin, Navigation } from 'lucide-react';
import { motion, useDragControls, useAnimation } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { getApiUrl } from '@/utils/api';
import dynamic from 'next/dynamic';

const LiveMap = dynamic(() => import('./LiveMap'), {
    ssr: false,
    loading: () => <div style={{ width: '100%', height: '100%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#9ca3af', fontSize: '14px' }}>Loading map...</span></div>
});

export default function AmbulanceRequest() {
    const { isCartOpen } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [location, setLocation] = useState({ lat: 12.9716, lng: 77.5946 }); // Default center fallback
    const dragControls = useDragControls();
    const sheetControls = useAnimation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [address, setAddress] = useState('Fetching location...');
    const [rideStatus, setRideStatus] = useState('selecting'); // 'selecting', 'active', 'arrived'
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Reverse geocode the coordinate into a real street name
    useEffect(() => {
        const fetchAddress = async () => {
            // Early return if coordinates look exactly like the default fallback placeholder
            if (location.lat === 12.9716 && location.lng === 77.5946) {
                setAddress('Bangalore, India');
                return;
            }
            try {
                const apiUrl = getApiUrl();
                const res = await fetch(`${apiUrl}/api/location/reverse?lat=${location.lat}&lon=${location.lng}`);
                
                if (!res.ok) throw new Error('Geocoding rate limit');
                const data = await res.json();
                
                if (data && data.display_name) {
                    const shortAddress = (data.display_name || '').split(',').slice(0, 2).join(', ').trim();
                    setAddress(shortAddress || 'Your Location');
                } else if (data && data.address) {
                   // Fallback for different data structures
                   const addressObj = data.address;
                   const street = addressObj.road || addressObj.suburb || addressObj.neighbourhood || '';
                   const city = addressObj.city || addressObj.town || '';
                   setAddress(street ? `${street}, ${city}` : city || 'Your Location');
                }
            } catch (err) {
                console.warn('Geocoding fetch aborted / failed', err);
                setAddress('Your Location');
            }
        };
        fetchAddress();
    }, [location]);

    const handleExpandToggle = (e) => {
        e.stopPropagation();
        if (isExpanded) {
            sheetControls.start({ y: 300 }); // "Very down"
        } else {
            sheetControls.start({ y: 0 }); // Expanded
        }
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        // if ("navigator" in window) {
        //     navigator.geolocation.getCurrentPosition((position) => {
        //         setLocation({
        //             lat: position.coords.latitude,
        //             lng: position.coords.longitude,
        //         });
        //     });
        // }
    }, []);

    const toggleWidget = () => setIsOpen((prev) => !prev);

    if (!mounted) return null;
    if (isCartOpen) return null;

    return (
        <>
            {/* FLOATING TRIGGER BUTTON */}
            <button
                className={`ambulance-float-btn ${isOpen ? 'active' : ''}`}
                style={{
                    position: 'fixed', bottom: '24px', right: '24px',
                    width: '60px', height: '60px', borderRadius: '50%',
                    background: '#000', color: 'white', border: 'none',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                    cursor: 'pointer', zIndex: 10000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onClick={toggleWidget}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.6)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.4)'; }}
            >
                <div style={{
                    position: 'absolute',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isOpen ? 'rotate(180deg) scale(0)' : 'rotate(0deg) scale(1)',
                    opacity: isOpen ? 0 : 1
                }}>
                    <Ambulance size={28} />
                </div>
                <div style={{
                    position: 'absolute',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isOpen ? 'rotate(0deg) scale(1)' : 'rotate(-180deg) scale(0)',
                    opacity: isOpen ? 1 : 0
                }}>
                    <X size={28} strokeWidth={2.5} />
                </div>
            </button>

            {/* FLOATING MOBILE UI POPUP (Uber-Style) */}
            <div 
                className={`floating-ios-container shadow-2xl ${isOpen ? 'open' : 'closed'}`} 
                onClick={(e) => e.stopPropagation()}
            >
                {/* SCREEN CONTENT (RIDE BOOKING UI) */}
                <div className="screen-content h-full relative" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
                    
                    {/* Top Section / Full Map Background */}
                    <div className="map-area" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', overflow: 'hidden', background: '#e5e7eb', zIndex: 0 }}>
                        <LiveMap center={location} isBookingActive={rideStatus !== 'selecting'} onArrival={() => { if (rideStatus === 'active') setRideStatus('arrived'); }} />
                    </div>

                    {/* STATUS BAR MOCK */}
                    <div className="ios-status-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', zIndex: 200, pointerEvents: 'none' }}>
                        <div className="time" style={{ fontWeight: '600', fontSize: '15px', color: '#000', paddingTop: '2px' }}>9:41</div>
                        <div className="dynamic-island-bg" style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '28px', background: '#000', borderRadius: '20px' }}></div>
                        <div className="icons" style={{ display: 'flex', gap: '6px', alignItems: 'center', paddingTop: '2px' }}>
                            <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7.5H7V11.5H5V7.5ZM9 5.5H11V11.5H9V5.5ZM13 3.5H15V11.5H13V3.5Z" fill="#000"/></svg>
                            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 1.5C5.5 1.5 3 2.5 1 4.5L8 11.5L15 4.5C13 2.5 10.5 1.5 8 1.5Z" fill="#000"/></svg>
                            <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="1" y="2" width="20" height="8" rx="2" stroke="#000" strokeWidth="1.5"/><rect x="2" y="3" width="14" height="6" rx="1" fill="#000"/><path d="M22 4.5V7.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </div>
                    </div>

                    {/* ACTIVE BOOKING OVERLAY */}
                    {rideStatus === 'active' && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
                            {/* Top Details Card */}
                            <div style={{ background: '#fff', borderRadius: '16px', margin: '60px 20px 0 20px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', pointerEvents: 'auto' }}>
                                {/* Pickup */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4px' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: '2px solid #22c55e', background: 'transparent' }}></div>
                                        {/* Vertical Dotted Line */}
                                        <div style={{ height: '30px', borderLeft: '2px dotted #e5e5e5', margin: '4px 0' }}></div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '15px', fontWeight: '700', color: '#000' }}>Larchmont Hotel</span>
                                            <span style={{ fontSize: '11px', fontWeight: '600', color: '#666' }}>4:20 PM</span>
                                        </div>
                                        <span style={{ fontSize: '12px', fontWeight: '500', color: '#666', marginTop: '2px', display: 'block' }}>Jl. Jend. Sudirman No. 18, Bangalore, SG 37154</span>
                                    </div>
                                </div>
                                {/* Dropoff */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4px' }}>
                                        <div style={{ width: '12px', height: '12px', border: '3px solid #ef4444', backgroundColor: '#fff', position: 'relative' }}></div>
                                    </div>
                                    <div style={{ flex: 1, marginTop: '-2px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '15px', fontWeight: '700', color: '#000' }}>Larchmont Village</span>
                                            <span style={{ fontSize: '11px', fontWeight: '600', color: '#666' }}>5:20 PM</span>
                                        </div>
                                        <span style={{ fontSize: '12px', fontWeight: '500', color: '#666', marginTop: '2px', display: 'block' }}>27 W Main St. Larchmont, NY 10</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Bottom Buttons Container */}
                            <div style={{ marginTop: 'auto', marginBottom: '24px', padding: '0 20px', display: 'flex', gap: '12px', pointerEvents: 'auto' }}>
                                <button 
                                    onClick={() => setRideStatus('selecting')}
                                    style={{ flex: 1, background: '#22c55e', color: '#fff', fontSize: '15px', fontWeight: '700', padding: '16px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}
                                >
                                    Back
                                </button>
                                <button 
                                    onClick={() => setRideStatus('selecting')}
                                    style={{ flex: 1, background: '#ef4444', color: '#fff', fontSize: '15px', fontWeight: '700', padding: '16px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        </div>
                    )}

                    {/* RIDE COMPLETED - TRIP DETAILS */}
                    {rideStatus === 'arrived' && (
                        <motion.div 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
                        >
                            <div style={{ background: '#fff', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', padding: '24px 20px', pointerEvents: 'auto', boxShadow: '0 -10px 40px rgba(0,0,0,0.1)' }}>
                                
                                {/* Pulsing Location Icon */}
                                <div style={{ marginTop: '-60px', display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ background: '#fff', borderRadius: '50%', padding: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                                        <div style={{ width: '64px', height: '64px', background: '#e5f8ed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ background: '#22c55e', borderRadius: '50%', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 10px rgba(34, 197, 94, 0.15)' }}>
                                                <MapPin color="white" size={24} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h2 style={{ textAlign: 'center', fontSize: '22px', fontWeight: '800', margin: '16px 0 20px 0', color: '#000' }}>You Have Arrived!</h2>
                                <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '20px' }} />

                                <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: '#000' }}>Trip Details</h3>
                                
                                {/* Driver Profile Card */}
                                <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces" alt="Driver" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <span style={{ fontSize: '16px', fontWeight: '800', color: '#000' }}>James Brown</span>
                                                <div style={{ background: '#3b82f6', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <CheckCircle2 color="white" size={10} />
                                                </div>
                                            </div>
                                            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Verified account</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                                                <Star fill="#f59e0b" color="#f59e0b" size={14} />
                                                <span style={{ fontSize: '13px', fontWeight: '800', color: '#000' }}>4.7</span>
                                                <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>(1,927 reviews)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src="https://cdn-icons-png.flaticon.com/512/1048/1048314.png" alt="car" style={{ width: '60px', transform: 'scaleX(-1)' }} />
                                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#000', marginTop: '-4px' }}>Chevrolet Camaro</span>
                                        <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: '500' }}>CCG-3705- Yellow</span>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', padding: '0 10px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ background: '#f3f4f6', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                                            <Clock size={22} color="#4b5563" />
                                        </div>
                                        <span style={{ fontSize: '16px', fontWeight: '800', color: '#000' }}>8 Mins</span>
                                        <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>Duration</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ background: '#f3f4f6', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                                            <MapPin size={22} color="#4b5563" />
                                        </div>
                                        <span style={{ fontSize: '16px', fontWeight: '800', color: '#000' }}>2.1 km</span>
                                        <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>Distance</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ background: '#f3f4f6', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                                            <Navigation size={22} color="#4b5563" />
                                        </div>
                                        <span style={{ fontSize: '16px', fontWeight: '800', color: '#000' }}>30 Km/h</span>
                                        <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>Avg.Speed</span>
                                    </div>
                                </div>

                                <h3 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '12px', color: '#000' }}>Rate Ride</h3>
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: '#f9fafb', padding: '16px', borderRadius: '16px', justifyContent: 'center' }}>
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={i} fill="#22c55e" color="#22c55e" size={32} />
                                    ))}
                                </div>

                                <button 
                                    onClick={() => setRideStatus('selecting')}
                                    style={{ width: '100%', background: '#22c55e', color: '#fff', fontSize: '17px', fontWeight: '700', padding: '18px', borderRadius: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)' }}
                                >
                                    Continue
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* SELECTING RIDE - BOTTOM SHEET */}
                    {rideStatus === 'selecting' && (
                        <>
                            {/* Bottom Sheet UI Block (Draggable) */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
                                <motion.div 
                                    className="bottom-sheet flex-1 overflow-y-auto" 
                                    drag="y"
                                    animate={sheetControls}
                                    dragControls={dragControls}
                                    dragListener={false}
                                    dragConstraints={{ top: 0, bottom: 350 }}
                                    onDragEnd={(event, info) => {
                                        if (info.offset.y < -50 || (info.offset.y < 0 && info.velocity.y < -100)) {
                                            sheetControls.start({ y: 0 }); // Snap open
                                            setIsExpanded(true);
                                        } else if (info.offset.y > 50 || (info.offset.y > 0 && info.velocity.y > 100)) {
                                            sheetControls.start({ y: 300 }); // Snap down
                                            setIsExpanded(false);
                                        }
                                    }}
                                    dragElastic={0.1}
                                    style={{ 
                                        background: '#fff', 
                                        borderTopLeftRadius: '32px', 
                                        borderTopRightRadius: '32px', 
                                        padding: '12px 20px 200px 20px', /* Extra padding to prevent gap when dragged */
                                        marginTop: 'auto',
                                        marginBottom: '-160px', /* Offset the extra padding */
                                        pointerEvents: 'auto',
                                        minHeight: '60%', 
                                        boxShadow: '0 -10px 40px rgba(0,0,0,0.1)' 
                                    }}
                                >
                                    {/* Drag Handle Area */}
                            <div 
                                style={{ width: '100%', paddingBottom: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            >
                                <div 
                                    style={{ width: '100%', display: 'flex', justifyContent: 'center', cursor: 'grab', paddingBottom: '8px' }}
                                    onPointerDown={(e) => dragControls.start(e)}
                                >
                                    <div style={{ width: '40px', height: '4px', background: '#e5e7eb', borderRadius: '2px' }}></div>
                                </div>
                            </div>
                            
                            {/* "Where to?" Search Box */}
                            <div style={{ background: '#f5f5f5', borderRadius: '16px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                {/* Car Icon */}
                                <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/1048/1048314.png" alt="car" style={{ width: '130%', minWidth: '45px', transform: 'scaleX(-1)' }} />
                                </div>
                                
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                    <span style={{ color: '#a3a3a3', fontSize: '11px', fontWeight: '600' }}>Current Location</span>
                                    <span style={{ color: '#000000', fontSize: '18px', fontWeight: '700', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>{address}</span>
                                </div>

                                <div style={{ borderLeft: '1px solid #e5e5e5', paddingLeft: '16px', color: '#000', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                                    Map
                                </div>
                            </div>

                            {/* 2x2 Grid Container */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '12px' }}>
                                
                                <GridCard onClick={() => setRideStatus('active')} title="Bike" subtitle="2 min" imgUrl="/bike.png" scale="0.9" />
                                <GridCard onClick={() => setRideStatus('active')} title="Auto" subtitle="4 min" imgUrl="/auto.svg" scale="0.8" shiftRight={true} />
                                <GridCard onClick={() => setRideStatus('active')} title="Car" subtitle="5 min" imgUrl="https://cdn-icons-png.flaticon.com/512/1048/1048314.png" scale="0.9" shiftRight={true} />
                                <GridCard onClick={() => setRideStatus('active')} title="Ambulance" subtitle="Fastest" imgUrl="/ambulance.svg" scale="0.9" shiftRight={true} />
                            </div>
                        </motion.div>
                        
                        {/* FLOATING ACTION BUTTON (Toggle Arrow) */}
                        {rideStatus === 'selecting' && (
                            <div 
                                onClick={handleExpandToggle}
                                style={{ 
                                    position: 'absolute', 
                                    bottom: '30px', 
                                    right: '25px', 
                                    background: '#fff', 
                                    borderRadius: '50%', 
                                    width: '45px', 
                                    height: '45px', 
                                    cursor: 'pointer', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    zIndex: 60,
                                    border: '1px solid #f3f4f6'
                                }}
                            >
                                {isExpanded ? <ChevronDown size={24} color="#000" strokeWidth={2.5} /> : <ChevronUp size={24} color="#000" strokeWidth={2.5} />}
                            </div>
                        )}
                    </div>
                    </>
                    )}

                    {/* Home Indicator (iOS Bar) */}
                    <div className="ios-home-indicator absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[140px] h-[5px] bg-black rounded-full z-[100]"></div>
                </div>
            </div>

            <style jsx>{`
                /* Font matching standard system fonts for a clean look */
                .floating-ios-container {
                    position: fixed;
                    bottom: 50vh;
                    right: 50px;
                    width: 340px;
                    height: 700px;
                    background: #fff;
                    border-radius: 40px;
                    border: 4px solid #1f2022;
                    box-shadow: 0 30px 60px -12px rgba(0,0,0,0.5);
                    z-index: 9999;
                    overflow: hidden;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    transform-origin: center;
                    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease, visibility 0.4s ease, margin-top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .floating-ios-container.open {
                    transform: translateY(50%) scale(1) !important;
                    margin-top: -350px;
                    opacity: 1;
                    visibility: visible;
                }
                
                .floating-ios-container.closed {
                    transform: translateY(50%) scale(0.6) !important;
                    margin-top: -350px;
                    opacity: 0;
                    visibility: hidden;
                    pointer-events: none;
                }

                @media (max-width: 768px) {
                    .floating-ios-container {
                        bottom: 0 !important;
                        right: 0 !important;
                        width: 100vw !important;
                        height: 100dvh !important;
                        border-radius: 0 !important;
                        border: none !important;
                        margin-top: 0 !important;
                    }
                    .floating-ios-container.open {
                        transform: translateY(0) scale(1) !important;
                    }
                    .floating-ios-container.closed {
                        transform: translateY(100vh) scale(1) !important;
                        opacity: 1 !important; /* Move out of view without fading */
                        visibility: visible !important;
                    }
                    .ios-status-bar, .ios-home-indicator {
                        display: none !important;
                    }
                }

                .screen-content::-webkit-scrollbar,
                .bottom-sheet::-webkit-scrollbar {
                    display: none; 
                }
                .bottom-sheet {
                    -ms-overflow-style: none; scrollbar-width: none;
                }

                /* Live location pulse animation */
                .pulse-ring {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 40px;
                    height: 40px;
                    background: rgba(59, 130, 246, 0.4);
                    border-radius: 50%;
                    animation: pulse 2s infinite ease-out;
                    pointer-events: none;
                }
                
                @keyframes pulse {
                    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
                }

            `}</style>
        </>
    );
}

function GridCard({ title, subtitle, imgUrl, scale = "1", customIcon = null, tall = false, shiftRight = false, onClick }) {
    return (
        <div 
        onClick={onClick}
        style={{ 
            background: '#f9f9f9', 
            borderRadius: '16px', 
            padding: '12px', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            position: 'relative',
            height: tall ? '150px' : '95px',
            gridRow: tall ? 'span 2' : 'span 1',
            cursor: 'pointer',
            overflow: 'visible' /* Allows car to spill out slightly */
        }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#000', zIndex: 2 }}>{title}</span>
            <span style={{ fontSize: '11px', fontWeight: '500', color: '#666', marginTop: '2px', zIndex: 2 }}>{subtitle}</span>
            
            {customIcon}

            {imgUrl && (
                <div style={{ 
                    position: 'absolute', 
                    bottom: '-5px', 
                    right: shiftRight ? '-20px' : '-5px', 
                    width: '60px', 
                    height: '60px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    zIndex: 1
                }}>
                    <img src={imgUrl} alt={title} style={{ transform: `scale(${scale})`, objectFit: 'contain', width: '100%', height: '100%' }} />
                </div>
            )}
        </div>
    );
}

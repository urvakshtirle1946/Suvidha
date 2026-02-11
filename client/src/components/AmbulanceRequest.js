'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Ambulance, X, MapPin, Search, ChevronRight, AlertTriangle, Building2, Phone, Briefcase, Car } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { useAuth } from '@/context/AuthContext';
import { getApiUrl } from '@/utils/api';
import { useCart } from '@/context/CartContext';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
    ssr: false,
    loading: () => <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>Loading Map...</div>
});

const DEFAULT_CENTER = {
    lat: 28.6139,
    lng: 77.2090
};

const HOSPITALS = [
    { id: 1, name: 'Apollo Hospital', address: 'Plot 10, Sector 23', distance: '2.5 km' },
    { id: 2, name: 'Fortis Escorts', address: 'Okhla Road', distance: '4.1 km' },
    { id: 3, name: 'Max Super Speciality', address: 'Saket', distance: '5.8 km' },
    { id: 4, name: 'AIIMS Delhi', address: 'Ansari Nagar', distance: '8.2 km' },
    { id: 5, name: 'City Care Hospital', address: 'Main Market', distance: '1.2 km' },
];

const AMBULANCE_TYPES = [
    { id: 'Bike', name: 'Bike Ambulance', eta: '4 min', icon: '🏍️', desc: 'First Responder' },
    { id: 'Auto', name: 'Auto Ambulance', eta: '8 min', icon: '🛺', desc: 'Low cost transport' },
    { id: 'Car', name: 'Car Ambulance', eta: '10 min', icon: '🚐', desc: 'Patient Transport' },
    { id: 'Ambulance', name: 'Emergency Ambulance', eta: '12 min', icon: '🚑', desc: 'BLS/ALS Equipped' },
];

export default function AmbulanceRequest() {
    const { location, latitude, longitude } = useLocation();
    const { user } = useAuth();
    const { isCartOpen } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    
    // Default flow starts at 'vehicle' now
    const [step, setStep] = useState('vehicle'); // 'hospital' | 'vehicle' | 'success'
    const [selectedHospital, setSelectedHospital] = useState(null); // null means 'Nearest Hospital'
    const [selectedType, setSelectedType] = useState(AMBULANCE_TYPES[3]); // Default to Ambulance
    const [searchQuery, setSearchQuery] = useState('');
    const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
    
    const [pickupAddress, setPickupAddress] = useState(location || '');
    
    useEffect(() => {
        if (latitude && longitude) {
            setMapCenter({ lat: latitude, lng: longitude });
        }
    }, [latitude, longitude]);

    useEffect(() => {
        if (location && pickupAddress === '') {
             setPickupAddress(location);
        }
    }, [location]);

    // Ensure we always start at vehicle selection when opening
    useEffect(() => {
        if (isOpen) {
            setStep('vehicle');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleHospitalSelect = (hospital) => {
        setSelectedHospital(hospital);
        setStep('vehicle');
    };

    const handleRequest = async () => {
        if (!user) {
            alert('Please login to request an ambulance.');
            return;
        }

        try {
            const apiUrl = getApiUrl();
            const res = await fetch(`${apiUrl}/api/ambulance/request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userPhone: user.phone,
                    pickupLat: latitude || 0,
                    pickupLng: longitude || 0,
                    pickupAddress: pickupAddress || location || 'Unknown Location',
                    dropAddress: selectedHospital?.name || 'Nearest Hospital',
                    type: selectedType.id
                })
            });

            if (res.ok) {
                setStep('success');
            } else {
                alert('Failed to request ambulance');
            }
        } catch (err) {
            console.error(err);
            alert('Network error');
        }
    };

    const resetFlow = () => {
        setStep('vehicle');
        setSelectedHospital(null);
        setSearchQuery('');
        setIsOpen(false);
    };

    if (!isOpen) {
        if (isCartOpen) return null;
        return (
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    width: 'auto',
                    minWidth: '48px',
                    height: '48px',
                    padding: '0 16px',
                    borderRadius: '24px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                    cursor: 'pointer',
                    zIndex: 5000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.2s',
                    animation: 'pulse 2s infinite'
                }}
                onMouseOver={e => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.padding = '0 20px';
                }}
                onMouseOut={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.padding = '0 16px';
                }}
            >
                <Ambulance size={20} />
                <span style={{ whiteSpace: 'nowrap' }}>Request Ambulance</span>
            </button>
        );
    }

    const filteredHospitals = HOSPITALS.filter(h => 
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        h.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease-out'
        }} onClick={resetFlow}>
            <div 
                onClick={e => e.stopPropagation()}
                className="ambulance-modal-container"
                style={{
                    background: '#fff',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    fontFamily: 'var(--font-outfit)',
                    animation: 'slideUp 0.3s ease-out',
                    position: 'relative'
                }}
            >
                <button 
                    onClick={resetFlow}
                    className="modal-close-btn"
                    style={{
                        position: 'absolute',
                        top: '16px',
                        left: '20px',
                        zIndex: 20,
                        background: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}
                >
                    <X size={20} color="#374151" />
                </button>

                {/* LEFT PANEL: CONTROLS */}
                <div className="left-panel">
                    
                    {step === 'hospital' && (
                        <>
                            <div 
                                onClick={() => setStep('vehicle')}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', cursor: 'pointer', color: '#6b7280', fontSize: '14px' }}
                             >
                                <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back
                             </div>
                            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#111827' }}>Select Hospital</h2>
                            
                            <div style={{ position: 'relative', marginBottom: '24px' }}>
                                <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                                <input 
                                    type="text" 
                                    placeholder="Search by hospital name" 
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    autoFocus
                                    style={{
                                        width: '100%',
                                        padding: '16px 16px 16px 48px',
                                        borderRadius: '12px',
                                        border: '1px solid #e5e7eb',
                                        fontSize: '16px',
                                        background: '#f9fafb',
                                        outline: 'none',
                                        transition: 'all 0.2s'
                                    }}
                                />
                            </div>

                            <div style={{ flex: 1, overflowY: 'auto', marginRight: '-12px', paddingRight: '12px' }}>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '12px' }}>NEARBY LOCATIONS</div>
                                <div 
                                    onClick={() => handleHospitalSelect(null)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        padding: '16px 0',
                                        borderBottom: '1px solid #f3f4f6',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ background: '#f3f4f6', padding: '10px', borderRadius: '50%' }}>
                                        <Building2 size={24} color="#1f2937" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600', fontSize: '16px', color: '#111827' }}>Nearest Hospital</div>
                                        <div style={{ fontSize: '14px', color: '#6b7280' }}>Automatic assignment</div>
                                    </div>
                                    <ChevronRight size={16} color="#9ca3af" />
                                </div>
                                {filteredHospitals.map(hospital => (
                                    <div 
                                        key={hospital.id}
                                        onClick={() => handleHospitalSelect(hospital)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                            padding: '16px 0',
                                            borderBottom: '1px solid #f3f4f6',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div style={{ background: '#f3f4f6', padding: '10px', borderRadius: '50%' }}>
                                            <Building2 size={24} color="#1f2937" />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '600', fontSize: '16px', color: '#111827' }}>{hospital.name}</div>
                                            <div style={{ fontSize: '14px', color: '#6b7280' }}>{hospital.address} • {hospital.distance}</div>
                                        </div>
                                        <ChevronRight size={16} color="#9ca3af" />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {step === 'vehicle' && (
                        <>
                             <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#111827' }}>Choose a ride</h2>
                             
                             {/* Location Summary Box */}
                             <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                    <div style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }}></div>
                                    <input
                                        type="text"
                                        value={pickupAddress}
                                        onChange={(e) => setPickupAddress(e.target.value)}
                                        placeholder="Enter Pickup Location"
                                        style={{
                                            border: 'none',
                                            background: 'transparent',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            width: '100%',
                                            outline: 'none',
                                            color: '#111827'
                                        }}
                                    />
                                </div>
                                <div style={{ height: '24px', borderLeft: '2px dashed #d1d5db', marginLeft: '3px', margin: '-8px 0' }}></div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                                    <div style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></div>
                                    <div style={{ flex: 1, fontSize: '14px', fontWeight: '600' }}>{selectedHospital ? selectedHospital.name : 'Nearest Hospital'}</div>
                                    <button 
                                        onClick={() => setStep('hospital')}
                                        style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                                    >
                                        Change
                                    </button>
                                </div>
                             </div>

                             <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
                                {AMBULANCE_TYPES.map(type => (
                                    <div 
                                        key={type.id}
                                        onClick={() => setSelectedType(type)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                            padding: '16px',
                                            borderRadius: '12px',
                                            border: selectedType.id === type.id ? '2px solid #111827' : '1px solid #fff',
                                            background: selectedType.id === type.id ? '#f9fafb' : '#fff',
                                            cursor: 'pointer',
                                            marginBottom: '8px',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ fontSize: '32px' }}>{type.icon}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ fontWeight: '700', fontSize: '16px' }}>{type.name}</div>
                                                <div style={{ fontSize: '12px', background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>{type.eta}</div>
                                            </div>
                                            <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>{type.desc}</div>
                                        </div>
                                        {/* Price removed as per request */}
                                    </div>
                                ))}
                             </div>

                             <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'start', marginBottom: '16px' }}>
                                <AlertTriangle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <div style={{ fontSize: '12px', color: '#4b5563' }}>
                                    <span style={{ fontWeight: '700', color: '#ef4444' }}>Warning:</span> Fake or non-emergency timepass bookings will be charged a penalty of <span style={{ fontWeight: '700' }}>₹600</span>.
                                </div>
                             </div>

                             <button 
                                onClick={handleRequest}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    background: '#111827',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: '700',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    display: 'flex', 
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                Request {selectedType.name.split(' ')[0]}
                            </button>
                        </>
                    )}

                    {step === 'success' && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                                <Ambulance size={40} color="#22c55e" />
                            </div>
                            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px', color: '#111827' }}>Ambulance on the way!</h2>
                            <p style={{ color: '#6b7280', marginBottom: '32px' }}>
                                Your ambulance has been dispatched to <b>{location}</b> for <b>{selectedHospital?.name || 'Nearest Hospital'}</b>.
                            </p>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', padding: '16px', background: '#f9fafb', borderRadius: '12px', marginBottom: '24px' }}>
                                <div style={{ width: '40px', height: '40px', background: '#e5e7eb', borderRadius: '50%' }}></div>
                                <div style={{ textAlign: 'left', flex: 1 }}>
                                    <div style={{ fontWeight: '600' }}>Ramesh Kumar</div>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>MH 04 AB 1234 • 4.8 ★</div>
                                </div>
                                <button style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <Phone size={18} color="#111827" />
                                </button>
                            </div>

                            <button 
                                onClick={resetFlow}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    background: '#f3f4f6',
                                    color: '#1f2937',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Close
                            </button>
                        </div>
                    )}

                </div>

                {/* RIGHT PANEL: MAP */}
                <div className="right-panel">
                    <LeafletMap center={mapCenter} zoom={15} />
                    {/* Overlay gradient for Uber look */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)', zIndex: 400, pointerEvents: 'none' }}></div>
                </div>

                <style jsx>{`
                    .modal-close-btn:hover {
                        background: #f3f4f6 !important;
                    }
                    
                    @keyframes slideUp {
                        from { transform: translateY(100%); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }

                    @keyframes zoomIn {
                        from { transform: scale(0.95); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }

                    /* Base Styles (Shared) */
                    .ambulance-modal-container {
                        background: #fff;
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                    }

                    /* Desktop Styles */
                    @media (min-width: 768px) {
                        .ambulance-modal-container {
                            width: 95%;
                            max-width: 1000px;
                            height: 85vh;
                            min-height: 600px;
                            border-radius: 16px;
                            display: grid;
                            grid-template-columns: 380px 1fr;
                            animation: zoomIn 0.3s ease-out !important;
                        }

                        .left-panel {
                            height: 100%;
                            border-right: 1px solid #f3f4f6;
                            overflow-y: auto;
                            padding: 24px;
                            padding-top: 40px;
                        }
                        
                        .right-panel {
                            height: 100%;
                            order: 0;
                        }
                        
                        .modal-close-btn {
                            display: flex;
                            top: 20px;
                            left: 20px;
                        }
                    }

                    /* Mobile Styles */
                    @media (max-width: 768px) {
                        .ambulance-modal-container {
                            width: 100%;
                            height: 90vh; /* Bottom sheet height */
                            border-radius: 20px 20px 0 0;
                            align-self: flex-end; /* Push to bottom */
                        }
                        
                        .left-panel {
                            padding: 20px;
                            padding-top: 60px; /* Space for close button */
                            overflow-y: auto;
                            flex: 1;
                        }

                        .right-panel {
                            height: 250px;
                            flex-shrink: 0;
                            order: 1; /* Map at bottom? Or top? Let's keep at bottom for now or it pushes content too far */
                        }
                        
                        .modal-close-btn {
                            display: flex; /* Show on mobile now */
                            top: 16px;
                            right: 16px; /* Move to right for easier thumb reach */
                            left: auto;
                            z-index: 50;
                            background: #f3f4f6;
                        }
                    }
                `}</style>
            </div>
             {/* Mobile specific close button if needed, but the main one inside relative container works */}
        </div>
    );
}

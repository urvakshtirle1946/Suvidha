'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ShieldCheck, Calendar, CheckCircle, LayoutDashboard, Building2, Users, LogOut, Menu, Activity, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const params = useParams();
  const [bookings, setBookings] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const adminPathParam = params?.adminPath;
  const basePath = adminPathParam ? `/${adminPathParam}` : '';

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    // setLoading(true); // Don't set loading on poll to avoid flicker
    try {
      const [resBookings, resHospitals] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/bookings`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/hospitals`)
      ]);

      if (resBookings.ok) {
        const data = await resBookings.json();
        setBookings(data);
      }
      if (resHospitals.ok) {
        setHospitals(await resHospitals.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(false);
    }
  };

  // --- Real-time Stats Calculations ---
  
  // 1. Total Bookings Today
  const today = new Date().toISOString().split('T')[0];
  const todaysBookings = bookings.filter(b => {
      // Handle both date strings and ISO timestamps if DB returns them
      const bDate = b.booking_date ? new Date(b.booking_date).toISOString().split('T')[0] : '';
      return bDate === today;
  }).length;

  // 2. Revenue
  const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.price || 0), 0);
  const commission = Math.floor(totalRevenue * 0.1); 

  // 3. Top Hospitals (by Booking Volume)
  const hospitalStats = {};
  bookings.forEach(b => {
      // Use hospital_name joined from backend, or fallback
      const name = b.hospital_name || 'Unknown Hospital';
      if (!hospitalStats[name]) hospitalStats[name] = 0;
      hospitalStats[name] += Number(b.price || 0);
  });
  
  // Convert to array and sort
  const topHospitals = Object.entries(hospitalStats)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);


  // Premium Dark Card Style
  const cardStyle = {
    background: 'rgba(30, 41, 59, 0.4)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  };

  const btnPrimaryStyle = {
    display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', textDecoration: 'none',
    background: 'linear-gradient(135deg, #00d2d3 0%, #2e86de 100%)',
    color: '#fff', border: 'none', boxShadow: '0 4px 12px rgba(0, 210, 211, 0.3)'
  };

  const btnOutlineStyle = {
    display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', textDecoration: 'none',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#cbd5e1',
    transition: 'all 0.2s'
  };

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dashboard Overview</h1>
              <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Real-time platform insights.</p>
            </div>
            <button className="btn" onClick={fetchData} style={btnOutlineStyle}>
              <Activity size={18} style={{ marginRight: '8px' }} /> Refresh Data
            </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <StatCard title="Total Bookings Today" value={todaysBookings} icon={<Calendar color="#00d2d3" />} cardStyle={cardStyle} />
            <StatCard title="Total Bookings (All Time)" value={bookings.length} icon={<TrendingUp color="#3498db" />} cardStyle={cardStyle} />
            <StatCard title="Active Hospitals" value={hospitals.length} icon={<Building2 color="#f1c40f" />} cardStyle={cardStyle} />
            <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={<CheckCircle color="#2ecc71" />} cardStyle={cardStyle} />
            <StatCard title="Commission Earned" value={`₹${commission.toLocaleString()}`} icon={<ShieldCheck color="#e67e22" />} cardStyle={cardStyle} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            {/* Quick Actions */}
            <div style={{ ...cardStyle, padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', color: '#fff' }}>Quick Actions</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <Link href={`${basePath}/hospitals`} className="btn" style={btnPrimaryStyle}>+ Add Hospital</Link>
                    <Link href={`${basePath}/hospitals`} className="btn" style={btnOutlineStyle}>View Hospitals</Link>
                    <Link href={`${basePath}/bookings`} className="btn" style={btnOutlineStyle}>View Bookings</Link>
                    <Link href={`${basePath}/users`} className="btn" style={{ ...btnOutlineStyle, color: '#00d2d3', borderColor: 'rgba(0, 210, 211, 0.3)' }}>User Management</Link>
                </div>
            </div>

            {/* Top Hospitals */}
            <div style={{ ...cardStyle, padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', color: '#fff' }}>Top Hospitals (Revenue)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {topHospitals.length > 0 ? topHospitals.map((h, i) => (
                        <HospitalRow key={i} name={h.name} amount={h.amount.toLocaleString()} />
                    )) : (
                        <div style={{ color: '#94a3b8', fontStyle: 'italic' }}>No data available</div>
                    )}
                </div>
            </div>
        </div>

        <h2 style={{ marginBottom: '1.5rem', color: '#fff' }}>Recent Bookings</h2>
        {/* Table */}
        <div style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                            <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>ID</th>
                            <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Patient</th>
                            <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Service</th>
                            <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Date</th>
                            <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Price</th>
                            <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Status</th>
                            <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.slice(0, 5).map((booking) => (
                            <tr key={booking.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="hover:bg-white/5">
                                <td style={{ padding: '1rem', color: '#64748b' }}>#{booking.id}</td>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{booking.patient_name}</td>
                                <td style={{ padding: '1rem' }}>{booking.service_name}</td>
                                <td style={{ padding: '1rem', color: '#94a3b8' }}>{new Date(booking.booking_date).toLocaleDateString()}</td>
                                <td style={{ padding: '1rem', fontWeight: 'bold', color: '#fff' }}>₹{booking.price}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ 
                                        padding: '4px 12px', 
                                        borderRadius: '20px', 
                                        fontSize: '0.75rem',
                                        background: booking.status === 'Completed' ? 'rgba(46, 204, 113, 0.15)' : 
                                                    booking.status === 'Cancelled' ? 'rgba(231, 76, 60, 0.15)' : 'rgba(0, 210, 211, 0.15)',
                                        color: booking.status === 'Completed' ? '#2ecc71' : 
                                               booking.status === 'Cancelled' ? '#f87171' : '#00d2d3',
                                        border: booking.status === 'Completed' ? '1px solid rgba(46, 204, 113, 0.2)' : 
                                                booking.status === 'Cancelled' ? '1px solid rgba(231, 76, 60, 0.2)' : '1px solid rgba(0, 210, 211, 0.2)'
                                    }}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <Link href={`${basePath}/bookings`} style={{ color: '#00d2d3', fontSize: '0.85rem', textDecoration: 'none', fontWeight: '500' }}>View Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {bookings.length === 0 && (
                    <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                        <div style={{ marginBottom: '1rem', opacity: 0.5 }}><Calendar size={48} /></div>
                        No bookings found.
                    </div>
                )}
            </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, cardStyle }) {
    return (
        <div style={{ ...cardStyle, padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </div>
            <div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '4px' }}>{title}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>{value}</div>
            </div>
        </div>
    );
}

function HospitalRow({ name, amount }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem', paddingBottom: '0.8rem', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00d2d3' }}></div>
                <span style={{ color: '#e2e8f0' }}>{name}</span>
            </div>
            <span style={{ color: '#00d2d3', fontWeight: '600' }}>₹{amount}</span>
        </div>
    );
}

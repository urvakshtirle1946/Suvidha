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
        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <WhiteStatCard title="Peak activity hours" value="10:00-12:30" sub="PM" color="var(--text-primary)" />
            <WhiteStatCard title="Total patients" value={hospitals.length * 124 + bookings.length} sub="+13% vs last month" chartColor="var(--accent)" />
            <WhiteStatCard title="Avg hospital rating" value="4.9" sub="654 reviews" color="#f1c40f" badge={true} />
            <WhiteStatCard title="Total Revenue" value={`₹${(totalRevenue/1000).toFixed(1)}k`} sub="Gross Income" color="var(--accent)" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            
            {/* Chart Section */}
            <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Patients Statistics</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ position: 'relative' }}>
                            <select style={{ 
                                appearance: 'none',
                                padding: '8px 32px 8px 14px', 
                                borderRadius: '10px', 
                                border: '1px solid var(--border)', 
                                color: 'var(--text-secondary)', 
                                outline: 'none',
                                background: 'var(--bg-primary) url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E") no-repeat right 12px center',
                                backgroundSize: '10px',
                                fontSize: '0.85rem',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}>
                                <option>Recovered</option>
                                <option>Pending</option>
                                <option>New</option>
                            </select>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <select style={{ 
                                appearance: 'none',
                                padding: '8px 32px 8px 14px', 
                                borderRadius: '10px', 
                                border: '1px solid var(--border)', 
                                color: 'var(--text-secondary)', 
                                outline: 'none',
                                background: 'var(--bg-primary) url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E") no-repeat right 12px center',
                                backgroundSize: '10px',
                                fontSize: '0.85rem',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}>
                                <option>Month</option>
                                <option>Week</option>
                                <option>Year</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                {/* CSS Bar Chart Visual */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', paddingBottom: '10px' }}>
                    <Bar height="40%" label="Jan" />
                    <Bar height="60%" label="Feb" color="var(--chart-bar)" />
                    <Bar height="30%" label="Mar" />
                    <Bar height="55%" label="Apr" />
                    <Bar height="80%" label="May" />
                    <Bar height="95%" label="Jun" active={true} />
                    <Bar height="45%" label="Jul" />
                    <Bar height="65%" label="Aug" />
                    <Bar height="85%" label="Sep" />
                    <Bar height="30%" label="Oct" />
                    <Bar height="20%" label="Nov" />
                </div>
            </div>

            {/* Quick Actions / Working Hours */}
            <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                 <h3 style={{ alignSelf: 'flex-start', fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Quick Actions</h3>
                 
                 <Link href={`${basePath}/hospitals`} style={{ width: '100%', marginBottom: '1rem', textDecoration: 'none' }}>
                    <button style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'var(--accent)', color: 'var(--accent-text)', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                        + Add Hospital
                    </button>
                 </Link>
                 
                 <div style={{ position: 'relative', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '12px solid var(--bg-primary)', borderTop: '12px solid var(--accent)', borderRight: '12px solid #ff9ff3', transform: 'rotate(-45deg)' }}></div>
                     <div style={{ position: 'absolute', textAlign: 'center' }}>
                         <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{hospitals.length}</div>
                         <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Hospitals</div>
                     </div>
                 </div>
            </div>
        </div>

        {/* Appointments Table */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '2rem', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Appointment</h3>
                <div style={{ position: 'relative' }}>
                     <select style={{ 
                        appearance: 'none',
                        padding: '6px 30px 6px 14px', 
                        borderRadius: '8px', 
                        border: 'none', 
                        background: 'var(--bg-primary) url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E") no-repeat right 10px center',
                        backgroundSize: '8px',
                        color: 'var(--text-secondary)', 
                        fontSize: '0.9rem',
                        outline: 'none',
                        cursor: 'pointer',
                        fontWeight: '500'
                     }}>
                        <option>Status</option>
                        <option>All</option>
                        <option>Upcoming</option>
                        <option>Completed</option>
                     </select>
                </div>
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: '0.8rem', borderBottom: '1px solid var(--border)' }}>
                        <th style={{ paddingBottom: '1rem', fontWeight: '500' }}>Name</th>
                        <th style={{ paddingBottom: '1rem', fontWeight: '500' }}>Status</th>
                        <th style={{ paddingBottom: '1rem', fontWeight: '500' }}>Date</th>
                        <th style={{ paddingBottom: '1rem', fontWeight: '500' }}>Time</th>
                        <th style={{ paddingBottom: '1rem', fontWeight: '500' }}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.slice(0, 5).map((booking, i) => (
                        <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                            <td style={{ padding: '1rem 0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-primary)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                        {booking.patient_name ? booking.patient_name.substring(0,2).toUpperCase() : 'Guest'}
                                    </div>
                                    <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{booking.patient_name || 'Guest User'}</span>
                                </div>
                            </td>
                            <td>
                                <span style={{ 
                                    padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600',
                                    background: booking.status === 'Completed' ? '#e8f5e9' : 'rgba(94, 129, 244, 0.1)',
                                    color: booking.status === 'Completed' ? '#2e7d32' : 'var(--accent)'
                                }}>
                                    {booking.status === 'Completed' ? 'Completed' : 'Upcoming'}
                                </span>
                            </td>
                            <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{new Date(booking.booking_date).toLocaleDateString()}</td>
                            <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{booking.time || '10:00 AM'}</td>
                            <td style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                                <CheckCircle size={14} color="#2ecc71" style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
                                Paid
                            </td>
                        </tr>
                    ))}
                    {bookings.length === 0 && (
                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No active appointments</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
}

function WhiteStatCard({ title, value, sub, color, chartColor, badge }) {
    return (
        <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', position: 'relative', border: '1px solid var(--border)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                 <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>{title}</span>
                 {badge && <span style={{ background: '#fff9c4', color: '#fbc02d', padding: '2px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 'bold' }}>654 reviews</span>}
             </div>
             
             <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                 <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>{value}</h2>
                 <span style={{ fontSize: '1rem', color: color || 'var(--text-secondary)', fontWeight: '500' }}>{sub}</span>
             </div>
        </div>
    );
}

function Bar({ height, label, active, color }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', height: '100%', justifySelf: 'stretch', flex: 1 }}>
            {active && <div style={{ background: 'var(--chart-active)', color: 'var(--accent-text)', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '6px', marginBottom: 'auto', fontWeight: 'bold' }}>112 recovered</div>}
            <div style={{ 
                width: '30px', 
                height: height, 
                background: active ? 'var(--chart-active)' : 'var(--chart-bar)', 
                borderRadius: '8px 8px 0 0',
                marginTop: 'auto' 
            }}></div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{label}</span>
        </div>
    );
}

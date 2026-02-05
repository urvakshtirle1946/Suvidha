'use client';
import { useState, useEffect } from 'react';
import { Calendar, Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/bookings`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
      try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/bookings/${id}/status`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: newStatus })
          });

          if (res.ok) {
               // Optimistic update or refetch
               setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
               alert(`Booking #${id} updated to ${newStatus}`);
          } else {
              alert('Failed to update status');
          }
      } catch (err) {
          console.error(err);
          alert('Error updating status');
      }
  };

  const filteredBookings = bookings.filter(b => {
      const matchesSearch = b.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            b.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            b.id.toString().includes(searchTerm);
      const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
      return matchesSearch && matchesStatus;
  });

  // Premium Dark Styles
  const cardStyle = {
    background: 'rgba(30, 41, 59, 0.4)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  const searchInputStyle = {
    background: 'transparent', border: 'none', color: '#fff', 
    flex: 1, outline: 'none', fontSize: '0.95rem'
  };

  return (
    <div>
        <div style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Bookings Management</h1>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Track and manage patient appointments.</p>
        </div>

        {/* Filters */}
        <div style={{ ...cardStyle, padding: '1rem', display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '240px', background: 'rgba(255,255,255,0.03)', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Search size={20} style={{ color: '#64748b' }} />
                <input 
                    type="text" 
                    placeholder="Search by ID, Patient, or Service..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={searchInputStyle} 
                />
            </div>
            
            <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)', margin: '0 10px' }}></div>
            
            <div style={{ display: 'flex', gap: '0.8rem' }}>
                {['All', 'Confirmed', 'Completed', 'Cancelled'].map(status => (
                    <button 
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '12px',
                            border: statusFilter === status ? '1px solid rgba(0, 210, 211, 0.5)' : '1px solid transparent',
                            background: statusFilter === status ? 'rgba(0, 210, 211, 0.1)' : 'rgba(255,255,255,0.03)',
                            color: statusFilter === status ? '#00d2d3' : '#94a3b8',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: statusFilter === status ? '600' : '400',
                            transition: 'all 0.2s'
                        }}
                    >
                        {status}
                    </button>
                ))}
            </div>
        </div>

        {/* Table */}
        <div style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>ID</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Patient Details</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Service Info</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Schedule</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Amount</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Status</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking) => (
                            <tr key={booking.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="hover:bg-white/5">
                                <td style={{ padding: '1.2rem 1.5rem', color: '#64748b', fontSize: '0.9rem' }}>#{booking.id}</td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <div style={{ fontWeight: '600', color: '#f8fafc', marginBottom: '4px' }}>{booking.patient_name}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        {booking.user_phone}
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem', color: '#e2e8f0' }}>{booking.service_name}</td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#e2e8f0' }}>
                                        <Calendar size={14} className="text-muted" /> {new Date(booking.booking_date).toLocaleDateString()}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Clock size={14} /> {booking.booking_time}
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem', fontWeight: 'bold', color: '#fff' }}>₹{booking.price}</td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <span style={{ 
                                        padding: '6px 14px', 
                                        borderRadius: '20px', 
                                        fontSize: '0.8rem',
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
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                        <button onClick={() => updateStatus(booking.id, 'Completed')} title="Mark Complete" className="action-btn" style={{ background: 'rgba(46, 204, 113, 0.1)', border: '1px solid rgba(46, 204, 113, 0.2)', cursor: 'pointer', color: '#2ecc71', padding: '8px', borderRadius: '8px' }}><CheckCircle size={18} /></button>
                                        <button onClick={() => updateStatus(booking.id, 'Cancelled')} title="Cancel Booking" className="action-btn" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', cursor: 'pointer', color: '#f87171', padding: '8px', borderRadius: '8px' }}><XCircle size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredBookings.length === 0 && !loading && (
                    <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
                        <div style={{ marginBottom: '1rem', opacity: 0.5 }}><Calendar size={48} /></div>
                        No bookings found matching filters.
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

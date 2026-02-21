'use client';
import { useState, useEffect } from 'react';
import { Calendar, Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const { addToast } = useToast();

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://suvidha-server-4u66.onrender.com'}/api/bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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
          const token = localStorage.getItem('admin_token');
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://suvidha-server-4u66.onrender.com'}/api/bookings/${id}/status`, {
              method: 'PATCH',
              headers: { 
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ status: newStatus })
          });

          if (res.ok) {
               // Optimistic update or refetch
               setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
               addToast(`Booking #${id} updated to ${newStatus}`, 'success');
          } else {
              addToast('Failed to update status', 'error');
          }
      } catch (err) {
          console.error(err);
          addToast('Error updating status', 'error');
      }
  };

  const filteredBookings = bookings.filter(b => {
      const matchesSearch = b.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            b.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            b.id.toString().includes(searchTerm);
      const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
      return matchesSearch && matchesStatus;
  });

  // Light & Clean Styles matching Dashboard
  const cardStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)'
  };

  const searchInputStyle = {
    background: 'transparent', border: 'none', color: 'var(--text-primary)', 
    flex: 1, outline: 'none', fontSize: '0.95rem'
  };

  return (
    <div>
        <div style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>Bookings Management</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Track and manage patient appointments.</p>
        </div>

        {/* Filters */}
        <div style={{ ...cardStyle, padding: '1rem', display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '240px', background: 'var(--bg-primary)', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <Search size={20} style={{ color: 'var(--text-secondary)' }} />
                <input 
                    type="text" 
                    placeholder="Search by ID, Patient, or Service..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={searchInputStyle} 
                />
            </div>
            
            <div style={{ width: '1px', height: '30px', background: 'var(--border)', margin: '0 10px' }}></div>
            
            <div style={{ display: 'flex', gap: '0.8rem' }}>
                {['All', 'Confirmed', 'Completed', 'Cancelled'].map(status => (
                    <button 
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '12px',
                            border: statusFilter === status ? '1px solid transparent' : '1px solid var(--border)',
                            background: statusFilter === status ? 'var(--accent)' : 'transparent',
                            color: statusFilter === status ? 'var(--accent-text)' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: statusFilter === status ? '600' : '500',
                            transition: 'all 0.2s',
                            boxShadow: statusFilter === status ? '0 4px 10px rgba(0, 210, 211, 0.2)' : 'none'
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
                        <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>ID</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Patient Details</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Service Info</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Schedule</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Amount</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking) => (
                            <tr key={booking.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>#{booking.id}</td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>{booking.patient_name}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        {booking.user_phone}
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>{booking.service_name}</td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: 'var(--text-primary)' }}>
                                        <Calendar size={14} className="text-gray-400" /> {new Date(booking.booking_date).toLocaleDateString()}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Clock size={14} /> {booking.booking_time}
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>₹{booking.price}</td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <select 
                                        value={booking.status}
                                        onChange={(e) => updateStatus(booking.id, e.target.value)}
                                        style={{ 
                                            padding: '6px 14px', 
                                            borderRadius: '20px', 
                                            fontSize: '0.8rem',
                                            cursor: 'pointer',
                                            outline: 'none',
                                            background: booking.status === 'Completed' ? 'rgba(46, 204, 113, 0.15)' : 
                                                        booking.status === 'Cancelled' ? 'rgba(231, 76, 60, 0.15)' : 'rgba(0, 210, 211, 0.15)',
                                            color: booking.status === 'Completed' ? '#2ecc71' : 
                                                   booking.status === 'Cancelled' ? '#f87171' : '#00d2d3',
                                            border: booking.status === 'Completed' ? '1px solid rgba(46, 204, 113, 0.2)' : 
                                                    booking.status === 'Cancelled' ? '1px solid rgba(231, 76, 60, 0.2)' : '1px solid rgba(0, 210, 211, 0.2)'
                                        }}
                                    >
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="Pending">Pending</option>
                                    </select>
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
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <div style={{ marginBottom: '1rem', opacity: 0.5 }}><Calendar size={48} /></div>
                        No bookings found matching filters.
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

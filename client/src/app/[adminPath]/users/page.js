'use client';
import { useState, useEffect } from 'react';
import { User, Search, Shield, ShieldOff, Eye } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    fetchUsers();
    // Poll every 5 seconds for real-time updates
    const interval = setInterval(() => {
      fetchUsers();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://suvidha-server-4u66.onrender.com'}/api/auth/users`);
      if (res.ok) {
        const data = await res.json();
        const mappedUsers = data.map(u => ({
           id: u.id,
           name: u.name || 'User',
           phone: u.phone,
           location: u.location || 'Unknown',
           bookings: u.booking_count || 0,
           status: 'Active',
           joined: u.created_at
        }));
        setUsers(mappedUsers);
      }
    } catch (err) {
      console.error(err);
      addToast('Error fetching users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleBlock = (id) => {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u));
      addToast('User status updated', 'success');
  };

  const filteredUsers = users.filter(u => 
     u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     u.phone.includes(searchTerm)
  );

  // Light & Clean Styles
  const cardStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)'
  };

  return (
    <div>
        <div style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>User Management</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Overview of registered patient accounts.</p>
        </div>

        {/* Search */}
        <div style={{ ...cardStyle, padding: '1.2rem', display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
            <Search size={20} style={{ color: 'var(--text-secondary)' }} />
            <input 
                type="text" 
                placeholder="Search users by name or phone..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', flex: 1, outline: 'none', fontSize: '1rem' }} 
            />
        </div>

        {/* Table */}
        <div style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>User</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Phone</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Location</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase', textAlign: 'center' }}>Total Bookings</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Joined</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ 
                                            width: '36px', height: '36px', borderRadius: '50%', 
                                            background: 'linear-gradient(135deg, #00d2d3 0%, #2e86de 100%)', 
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                        }}>
                                            <User size={18} color="#fff" />
                                        </div>
                                        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{user.name}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)' }}>{user.phone}</td>
                                <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)' }}>{user.location}</td>
                                <td style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: 'bold', color: 'var(--text-primary)' }}>{user.bookings}</td>
                                <td style={{ padding: '1.2rem 1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{new Date(user.joined).toLocaleDateString()}</td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <span style={{ 
                                        padding: '5px 12px', 
                                        borderRadius: '20px', 
                                        fontSize: '0.8rem',
                                        background: user.status === 'Active' ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)',
                                        color: user.status === 'Active' ? '#2ecc71' : '#f87171',
                                        border: user.status === 'Active' ? '1px solid rgba(46, 204, 113, 0.2)' : '1px solid rgba(231, 76, 60, 0.2)',
                                        fontWeight: '500'
                                    }}>
                                        {user.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                        <button title="View History" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-secondary)', padding: '8px', borderRadius: '8px' }}><Eye size={18} /></button>
                                        <button 
                                            onClick={() => toggleBlock(user.id)}
                                            title={user.status === 'Active' ? 'Block User' : 'Unblock User'} 
                                            style={{ 
                                                background: user.status === 'Active' ? 'rgba(231, 76, 60, 0.1)' : 'rgba(46, 204, 113, 0.1)', 
                                                border: user.status === 'Active' ? '1px solid rgba(231, 76, 60, 0.2)' : '1px solid rgba(46, 204, 113, 0.2)', 
                                                cursor: 'pointer', 
                                                color: user.status === 'Active' ? '#f87171' : '#2ecc71', 
                                                padding: '8px', 
                                                borderRadius: '8px' 
                                            }}
                                        >
                                            {user.status === 'Active' ? <ShieldOff size={18} /> : <Shield size={18} />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                         <div style={{ marginBottom: '1rem', opacity: 0.5 }}><Search size={40} /></div>
                         No users found matching your search.
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

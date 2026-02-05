'use client';
import { useState, useEffect } from 'react';
import { User, Search, Shield, ShieldOff, Eye } from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/users`);
      if (res.ok) {
        const data = await res.json();
        // Map DB fields to UI
        const mappedUsers = data.map(u => ({
           id: u.id,
           name: u.name || 'User', // Name might be null if we only capture phone
           phone: u.phone,
           location: u.location || 'Unknown', // Location might be null
           bookings: u.booking_count || 0,
           status: 'Active', // Default status for now
           joined: u.created_at
        }));
        setUsers(mappedUsers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleBlock = (id) => {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u));
  };

  const filteredUsers = users.filter(u => 
     u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     u.phone.includes(searchTerm)
  );

  // Premium Dark Styles
  const cardStyle = {
    background: 'rgba(30, 41, 59, 0.4)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div>
        <div style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>User Management</h1>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Overview of registered patient accounts.</p>
        </div>

        {/* Search */}
        <div style={{ ...cardStyle, padding: '1.2rem', display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
            <Search size={20} style={{ color: '#64748b' }} />
            <input 
                type="text" 
                placeholder="Search users by name or phone..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#fff', flex: 1, outline: 'none', fontSize: '1rem' }} 
            />
        </div>

        {/* Table */}
        <div style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>User</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Phone</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Location</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem', textAlign: 'center' }}>Total Bookings</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Joined</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Status</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="hover:bg-white/5">
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ 
                                            width: '36px', height: '36px', borderRadius: '50%', 
                                            background: 'linear-gradient(135deg, #00d2d3 0%, #2e86de 100%)', 
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                        }}>
                                            <User size={18} color="#fff" />
                                        </div>
                                        <span style={{ fontWeight: '600', color: '#f8fafc' }}>{user.name}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem', color: '#cbd5e1' }}>{user.phone}</td>
                                <td style={{ padding: '1.2rem 1.5rem', color: '#94a3b8' }}>{user.location}</td>
                                <td style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: 'bold', color: '#fff' }}>{user.bookings}</td>
                                <td style={{ padding: '1.2rem 1.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>{new Date(user.joined).toLocaleDateString()}</td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <span style={{ 
                                        padding: '5px 12px', 
                                        borderRadius: '20px', 
                                        fontSize: '0.8rem',
                                        background: user.status === 'Active' ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)',
                                        color: user.status === 'Active' ? '#2ecc71' : '#f87171',
                                        border: user.status === 'Active' ? '1px solid rgba(46, 204, 113, 0.2)' : '1px solid rgba(231, 76, 60, 0.2)'
                                    }}>
                                        {user.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                        <button title="View History" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', color: '#cbd5e1', padding: '8px', borderRadius: '8px' }}><Eye size={18} /></button>
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
                    <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
                         <div style={{ marginBottom: '1rem', opacity: 0.5 }}><Search size={40} /></div>
                         No users found matching your search.
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

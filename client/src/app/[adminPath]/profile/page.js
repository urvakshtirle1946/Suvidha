'use client';
import { useState, useEffect } from 'react';
import { User, Lock, Save, Shield, Key, Mail } from 'lucide-react';

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: 'Super Admin',
    email: 'admin@suvidha.com',
    role: 'Super Administrator',
    phone: '+91 99999 99999'
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Mock list of other admins
  const [team, setTeam] = useState([
      { id: 1, name: 'Dr. A. Gupta', role: 'Medical Validator', status: 'Active' },
      { id: 2, name: 'S. Mehta', role: 'Support Staff', status: 'Active' }
  ]);

  const handleSaveProfile = (e) => {
      e.preventDefault();
      alert('Profile Updated Successfully!');
  };

  const handleUpdatePassword = (e) => {
      e.preventDefault();
      if (passwords.new !== passwords.confirm) {
          alert('New passwords do not match!');
          return;
      }
      alert('Password Updated Successfully! (This will be effective next login)');
      setPasswords({ current: '', new: '', confirm: '' });
      // In a real app, this would hit an API endpoint
  };

  // Light & Clean Styles via standard CSS-in-JS logic matching Dashboard
  const cardStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
    padding: '2rem'
  };

  const inputStyle = {
    width: '100%', 
    padding: '0.9rem 0.9rem 0.9rem 3rem', 
    background: 'var(--bg-primary)', 
    border: '1px solid var(--border)',
    color: 'var(--text-primary)', 
    borderRadius: '12px',
    outline: 'none', 
    transition: 'border-color 0.2s',
    fontSize: '0.95rem'
  };

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>Profile Configuration</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Manage account settings and security preferences.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          
          {/* Profile Details */}
          <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div style={{ 
                      width: '80px', height: '80px', borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      fontSize: '2rem', fontWeight: 'bold', color: '#fff',
                      boxShadow: '0 10px 25px rgba(255, 154, 158, 0.4)',
                      border: '4px solid #fff'
                  }}>
                      {(profile.name || 'A').charAt(0)}
                  </div>
                  <div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{profile.name}</h2>
                      <div style={{ 
                          display: 'inline-block',
                          padding: '4px 12px', 
                          background: 'rgba(59, 130, 246, 0.1)', 
                          color: '#3B82F6', 
                          borderRadius: '20px', 
                          fontSize: '0.85rem', 
                          fontWeight: '600' 
                      }}>
                          {profile.role}
                      </div>
                  </div>
              </div>

              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                      <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Full Name</label>
                      <div style={{ position: 'relative' }}>
                          <User size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-secondary)' }} />
                          <input 
                            type="text" 
                            value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})}
                            style={inputStyle}
                          />
                      </div>
                  </div>

                  <div>
                      <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Email Address</label>
                      <div style={{ position: 'relative' }}>
                          <Mail size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-secondary)' }} />
                          <input 
                            type="email" 
                            value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})}
                            style={inputStyle}
                          />
                      </div>
                  </div>

                  <button className="btn" style={{ 
                      marginTop: '1.5rem', padding: '1rem', 
                      background: 'var(--accent)', 
                      color: 'var(--accent-text)', border: 'none', fontSize: '1rem', fontWeight: '600',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)', borderRadius: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      cursor: 'pointer', transition: 'transform 0.2s'
                  }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                      <Save size={20} /> Save Changes
                  </button>
              </form>
          </div>

          {/* Security & Access */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Change Password */}
              <div style={cardStyle}>
                  <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}><Lock size={20} color="#10b981" /></div>
                      Security Settings
                  </h3>
                  
                  <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <input 
                        type="password" placeholder="Current Password"
                        value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})}
                        style={{ ...inputStyle, padding: '0.9rem 1rem' }}
                      />
                      <input 
                        type="password" placeholder="New Password"
                        value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})}
                        style={{ ...inputStyle, padding: '0.9rem 1rem' }}
                      />
                      <input 
                        type="password" placeholder="Confirm New Password"
                        value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                        style={{ ...inputStyle, padding: '0.9rem 1rem' }}
                      />
                      <button className="btn" style={{ 
                          marginTop: '0.5rem', padding: '0.9rem',
                          background: 'transparent', border: '1px solid var(--border)',
                          color: 'var(--text-primary)', borderRadius: '12px', cursor: 'pointer', fontWeight: '600',
                          transition: 'all 0.2s'
                      }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-primary)'; }} 
                         onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                        Update Password
                      </button>
                  </form>
              </div>

              {/* Team Access */}
              <div style={cardStyle}>
                  <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}><Shield size={20} color="#3b82f6" /></div>
                      Manage Access
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {team.map(member => (
                          <div key={member.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                                      {(member.name || 'A').charAt(0)}
                                  </div>
                                  <div>
                                      <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{member.name}</div>
                                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{member.role}</div>
                                  </div>
                              </div>
                              <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '4px 10px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.2)', fontWeight: '600' }}>
                                  {member.status}
                              </span>
                          </div>
                      ))}
                      <button className="btn-link" style={{ color: 'var(--accent)', alignSelf: 'flex-start', fontSize: '0.9rem', marginTop: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '600' }}>+ Add New Admin</button>
                  </div>
              </div>

          </div>
      </div>
    </div>
  );
}

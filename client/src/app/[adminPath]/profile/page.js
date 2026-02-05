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

  // Premium Dark Styles
  const cardStyle = {
    background: 'rgba(30, 41, 59, 0.4)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 0.9rem 0.9rem 3rem', 
    background: 'rgba(15, 23, 42, 0.6)', 
    border: '1px solid rgba(255,255,255,0.1)', 
    color: '#fff', borderRadius: '12px',
    outline: 'none', transition: 'border-color 0.2s',
    fontSize: '0.95rem'
  };

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Admin Profile & Settings</h1>
        <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Manage your account details and security preferences.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          
          {/* Profile Details */}
          <div style={{ ...cardStyle, padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div style={{ 
                      width: '80px', height: '80px', borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #00d2d3 0%, #2e86de 100%)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      fontSize: '2rem', fontWeight: 'bold', color: '#fff',
                      boxShadow: '0 4px 20px rgba(0, 210, 211, 0.4)'
                  }}>
                      {profile.name.charAt(0)}
                  </div>
                  <div>
                      <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{profile.name}</h2>
                      <div style={{ color: '#00d2d3', fontSize: '0.95rem', fontWeight: '500' }}>{profile.role}</div>
                  </div>
              </div>

              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                      <label style={{ display: 'block', marginBottom: '0.8rem', color: '#94a3b8', fontSize: '0.9rem' }}>Full Name</label>
                      <div style={{ position: 'relative' }}>
                          <User size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: '#64748b' }} />
                          <input 
                            type="text" 
                            value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})}
                            style={inputStyle}
                          />
                      </div>
                  </div>

                  <div>
                      <label style={{ display: 'block', marginBottom: '0.8rem', color: '#94a3b8', fontSize: '0.9rem' }}>Email Address</label>
                      <div style={{ position: 'relative' }}>
                          <Mail size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: '#64748b' }} />
                          <input 
                            type="email" 
                            value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})}
                            style={inputStyle}
                          />
                      </div>
                  </div>

                  <button className="btn" style={{ 
                      marginTop: '1rem', padding: '1rem', 
                      background: 'linear-gradient(135deg, #00d2d3 0%, #2e86de 100%)', 
                      color: '#fff', border: 'none', fontSize: '1rem', fontWeight: '600',
                      boxShadow: '0 4px 15px rgba(0, 210, 211, 0.3)', borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                  }}>
                      <Save size={20} /> Save Changes
                  </button>
              </form>
          </div>

          {/* Security & Access */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Change Password */}
              <div style={{ ...cardStyle, padding: '2rem' }}>
                  <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}>
                      <Lock size={20} color="#00d2d3" /> Security Settings
                  </h3>
                  
                  <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <input 
                        type="password" placeholder="Current Password"
                        value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})}
                        style={{ ...inputStyle, padding: '0.9rem' }}
                      />
                      <input 
                        type="password" placeholder="New Password"
                        value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})}
                        style={{ ...inputStyle, padding: '0.9rem' }}
                      />
                      <input 
                        type="password" placeholder="Confirm New Password"
                        value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                        style={{ ...inputStyle, padding: '0.9rem' }}
                      />
                      <button className="btn" style={{ 
                          marginTop: '0.5rem', padding: '0.9rem',
                          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                          color: '#fff', borderRadius: '12px', cursor: 'pointer', fontWeight: '500'
                      }}>
                        Update Password
                      </button>
                  </form>
              </div>

              {/* Team Access */}
              <div style={{ ...cardStyle, padding: '2rem' }}>
                  <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}>
                      <Shield size={20} color="#00d2d3" /> Manage Access
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {team.map(member => (
                          <div key={member.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                                      {member.name.charAt(0)}
                                  </div>
                                  <div>
                                      <div style={{ fontWeight: '500', fontSize: '0.95rem' }}>{member.name}</div>
                                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{member.role}</div>
                                  </div>
                              </div>
                              <span style={{ fontSize: '0.75rem', background: 'rgba(46, 204, 113, 0.15)', color: '#2ecc71', padding: '4px 10px', borderRadius: '20px', border: '1px solid rgba(46, 204, 113, 0.2)' }}>
                                  {member.status}
                              </span>
                          </div>
                      ))}
                      <button className="btn-link" style={{ color: '#00d2d3', alignSelf: 'flex-start', fontSize: '0.9rem', marginTop: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '500' }}>+ Add New Admin</button>
                  </div>
              </div>

          </div>
      </div>
    </div>
  );
}

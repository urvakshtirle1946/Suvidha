'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (activeTab === 'register') {
        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
            alert("Please enter Name, Email, Phone Number, and Password");
            return;
        }
    } else {
        if (!formData.email || !formData.password) {
            alert("Please enter Email and Password");
            return;
        }
    }
  
    setLoading(true);

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://suvidha-server-4u66.onrender.com');
        
        const res = await fetch(`${apiUrl}/api/auth/phone-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                is_login: activeTab === 'login'
            })
        });

        let data;
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            data = await res.json();
        } else {
            const text = await res.text();
            console.error("Non-JSON response:", text);
            throw new Error(`Server returned ${res.status}: ${text.substring(0, 100)}`);
        }

        if (res.ok && data.success) {
             login({ ...data.user, token: data.token });
             
             if (data.user.role === 'admin') {
                 router.push('/admin/dashboard'); 
             } else {
                 router.push('/');
             }
        } else {
            alert(data.message || "Login/Registration Failed");
            setLoading(false);
        }
    } catch (err) {
        console.error("Auth Error:", err);
        alert(`Error: ${err.message}`);
        setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
      

      {/* Main Login Form */}
      <div style={{ 
          background: '#fff', padding: '2.5rem', borderRadius: '20px', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          width: '100%', maxWidth: '400px', textAlign: 'center',
          transition: 'all 0.5s ease'
      }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '50%' }}>
                  <ShieldCheck size={32} color="#2563eb" />
              </div>
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
              Welcome to Zelp
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              {activeTab === 'login' ? 'Login to your account' : 'Create a new account'}
          </p>

          {/* Tabs */}
          <div style={{ display: 'flex', background: '#f3f4f6', padding: '4px', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <button
                onClick={() => setActiveTab('login')}
                style={{
                    flex: 1, padding: '8px', borderRadius: '8px', border: 'none',
                    background: activeTab === 'login' ? '#fff' : 'transparent',
                    color: activeTab === 'login' ? '#111827' : '#6b7280',
                    fontWeight: '600', cursor: 'pointer',
                    boxShadow: activeTab === 'login' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                  Login
              </button>
              <button
                onClick={() => setActiveTab('register')}
                style={{
                    flex: 1, padding: '8px', borderRadius: '8px', border: 'none',
                    background: activeTab === 'register' ? '#fff' : 'transparent',
                    color: activeTab === 'register' ? '#111827' : '#6b7280',
                    fontWeight: '600', cursor: 'pointer',
                    boxShadow: activeTab === 'register' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                  Register
              </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {activeTab === 'register' && (
                  <div style={{ textAlign: 'left' }}>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#374151', fontWeight: '500' }}>Full Name</label>
                      <input 
                          type="text" 
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
                          required={activeTab === 'register'}
                      />
                  </div>
              )}

              <div style={{ textAlign: 'left' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#374151', fontWeight: '500' }}>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="e.g. rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
                    required
                  />
              </div>

              {activeTab === 'register' && (
                  <div style={{ textAlign: 'left' }}>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#374151', fontWeight: '500' }}>Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit mobile number"
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
                        required={activeTab === 'register'}
                      />
                  </div>
              )}

              <div style={{ textAlign: 'left' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#374151', fontWeight: '500' }}>Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
                    required
                  />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                style={{ 
                    marginTop: '1rem',
                    width: '100%', padding: '1rem', borderRadius: '10px', 
                    background: '#2563eb', color: '#fff', border: 'none', 
                    fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Processing...' : (activeTab === 'login' ? 'Login' : 'Create Account')}
                {!loading && <ArrowRight size={18} />}
              </button>
          </form>

          <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '1.5rem' }}>
              By continuing, you verify that you agree to our Terms of Service.
          </p>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';

export default function EarlyAccessPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email) {
        setShowPopup(true);
    }
  };

  return (
    <div style={{
       minHeight: '100vh',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
       fontFamily: '"Inter", sans-serif'
    }}>
       <div style={{
           background: 'rgba(255, 255, 255, 0.1)',
           backdropFilter: 'blur(10px)',
           padding: '3rem',
           borderRadius: '24px',
           boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
           border: '1px solid rgba(255, 255, 255, 0.18)',
           width: '100%',
           maxWidth: '450px',
           color: 'white',
           textAlign: 'center'
       }}>
           <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
               <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px', borderRadius: '50%' }}>
                   <Mail size={40} color="#fff" />
               </div>
           </div>

           <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Join Early Access</h1>
           <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Enter your email to request access to the platform.</p>

           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <input
                 type="email"
                 placeholder="name@example.com"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 style={{
                     padding: '1rem',
                     borderRadius: '12px',
                     border: 'none',
                     outline: 'none',
                     background: 'rgba(255,255,255,0.9)',
                     color: '#1f2937',
                     fontSize: '1rem'
                 }}
                 required
               />
               <button
                 type="submit"
                 style={{
                     padding: '1rem',
                     borderRadius: '12px',
                     border: 'none',
                     background: '#fff',
                     color: '#2563eb',
                     fontWeight: 'bold',
                     fontSize: '1rem',
                     cursor: 'pointer',
                     transition: 'transform 0.2s',
                     marginTop: '0.5rem'
                 }}
                 onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                 onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
               >
                   Request Access
               </button>
           </form>
            <div style={{ marginTop: '1.5rem' }}>
                <button
                    onClick={() => router.push('/login')}
                    style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', margin: '0 auto' }}
                >
                    <ArrowLeft size={16} /> Back to Login
                </button>
            </div>
       </div>

       {showPopup && (
           <div style={{
               position: 'fixed', inset: 0,
               background: 'rgba(0,0,0,0.6)',
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               zIndex: 50,
               backdropFilter: 'blur(5px)'
           }}>
               <div style={{
                   background: 'white',
                   padding: '2.5rem',
                   borderRadius: '20px',
                   textAlign: 'center',
                   width: '90%',
                   maxWidth: '350px',
                   animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
               }}>
                   <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                       <CheckCircle size={48} color="#10b981" />
                   </div>
                   <h2 style={{ color: '#111827', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Submitted!</h2>
                   <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                       Your ID is under review. We will notify you once approved.
                   </p>
                   <button
                     onClick={() => {
                        setShowPopup(false);
                        setEmail('');
                     }}
                     style={{
                         width: '100%', padding: '0.8rem',
                         background: '#10b981', color: 'white',
                         border: 'none', borderRadius: '10px',
                         fontWeight: 'bold', cursor: 'pointer'
                     }}
                   >
                     Okay, Got it
                   </button>
               </div>
           </div>
       )}
       <style jsx global>{`
           @keyframes popIn {
               0% { opacity: 0; transform: scale(0.8); }
               100% { opacity: 1; transform: scale(1); }
           }
       `}</style>
    </div>
  );
}

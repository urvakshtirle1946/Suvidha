'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: 9999,
      pointerEvents: 'none' // Let clicks pass through empty space
    }}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onClose }) {
  // Styles based on type
  const styles = {
    success: { bg: '#fff', border: '#2ecc71', icon: <CheckCircle size={20} color="#2ecc71" />, title: 'Success' },
    error: { bg: '#fff', border: '#ff6b6b', icon: <AlertCircle size={20} color="#ff6b6b" />, title: 'Error' },
    info: { bg: '#fff', border: '#3498db', icon: <Info size={20} color="#3498db" />, title: 'Info' }
  };

  const currentStyle = styles[toast.type] || styles.success;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '1rem 1.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minWidth: '300px',
        maxWidth: '400px',
        borderLeft: `6px solid ${currentStyle.border}`,
        pointerEvents: 'auto', // Re-enable clicks
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ padding: '8px', background: `${currentStyle.border}15`, borderRadius: '50%' }}>
        {currentStyle.icon}
      </div>
      
      <div style={{ flex: 1 }}>
         <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: '#333' }}>{currentStyle.title}</h4>
         <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', marginTop: '2px' }}>{toast.message}</p>
      </div>

      <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#999' }}>
        <X size={16} />
      </button>
    </motion.div>
  );
}

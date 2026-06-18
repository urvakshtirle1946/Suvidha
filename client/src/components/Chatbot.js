'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { apiFetch } from '@/utils/api';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 I'm your Zelp assistant. Ask me about hospitals, lab tests, or pricing!", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = async (query) => {
    setIsTyping(true);
    const q = query.toLowerCase();

    try {
      // 1. Search for Services (Tests/Scans)
      const serviceRes = await apiFetch(`/api/services?search=${encodeURIComponent(query)}&limit=3`);
      const serviceData = await serviceRes.json();
      const services = Array.isArray(serviceData) ? serviceData : (serviceData.data || []);

      // 2. Search for Hospitals
      const hospitalRes = await apiFetch(`/api/hospitals?search=${encodeURIComponent(query)}&limit=3`);
      const hospitalData = await hospitalRes.json();
      const hospitals = Array.isArray(hospitalData) ? hospitalData : (hospitalData.data || []);

      let responseText = "";

      if (services.length > 0) {
        responseText = `I found some services related to "${query}":\n\n` + 
          services.map(s => `• ${s.name}: ₹${s.discount_price || s.price} at ${s.hospital_name}`).join('\n') +
          `\n\nWould you like me to add any of these to your cart?`;
      } else if (hospitals.length > 0) {
        responseText = `Here are some hospitals matching "${query}":\n\n` +
          hospitals.map(h => `• ${h.name} (${h.location})`).join('\n') +
          `\n\nYou can view their full profiles on our Services page.`;
      } else if (q.includes('price') || q.includes('cost') || q.includes('how much')) {
        responseText = "Prices vary by hospital and service. Could you specify which test or hospital you're interested in?";
      } else if (q.includes('hello') || q.includes('hi')) {
        responseText = "Hello! How can I help you navigate Zelp today?";
      } else {
        responseText = "I'm not quite sure about that. Try searching for a specific test (like 'MRI') or a hospital name!";
      }

      setMessages(prev => [...prev, { id: Date.now(), text: responseText, sender: 'bot' }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { id: Date.now(), text: "I'm having trouble connecting to our records right now. Please try again in a moment!", sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages(prev => [...prev, { id: Date.now(), text: userMsg, sender: 'user' }]);
    setInputValue('');
    generateResponse(userMsg);
  };

  return (
    <>
      <style>{`
        .chatbot-toggle-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #000;
          color: white;
          border: 1px solid #333;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: ${isOpen ? 'rotate(90deg)' : 'rotate(0deg)'};
        }
        .chatbot-toggle-btn:hover {
          transform: ${isOpen ? 'rotate(90deg) scale(1.1)' : 'scale(1.1)'};
        }
        .chatbot-window {
          position: fixed;
          bottom: 100px;
          right: 30px;
          width: 380px;
          height: 500px;
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          z-index: 2000;
          overflow: hidden;
          animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 640px) {
          .chatbot-toggle-btn {
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
          }
          .chatbot-window {
            bottom: 80px;
            right: 15px;
            left: 15px;
            width: auto;
            height: calc(100% - 100px);
            max-height: 520px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
        }
      `}</style>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-toggle-btn"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">

          {/* Header */}
          <div style={{
            padding: '20px',
            background: '#000',
            color: 'white',
            borderBottom: '1px solid #222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>Zelp Support</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Online (AI Assistant)</p>
              </div>
            </div>
            <a 
              href="https://cal.com/urvakshtirle/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            >
              Talk to Human
            </a>
          </div>

          {/* Messages area */}
          <div 
            ref={scrollRef}
            style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              background: '#f9fafb'
            }}
          >
            {messages.map((msg) => (
              <div key={msg.id} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '100%'
              }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                  background: msg.sender === 'user' ? '#000' : 'white',
                  color: msg.sender === 'user' ? 'white' : '#374151',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  boxShadow: msg.sender === 'user' ? '0 4px 10px rgba(0, 0, 0, 0.1)' : '0 2px 5px rgba(0,0,0,0.05)',
                  maxWidth: '85%',
                  whiteSpace: 'pre-line'
                }}>
                  {msg.text}
                </div>
                <span style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '4px', padding: '0 4px' }}>
                  {msg.sender === 'bot' ? 'Zelp Bot' : 'You'}
                </span>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '10px' }}>
                <Loader2 size={16} className="animate-spin" style={{ color: '#000' }} />
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>Zelp is searching...</span>
              </div>
            )}
          </div>

          {/* Input area */}
          <form onSubmit={handleSend} style={{
            padding: '20px',
            background: 'white',
            borderTop: '1px solid #f3f4f6',
            display: 'flex',
            gap: '10px'
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                outline: 'none',
                fontSize: '0.9rem',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = '#000'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
            <button
              type="submit"
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '12px',
                background: '#000',
                color: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#222'}
              onMouseLeave={e => e.currentTarget.style.background = '#000'}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

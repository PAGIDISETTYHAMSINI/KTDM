import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, X, Minimize2 } from 'lucide-react';
import { getAIResponse } from '../../utils/aiPlanner';

const QUICK_QUESTIONS = [
  "Plan a 1-day trip",
  "Best waterfalls to visit?",
  "Nearest hospital?",
  "Best food in Kothagudem?",
  "Bogatha waterfall route",
  "Budget trip ideas",
];

const ChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "🌿 Namaste! I'm your Kothagudem travel assistant. Ask me about tourist places, food, hotels, emergency contacts, or trip planning!",
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (text) => {
    const query = text || input.trim();
    if (!query) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text: query }]);
    setTyping(true);

    // Simulate AI delay
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    const response = getAIResponse(query);
    setTyping(false);
    setMessages(m => [...m, { role: 'bot', text: response }]);
  };

  return (
    <>
      {/* FAB Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', bottom: '5.5rem', right: '1rem', zIndex: 200,
          width: 52, height: 52, borderRadius: '50%',
          background: 'linear-gradient(135deg,#f97316,#f59e0b)',
          border: 'none', cursor: 'pointer',
          display: open ? 'none' : 'flex',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(249,115,22,0.4)',
        }}
        className="animate-pulse-glow"
      >
        <Bot size={24} color="white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            style={{
              position: 'fixed', bottom: '5.5rem', right: '0.75rem', left: '0.75rem',
              zIndex: 200, maxWidth: 420, marginLeft: 'auto',
              background: '#0e0e1a',
              border: '1px solid rgba(249,115,22,0.2)',
              borderRadius: '20px', overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1rem',
              background: 'linear-gradient(135deg,rgba(249,115,22,0.2),rgba(245,158,11,0.1))',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#f97316,#f59e0b)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Bot size={18} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Bhadradri AI</div>
                  <div style={{ fontSize: '0.7rem', color: '#22c55e' }}>● Online</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            {/* Messages */}
            <div style={{ height: 280, overflowY: 'auto', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '80%', padding: '0.6rem 0.9rem',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user' ? 'linear-gradient(135deg,#f97316,#f59e0b)' : 'rgba(255,255,255,0.06)',
                    border: msg.role === 'bot' ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    fontSize: '0.82rem', lineHeight: 1.5, color: 'white',
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div style={{ display: 'flex', gap: '4px', padding: '0.6rem 0.9rem' }}>
                  {[0,1,2].map(i => (
                    <motion.div key={i}
                      animate={{ y: [0,-6,0] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: i*0.15 }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: '#f97316' }}
                    />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Questions */}
            <div style={{ padding: '0.4rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
                {QUICK_QUESTIONS.map(q => (
                  <button key={q} onClick={() => sendMessage(q)} style={{
                    flexShrink: 0, padding: '4px 12px',
                    background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)',
                    borderRadius: '20px', fontSize: '0.7rem', color: '#f97316',
                    cursor: 'pointer', fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap',
                  }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div style={{
              padding: '0.75rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', gap: '0.5rem',
            }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about Kothagudem..."
                style={{
                  flex: 1, padding: '0.6rem 0.9rem',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px', color: 'white', fontSize: '0.85rem',
                  outline: 'none', fontFamily: 'Outfit, sans-serif',
                }}
              />
              <motion.button whileTap={{ scale: 0.85 }} onClick={() => sendMessage()} className="btn-primary" style={{ padding: '0.6rem 0.9rem', borderRadius: '12px' }}>
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;

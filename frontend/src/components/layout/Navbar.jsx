import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Globe, Wifi } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../stores/useStore';
import { TOURIST_PLACES, RESTAURANTS } from '../../data/miryalagudaData';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { searchQuery, setSearchQuery, language, setLanguage } = useStore();
  const navigate = useNavigate();

  const allItems = [...TOURIST_PLACES, ...RESTAURANTS];
  const filtered = searchQuery.length > 1
    ? allItems.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div className="glass" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '0.75rem 1rem',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '10px',
            background: 'linear-gradient(135deg,#f97316,#f59e0b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem',
          }}>🌿</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', lineHeight: 1, letterSpacing: '-0.5px' }}>
              <span className="gradient-text">Manam</span>
            </div>
            <div style={{ fontSize: '0.6rem', color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Miryalaguda
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSearch(!showSearch)}
            className="btn-glass"
            style={{ padding: '0.45rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Search size={18} color="#94a3b8" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
            className="btn-glass"
            style={{ padding: '0.45rem 0.65rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}
          >
            {language === 'en' ? 'తెలు' : 'EN'}
          </motion.button>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg,#f97316,#f59e0b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.85rem', fontWeight: 700,
          }}>U</div>
        </div>
      </div>

      {/* Expandable Search */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden', marginTop: '0.75rem' }}
          >
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search places, restaurants, temples..."
                style={{
                  width: '100%', padding: '0.65rem 1rem 0.65rem 2.25rem',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px', color: 'white', fontSize: '0.9rem', outline: 'none',
                  fontFamily: 'Outfit, sans-serif',
                }}
              />
            </div>

            {filtered.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: '0.5rem', background: '#12121a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px', overflow: 'hidden',
                }}
              >
                {filtered.map((item, i) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      navigate(`/place/${item.id}`);
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                    style={{
                      padding: '0.75rem 1rem',
                      borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem',
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: '10px',
                      background: 'rgba(249,115,22,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1rem', flexShrink: 0,
                    }}>
                      {item.category === 'Temple' ? '🕌' :
                       item.category === 'Waterfall' ? '💦' :
                       item.category === 'Wildlife' ? '🐯' :
                       item.category === 'Restaurant' ? '🍛' : '🗺️'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.category}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

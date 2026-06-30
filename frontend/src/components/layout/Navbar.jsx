import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../stores/useStore';
import SmartSearch from '../SmartSearch';

const Navbar = () => {
  const { language, setLanguage } = useStore();
  const navigate = useNavigate();

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

      {/* Smart Search */}
      <div style={{ marginTop: '0.75rem' }}>
        <SmartSearch />
      </div>
    </div>
  );
};

export default Navbar;

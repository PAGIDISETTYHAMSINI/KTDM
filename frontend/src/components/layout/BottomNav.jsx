import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Map, Compass, Utensils, Shield, Bookmark, Radio } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/news', icon: Radio, label: 'News' },
  { path: '/explore', icon: Compass, label: 'Mana Uru' },
  { path: '/emergency', icon: Shield, label: 'SOS' },
  { path: '/saved', icon: Bookmark, label: 'Saved' },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bottom-nav-safe" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="glass" style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0.6rem 0.5rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px 20px 0 0',
      }}>
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          const isSOS = path === '/emergency';
          return (
            <NavLink
              key={path}
              to={path}
              style={{ textDecoration: 'none', flex: 1 }}
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  padding: '4px 0',
                  position: 'relative',
                }}
              >
                {isSOS ? (
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: isActive
                      ? 'linear-gradient(135deg,#ef4444,#dc2626)'
                      : 'linear-gradient(135deg,#ef4444aa,#dc262688)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 16px rgba(239,68,68,0.5)',
                    marginTop: -16,
                    border: '2px solid rgba(239,68,68,0.5)',
                  }}>
                    <Icon size={20} color="white" />
                  </div>
                ) : (
                  <div style={{
                    padding: '6px',
                    borderRadius: '12px',
                    background: isActive ? 'rgba(249,115,22,0.2)' : 'transparent',
                    transition: 'all 0.2s',
                  }}>
                    <Icon
                      size={22}
                      color={isActive ? '#f97316' : '#64748b'}
                      strokeWidth={isActive ? 2.5 : 1.8}
                    />
                  </div>
                )}
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isSOS ? '#ef4444' : isActive ? '#f97316' : '#64748b',
                  marginTop: isSOS ? 2 : 0,
                }}>
                  {label}
                </span>
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;

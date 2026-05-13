import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Map, Compass, Utensils, Shield, Bookmark, User } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/explore', icon: Compass, label: 'Mana Uru' },
  { path: '/saved', icon: Bookmark, label: 'Saved' },
  { path: '/profile', icon: User, label: 'Profile' },
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
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#f97316' : '#64748b',
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

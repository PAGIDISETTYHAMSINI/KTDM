import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../stores/useStore';

const SavedPage = () => {
  const { savedPlaces, toggleSave } = useStore();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', paddingTop: '4.5rem', paddingBottom: '5rem' }}>
      <div style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <Bookmark size={22} color="#f97316" fill="#f97316" />
          <h1 style={{ fontWeight: 900, fontSize: '1.5rem' }}>Saved Places</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.8rem' }}>{savedPlaces.length} place{savedPlaces.length !== 1 ? 's' : ''} saved</p>
      </div>

      {savedPlaces.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '1rem', padding: '2rem' }}>
          <div style={{ fontSize: '4rem' }}>🔖</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#64748b' }}>Nothing saved yet</div>
          <p style={{ color: '#475569', textAlign: 'center', fontSize: '0.85rem' }}>Tap the bookmark icon on any place to save it for later</p>
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => navigate('/explore')} className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
            Explore Places
          </motion.button>
        </div>
      ) : (
        <div style={{ padding: '0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {savedPlaces.map((place, i) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                background: '#12121a', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px', overflow: 'hidden',
                display: 'flex', alignItems: 'stretch',
              }}
            >
              <img src={place.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'}
                alt={place.name} style={{ width: 90, height: 90, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, padding: '0.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', color: '#f97316', fontWeight: 700, textTransform: 'uppercase' }}>{place.category}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{place.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>⭐ {place.rating}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
                  <button onClick={() => navigate(`/place/${place.id}`)} className="btn-primary" style={{ flex: 1, padding: '0.35rem', fontSize: '0.72rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    View <ArrowRight size={12} />
                  </button>
                  <button onClick={() => toggleSave(place)} style={{ padding: '0.35rem 0.6rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', cursor: 'pointer' }}>
                    <Trash2 size={14} color="#ef4444" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPage;

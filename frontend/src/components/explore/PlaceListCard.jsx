import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Phone, Navigation, Clock, Bookmark } from 'lucide-react';
import useStore from '../../stores/useStore';

const PlaceListCard = ({ place, categoryColor = '#f97316' }) => {
  const { toggleSave, isSaved } = useStore();
  const saved = isSaved(place.id);

  const isOpen = () => {
    const now = new Date().getHours();
    if (place.hours === '24/7') return true;
    if (!place.hours) return null;
    return now >= 7 && now <= 21;
  };
  const openStatus = isOpen();

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      style={{
        background: '#12121a',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '18px',
        overflow: 'hidden',
        flexShrink: 0,
        width: 230,
      }}
    >
      <div style={{ position: 'relative', height: 130 }}>
        <img
          src={place.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'}
          alt={place.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)' }} />
        {openStatus !== null && (
          <div style={{
            position: 'absolute', top: 8, left: 8,
            background: openStatus ? 'rgba(34,197,94,0.9)' : 'rgba(239,68,68,0.9)',
            borderRadius: 20, padding: '2px 8px', fontSize: '0.62rem', fontWeight: 700, color: 'white',
          }}>
            {openStatus ? '● OPEN' : '● CLOSED'}
          </div>
        )}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => { e.stopPropagation(); toggleSave({ ...place, category: place.type || place.category }); }}
          style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%',
            padding: 6, cursor: 'pointer', lineHeight: 0,
          }}
        >
          <Bookmark size={13} color={saved ? categoryColor : '#94a3b8'} fill={saved ? categoryColor : 'none'} />
        </motion.button>
        <div style={{ position: 'absolute', bottom: 8, left: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Star size={12} color="#f59e0b" fill="#f59e0b" />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'white' }}>{place.rating}</span>
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.65)' }}>({place.reviews?.toLocaleString()})</span>
        </div>
      </div>

      <div style={{ padding: '0.75rem' }}>
        <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.2rem', lineHeight: 1.3 }}>{place.name}</div>
        <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: 3 }}>
          <MapPin size={10} />{place.address?.split(',')[0]}
        </div>
        {place.priceRange && <div style={{ fontSize: '0.7rem', color: '#22c55e', fontWeight: 700, marginBottom: '0.5rem' }}>{place.priceRange}</div>}
        {place.entry && <div style={{ fontSize: '0.7rem', color: '#22c55e', fontWeight: 700, marginBottom: '0.5rem' }}>Entry: {place.entry}</div>}
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <a
            href={`https://maps.google.com/?q=${place.lat},${place.lng}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              flex: 1, padding: '5px 0', background: `${categoryColor}22`,
              border: `1px solid ${categoryColor}44`, borderRadius: 9,
              fontSize: '0.68rem', fontWeight: 700, color: categoryColor,
              textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3,
            }}
          >
            <Navigation size={10} /> Go
          </a>
          {place.phone && (
            <a
              href={`tel:${place.phone}`}
              style={{
                flex: 1, padding: '5px 0', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: 9,
                fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8',
                textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3,
              }}
            >
              <Phone size={10} /> Call
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceListCard;

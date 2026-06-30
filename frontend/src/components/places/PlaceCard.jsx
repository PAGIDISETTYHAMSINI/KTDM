import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, ArrowRight, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../stores/useStore';

const PlaceCard = ({ place, compact = false }) => {
  const navigate = useNavigate();
  const { toggleSave, isSaved } = useStore();
  const saved = isSaved(place.id);

  const categoryEmoji = {
    Temple: '🕌', Waterfall: '💦', Wildlife: '🐯',
    Scenic: '🌄', Spiritual: '🙏', Heritage: '🏛️',
    Adventure: '🏕️', Restaurant: '🍛', Hotel: '🏨',
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/place/${place.id}`)}
      className="card-hover"
      style={{
        background: '#12121a',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        flexShrink: 0,
        width: compact ? 220 : '100%',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: compact ? 130 : 180 }}>
        <img
          src={place.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'}
          alt={place.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
        }} />
        {/* Category badge */}
        <div style={{
          position: 'absolute', top: '0.75rem', left: '0.75rem',
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
          padding: '2px 10px', borderRadius: '20px', fontSize: '0.7rem',
          fontWeight: 700, color: '#f97316', border: '1px solid rgba(249,115,22,0.3)',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          <span>{categoryEmoji[place.category] || '📍'}</span>
          <span>{place.category}</span>
        </div>
        {/* Save button */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => { e.stopPropagation(); toggleSave(place); }}
          style={{
            position: 'absolute', top: '0.75rem', right: '0.75rem',
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%',
            padding: '6px', cursor: 'pointer', lineHeight: 0,
          }}
        >
          <Bookmark size={14} color={saved ? '#f97316' : '#94a3b8'} fill={saved ? '#f97316' : 'none'} />
        </motion.button>
        {/* Rating */}
        <div style={{
          position: 'absolute', bottom: '0.75rem', left: '0.75rem',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          <Star size={13} color="#f59e0b" fill="#f59e0b" />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>{place.rating}</span>
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>({(place.reviews_count || 0).toLocaleString()})</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '0.9rem' }}>
        <h3 style={{ fontWeight: 700, fontSize: compact ? '0.9rem' : '1rem', marginBottom: '0.3rem', lineHeight: 1.3 }}>
          {place.name}
        </h3>
        {!compact && (
          <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.65rem', lineHeight: 1.5,
            overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {place.description}
          </p>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748b' }}>
            <MapPin size={12} />
            <span>{place.distance_from_miryalaguda ? `${place.distance_from_miryalaguda} km` : 'Miryalaguda'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#94a3b8' }}>
            <Clock size={11} />
            <span>{place.best_time?.split(' ')[0] || 'Year-round'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceCard;

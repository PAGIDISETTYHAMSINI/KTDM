import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Phone, Navigation, Bookmark, ArrowLeft, Users, Shield, Utensils, AlertCircle } from 'lucide-react';
import { TOURIST_PLACES, RESTAURANTS, HOTELS } from '../data/miryalagudaData';
import useStore from '../stores/useStore';

const ALL = [...TOURIST_PLACES, ...RESTAURANTS.map(r => ({ ...r, category: 'Restaurant', description: r.speciality || '' })), ...HOTELS.map(h => ({ ...h, category: 'Hotel', description: h.amenities?.join(', ') || '' }))];

const PlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleSave, isSaved } = useStore();
  const place = ALL.find(p => p.id === id);
  const saved = isSaved(id);

  if (!place) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <div style={{ fontSize: '4rem' }}>🗺️</div>
      <div style={{ fontWeight: 700, color: '#64748b' }}>Place not found</div>
      <button onClick={() => navigate('/explore')} className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Explore Places</button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', paddingBottom: '5rem' }}>

      {/* Hero Image */}
      <div style={{ position: 'relative', height: '55vw', maxHeight: 320 }}>
        <img src={place.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000'}
          alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0f 20%, transparent 70%)' }} />

        {/* Back button */}
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} style={{
          position: 'absolute', top: '1rem', left: '1rem',
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
        }}>
          <ArrowLeft size={18} color="white" />
        </motion.button>

        {/* Save button */}
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => toggleSave(place)} style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)',
          border: `1px solid ${saved ? '#f97316' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '12px', padding: '8px 12px', cursor: 'pointer',
        }}>
          <Bookmark size={18} color={saved ? '#f97316' : 'white'} fill={saved ? '#f97316' : 'none'} />
        </motion.button>

        {/* Rating badge */}
        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Star size={16} color="#f59e0b" fill="#f59e0b" />
          <span style={{ fontWeight: 800, fontSize: '1rem' }}>{place.rating}</span>
          <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>({(place.reviews_count || 0).toLocaleString()} reviews)</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#f97316', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>{place.category}</div>
            <h1 style={{ fontWeight: 900, fontSize: '1.5rem', lineHeight: 1.2 }}>{place.name}</h1>
          </div>
        </div>

        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.82rem', marginBottom: '1rem' }}>
          <MapPin size={14} />
          {place.address || `Bhadradri Miryalaguda District`}
          {place.distance_from_miryalaguda && ` • ${place.distance_from_miryalaguda} km from Miryalaguda`}
        </div>

        {/* Description */}
        <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.88rem', marginBottom: '1.25rem' }}>
          {place.description}
        </p>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1.25rem' }}>
          {[
            { icon: Clock, label: 'Best Time', value: place.best_time || place.opening_hours?.split(',')[0] },
            { icon: Shield, label: 'Safety', value: place.safety_score ? `${place.safety_score}/10` : 'Good' },
            { icon: Users, label: 'Crowd', value: place.crowd_level || 'Moderate' },
            { icon: Utensils, label: 'Food', value: place.food_available ? 'Available' : 'Not Available' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} style={{ background: '#12121a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Icon size={16} color="#f97316" />
              <div>
                <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>{label}</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{value || 'N/A'}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Entry fee & Highlights */}
        {place.entry_fee && (
          <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.15)', borderRadius: '14px', padding: '0.75rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎟️</span>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>ENTRY FEE</div>
              <div style={{ fontWeight: 700, color: '#f97316' }}>{place.entry_fee}</div>
            </div>
          </div>
        )}

        {/* Highlights */}
        {place.highlights && (
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.6rem' }}>✨ Highlights</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {place.highlights.map(h => (
                <span key={h} style={{ background: '#12121a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '4px 12px', fontSize: '0.75rem', color: '#94a3b8' }}>{h}</span>
              ))}
            </div>
          </div>
        )}

        {/* Travel Tips */}
        {place.travel_tips?.length > 0 && (
          <div style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.15)', borderRadius: '14px', padding: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ fontWeight: 700, color: '#0ea5e9', marginBottom: '0.5rem', fontSize: '0.88rem' }}>💡 Travel Tips</div>
            {place.travel_tips.map((tip, i) => (
              <div key={i} style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.3rem' }}>• {tip}</div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a
            href={place.google_maps || `https://maps.google.com/?q=${place.lat},${place.lng}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
            style={{ flex: 1, padding: '1rem', fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: '14px' }}
          >
            <Navigation size={18} /> Get Directions
          </a>
          {place.phone && (
            <a href={`tel:${place.phone}`} className="btn-glass" style={{ flex: 0.5, padding: '1rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '14px' }}>
              <Phone size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;

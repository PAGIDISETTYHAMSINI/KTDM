import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Star, Clock, Navigation, Flame } from 'lucide-react';
import { RESTAURANTS } from '../data/kothagudemData';

const FOOD_CATS = ['All', 'Andhra Meals', 'Biryani', 'Tribal Food', 'Budget', 'Family', 'Street Food'];

const FoodPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = RESTAURANTS.filter(r =>
    activeFilter === 'All' ||
    r.cuisine?.some(c => c.toLowerCase().includes(activeFilter.toLowerCase())) ||
    r.tags?.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()))
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', paddingTop: '4.5rem', paddingBottom: '5rem' }}>
      {/* Hero */}
      <div style={{ padding: '1.25rem 1.25rem 0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '1.6rem' }}>🍛</span>
          <h1 style={{ fontWeight: 900, fontSize: '1.5rem' }}>Food Discovery</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Authentic Kothagudem cuisine & hidden food gems</p>
      </div>

      {/* Featured Banner */}
      <div style={{ padding: '0.75rem 1.25rem' }}>
        <div style={{
          background: 'linear-gradient(135deg,rgba(249,115,22,0.15),rgba(245,158,11,0.08))',
          border: '1px solid rgba(249,115,22,0.2)',
          borderRadius: '16px', padding: '1rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          <div style={{ fontSize: '2rem' }}>🎋</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Must Try: Bamboo Chicken</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Unique tribal delicacy — chicken cooked inside bamboo over open fire</div>
          </div>
          <div style={{ marginLeft: 'auto', background: '#f97316', color: 'white', borderRadius: '20px', padding: '2px 10px', fontSize: '0.7rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
            🔥 Trending
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '0 1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
          {FOOD_CATS.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)} style={{
              flexShrink: 0, padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700,
              background: activeFilter === cat ? 'linear-gradient(135deg,#f97316,#f59e0b)' : 'rgba(255,255,255,0.06)',
              border: activeFilter === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
              color: activeFilter === cat ? 'white' : '#94a3b8',
              cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Restaurant Cards */}
      <div style={{ padding: '0 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            style={{ background: '#12121a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', overflow: 'hidden' }}
          >
            {/* Image */}
            <div style={{ position: 'relative', height: 150 }}>
              <img src={r.images?.[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'}
                alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '0.6rem', left: '0.75rem', display: 'flex', gap: '0.4rem' }}>
                {r.tags?.slice(0, 2).map(tag => (
                  <span key={tag} style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', padding: '2px 8px', borderRadius: '20px', fontSize: '0.65rem', color: '#f97316', fontWeight: 700 }}>#{tag}</span>
                ))}
              </div>
              <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', padding: '3px 8px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={12} color="#f59e0b" fill="#f59e0b" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>{r.rating}</span>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>{r.name}</h3>
                <div style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 700 }}>{r.price_range}</div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.65rem' }}>
                {r.cuisine?.join(' • ')}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#f59e0b', marginBottom: '0.6rem', fontWeight: 600 }}>
                ⭐ {r.speciality}
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#64748b' }}>
                  <Clock size={12} /> {r.opening_hours?.split(',')[0]}
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.4rem' }}>
                  {r.veg_available && <span style={{ fontSize: '0.68rem', background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)', padding: '1px 8px', borderRadius: '20px', fontWeight: 700 }}>VEG</span>}
                  {r.ac && <span style={{ fontSize: '0.68rem', background: 'rgba(14,165,233,0.1)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.2)', padding: '1px 8px', borderRadius: '20px', fontWeight: 700 }}>AC</span>}
                </div>
              </div>
              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <a href={`https://maps.google.com/?q=${r.lat},${r.lng}`} target="_blank" rel="noopener noreferrer"
                  className="btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.78rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', borderRadius: '10px' }}>
                  <Navigation size={13} /> Navigate
                </a>
                <a href={`tel:${r.phone}`} className="btn-glass" style={{ flex: 1, padding: '0.5rem', fontSize: '0.78rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', borderRadius: '10px' }}>
                  <Phone size={13} /> Call
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FoodPage;

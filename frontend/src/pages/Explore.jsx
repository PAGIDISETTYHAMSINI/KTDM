import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import PlaceCard from '../components/places/PlaceCard';
import { TOURIST_PLACES, RESTAURANTS, HOTELS, CATEGORIES } from '../data/kothagudemData';

const ALL_ITEMS = [...TOURIST_PLACES, ...RESTAURANTS.map(r => ({ ...r, category: 'Restaurant', description: r.speciality || '', images: r.images, rating: r.rating, reviews_count: r.reviews_count, featured: false })), ...HOTELS.map(h => ({ ...h, category: 'Hotel', description: h.amenities?.join(', ') || '', images: h.images, rating: h.rating, reviews_count: h.reviews_count, featured: false }))];

const Explore = () => {
  const [searchParams] = useSearchParams();
  const defaultCat = searchParams.get('category') || 'all';
  const [activeFilter, setActiveFilter] = useState(defaultCat);
  const [sort, setSort] = useState('rating');

  const FILTERS = [{ id: 'all', label: 'All', icon: '🌐' }, ...CATEGORIES.slice(0, 8).map(c => ({ id: c.id, label: c.name.split(' ')[0], icon: c.icon }))];

  const filtered = ALL_ITEMS
    .filter(p => activeFilter === 'all' || p.category?.toLowerCase().includes(activeFilter.toLowerCase()) ||
      (activeFilter === 'tourist' && !['Restaurant','Hotel'].includes(p.category)))
    .sort((a, b) => sort === 'rating' ? b.rating - a.rating : a.name.localeCompare(b.name));

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', paddingTop: '4.5rem', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ padding: '1rem 1.25rem 0.5rem' }}>
        <h1 style={{ fontWeight: 900, fontSize: '1.5rem' }}>
          Explore <span className="gradient-text">Bhadradri</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.8rem' }}>{filtered.length} places discovered</p>
      </div>

      {/* Category Filters */}
      <div style={{ padding: '0 1rem', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
          {FILTERS.map(f => (
            <motion.button
              key={f.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveFilter(f.id)}
              style={{
                flexShrink: 0, padding: '0.45rem 1rem',
                borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700,
                background: activeFilter === f.id ? 'linear-gradient(135deg,#f97316,#f59e0b)' : 'rgba(255,255,255,0.06)',
                border: activeFilter === f.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
                color: activeFilter === f.id ? 'white' : '#94a3b8',
                cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                display: 'flex', alignItems: 'center', gap: '5px',
              }}
            >
              <span>{f.icon}</span> {f.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div style={{ padding: '0 1.25rem', marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
        {['rating', 'name'].map(s => (
          <button key={s} onClick={() => setSort(s)} style={{
            padding: '0.3rem 0.75rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700,
            background: sort === s ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.05)',
            border: sort === s ? '1px solid #f97316' : '1px solid rgba(255,255,255,0.08)',
            color: sort === s ? '#f97316' : '#64748b', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
          }}>
            {s === 'rating' ? '⭐ Top Rated' : '🔤 Name'}
          </button>
        ))}
      </div>

      {/* Places Grid */}
      <div style={{ padding: '0 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <div style={{ fontWeight: 600 }}>No places found</div>
          </div>
        ) : (
          filtered.map((place, i) => (
            <motion.div key={place.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <PlaceCard place={place} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;

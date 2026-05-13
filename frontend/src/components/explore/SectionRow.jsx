import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PlaceListCard from './PlaceListCard';

const SectionRow = ({ title, emoji, places, color = '#f97316', onViewAll }) => {
  if (!places || places.length === 0) return null;
  return (
    <section style={{ marginBottom: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1.25rem', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: `${color}22`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
            {emoji}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem' }}>{title}</div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{places.length} places nearby</div>
          </div>
        </div>
        {onViewAll && (
          <button onClick={onViewAll} style={{ background: 'none', border: 'none', color, fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
            See all <ArrowRight size={13} />
          </button>
        )}
      </div>
      <div style={{ display: 'flex', overflowX: 'auto', gap: '0.75rem', padding: '0 1.25rem 0.5rem', scrollbarWidth: 'none' }}>
        {places.map(place => (
          <PlaceListCard key={place.id} place={place} categoryColor={color} />
        ))}
      </div>
    </section>
  );
};

export default SectionRow;

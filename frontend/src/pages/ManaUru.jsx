import React, { useState } from 'react';
import PlaceCard from '../components/PlaceCard';
import { Utensils, Hospital, Hotel, Landmark, ShoppingBag, Map as MapIcon } from 'lucide-react';

const ManaUruPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = [
    { name: 'All', icon: <MapIcon size={18} /> },
    { name: 'Restaurant', icon: <Utensils size={18} /> },
    { name: 'Hospital', icon: <Hospital size={18} /> },
    { name: 'Hotel', icon: <Hotel size={18} /> },
    { name: 'Temple', icon: <Landmark size={18} /> },
    { name: 'Shopping', icon: <ShoppingBag size={18} /> }
  ];

  const placesList = [
    {
      _id: '1',
      name: 'VNR Grand Restaurant',
      category: 'Restaurant',
      rating: 4.5,
      location: { address: 'Sagar Road, Miryalaguda' },
      contact: { phone: '+91 9876543210' },
      images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop']
    },
    {
      _id: '2',
      name: 'KIMS Hospital',
      category: 'Hospital',
      rating: 4.2,
      location: { address: 'Housing Board Colony, Miryalaguda' },
      contact: { phone: '+91 08689 242000' },
      images: ['https://images.unsplash.com/photo-1587350859728-117622bc937e?w=800&auto=format&fit=crop']
    },
    {
      _id: '3',
      name: 'Sri Venkateswara Swamy Temple',
      category: 'Temple',
      rating: 4.8,
      location: { address: 'Railway Station Road' },
      images: ['https://images.unsplash.com/photo-1548013146-72479768bbaa?w=800&auto=format&fit=crop']
    }
  ];

  const filteredPlaces = activeCategory === 'All' 
    ? placesList 
    : placesList.filter(p => p.category === activeCategory);

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '6rem' }}>
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Mana Uru</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Explore Our Miryalaguda</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
        {categories.slice(1).map(cat => (
          <button 
            key={cat.name}
            onClick={() => setActiveCategory(activeCategory === cat.name ? 'All' : cat.name)}
            style={{
              padding: '1rem 0.5rem',
              borderRadius: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              background: activeCategory === cat.name ? 'var(--primary)' : 'var(--surface)',
              color: activeCategory === cat.name ? 'white' : 'var(--text-primary)',
              boxShadow: var(--shadow-sm),
              transition: 'all 0.2s',
              border: activeCategory === cat.name ? 'none' : '1px solid var(--border)'
            }}
          >
            {cat.icon}
            <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{cat.name}</span>
          </button>
        ))}
      </div>

      <div>
        <h2 className="section-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
          {activeCategory === 'All' ? 'Popular Places' : `Best ${activeCategory}s`}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {filteredPlaces.map(place => (
            <PlaceCard key={place._id} place={place} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManaUruPage;

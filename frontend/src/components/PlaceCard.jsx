import React from 'react';
import { Star, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
  return (
    <Link to={`/explore/${place._id}`} className="card fade-in" style={{ marginBottom: '1rem', padding: '0', overflow: 'hidden', display: 'block' }}>
      <div style={{ height: '160px', background: '#eee', position: 'relative' }}>
        {place.images && place.images[0] ? (
          <img src={place.images[0]} alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
            No Image
          </div>
        )}
        <div style={{ 
          position: 'absolute', 
          top: '12px', 
          right: '12px', 
          background: 'rgba(255,255,255,0.9)', 
          padding: '4px 8px', 
          borderRadius: '8px', 
          display: 'flex', 
          alignItems: 'center',
          fontSize: '0.85rem',
          fontWeight: '600',
          color: 'var(--text-primary)'
        }}>
          <Star size={14} style={{ color: '#fbbf24', marginRight: '4px', fill: '#fbbf24' }} />
          {place.rating.toFixed(1)}
        </div>
      </div>
      
      <div style={{ padding: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{place.name}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{place.category}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
          <MapPin size={14} style={{ marginRight: '6px', flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{place.location?.address}</span>
        </div>
        
        {place.contact?.phone && (
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '500' }}>
            <Phone size={14} style={{ marginRight: '6px' }} />
            {place.contact.phone}
          </div>
        )}
      </div>
    </Link>
  );
};

export default PlaceCard;

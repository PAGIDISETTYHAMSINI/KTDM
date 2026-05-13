import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Globe, Star, Clock } from 'lucide-react';

const PlaceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const place = {
    name: 'VNR Grand Restaurant',
    description: 'VNR Grand is one of the most popular family restaurants in Miryalaguda, known for its authentic Hyderabadi Biryani and multi-cuisine menu. It offers a premium dining experience with a pleasant ambiance.',
    category: 'Restaurant',
    rating: 4.5,
    location: { address: 'Sagar Road, near Housing Board Colony, Miryalaguda', coordinates: { lat: 16.87, lng: 79.56 } },
    contact: { phone: '+91 9876543210', website: 'www.vnrgrand.com' },
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop'],
    hours: '11:00 AM - 11:00 PM'
  };

  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      <div style={{ position: 'relative', margin: '0 -1.5rem', height: '300px' }}>
        <img src={place.images[0]} alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            position: 'absolute', 
            top: '20px', 
            left: '20px', 
            background: 'white', 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div style={{ marginTop: '-2rem', position: 'relative', background: 'var(--background)', borderRadius: '2rem 2rem 0 0', padding: '2rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>{place.category}</span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0.25rem 0' }}>{place.name}</h1>
          </div>
          <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={16} fill="white" />
            <span style={{ fontWeight: '700' }}>{place.rating}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-secondary)', margin: '1rem 0' }}>
          <MapPin size={18} />
          <span style={{ fontSize: '0.9rem' }}>{place.location.address}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0' }}>
          <div className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Phone size={20} style={{ color: 'var(--primary)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Call</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{place.contact.phone}</div>
            </div>
          </div>
          <div className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Clock size={20} style={{ color: 'var(--primary)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Status</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Open Now</div>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>About</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>{place.description}</p>

        <button style={{ 
          width: '100%', 
          background: 'var(--primary)', 
          color: 'white', 
          padding: '1.25rem', 
          borderRadius: '1rem', 
          fontSize: '1rem', 
          fontWeight: '700',
          boxShadow: '0 8px 16px rgba(79, 70, 229, 0.2)'
        }}>
          Open in Google Maps
        </button>
      </div>
    </div>
  );
};

export default PlaceDetailPage;

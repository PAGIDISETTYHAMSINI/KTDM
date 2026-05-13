import React from 'react';
import { Calendar, MapPin, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewsCard = ({ news }) => {
  return (
    <Link to={`/news/${news._id}`} className="card fade-in" style={{ marginBottom: '1rem', display: 'block' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <span style={{ 
          background: 'rgba(79, 70, 229, 0.1)', 
          color: 'var(--primary)', 
          padding: '2px 8px', 
          borderRadius: '12px', 
          fontSize: '0.75rem',
          fontWeight: '600'
        }}>
          {news.category}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          <Calendar size={14} style={{ marginRight: '4px' }} />
          {new Date(news.createdAt).toLocaleDateString()}
        </div>
      </div>
      
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{news.title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
        {news.content.substring(0, 120)}...
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ddd', marginRight: '8px' }}></div>
          <span style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-primary)' }}>{news.author?.name || 'Local Reporter'}</span>
          {news.author?.isVerified && <CheckCircle size={14} style={{ marginLeft: '4px', color: 'var(--primary)' }} />}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <MapPin size={14} style={{ marginRight: '4px' }} />
          {news.location?.area || 'Miryalaguda'}
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;

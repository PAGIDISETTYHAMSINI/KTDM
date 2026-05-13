import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, CheckCircle } from 'lucide-react';

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock fetching logic
  const news = {
    title: 'New Infrastructure Project in Miryalaguda Bypass',
    content: `The state government has approved a new bypass road project to reduce traffic congestion in the city center. The project is expected to start next month and will connect the main highway to the industrial zone. 
    
    Local residents have welcomed the move, as it will significantly reduce heavy vehicle traffic inside the residential areas. The project is estimated to cost around 50 Crores and will be completed in 18 months.`,
    category: 'Politics',
    createdAt: new Date(),
    author: { name: 'Srinivas Rao', isVerified: true },
    location: { area: 'Bypass Road' }
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '6rem' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        <ArrowLeft size={20} /> Back
      </button>

      <div className="fade-in">
        <span style={{ 
          background: 'rgba(79, 70, 229, 0.1)', 
          color: 'var(--primary)', 
          padding: '4px 12px', 
          borderRadius: '16px', 
          fontSize: '0.8rem',
          fontWeight: '600'
        }}>
          {news.category}
        </span>
        
        <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: '1rem 0' }}>{news.title}</h1>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Calendar size={16} style={{ marginRight: '6px' }} />
            {new Date(news.createdAt).toLocaleDateString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <MapPin size={16} style={{ marginRight: '6px' }} />
            {news.location.area}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', padding: '1rem', background: 'var(--surface)', borderRadius: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ddd', marginRight: '12px' }}></div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: '600' }}>
              {news.author.name}
              {news.author.isVerified && <CheckCircle size={14} style={{ marginLeft: '4px', color: 'var(--primary)' }} />}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Verified Local Reporter</div>
          </div>
        </div>

        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)', whiteSpace: 'pre-line' }}>
          {news.content}
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;

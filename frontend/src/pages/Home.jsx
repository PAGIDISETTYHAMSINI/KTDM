import React, { useState } from 'react';
import NewsCard from '../components/NewsCard';
import { Search, Bell, Languages } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const HomePage = () => {
  const { lang, setLang, t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Politics', 'Events', 'Education', 'Emergency', 'Health'];
  
  // Mock data
  const newsList = [
    {
      _id: '1',
      title: 'New Infrastructure Project in Miryalaguda Bypass',
      content: 'The state government has approved a new bypass road project to reduce traffic congestion in the city center. The project is expected to start next month...',
      category: 'Politics',
      createdAt: new Date(),
      author: { name: 'Srinivas Rao', isVerified: true },
      location: { area: 'Bypass Road' }
    },
    {
      _id: '2',
      title: 'Local High School Wins State Level Science Fair',
      content: 'Students from Zilla Parishad High School have secured first place in the regional science exhibition held in Nalgonda. Their project on water conservation...',
      category: 'Education',
      createdAt: new Date(),
      author: { name: 'Anitha Reddy', isVerified: false },
      location: { area: 'Main Town' }
    }
  ];

  const filteredNews = activeCategory === 'All' 
    ? newsList 
    : newsList.filter(n => n.category === activeCategory);

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '6rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary)' }}>Manam</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{lang === 'en' ? 'Hyperlocal Miryalaguda' : 'మిర్యాలగూడ హైపర్ లోకల్'}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
            className="glass" 
            style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Languages size={20} />
          </button>
          <button className="glass" style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={20} />
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', overflowX: 'auto', gap: '0.75rem', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '2rem',
              whiteSpace: 'nowrap',
              fontSize: '0.9rem',
              fontWeight: '600',
              background: activeCategory === cat ? 'var(--primary)' : 'var(--surface)',
              color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
              boxShadow: activeCategory === cat ? 'var(--shadow)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {cat === 'All' ? (lang === 'en' ? 'All' : 'అన్నీ') : t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h2 className="section-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Latest News</h2>
        {filteredNews.map(news => (
          <NewsCard key={news._id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

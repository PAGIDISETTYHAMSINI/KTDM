import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Sparkles, TrendingUp, Star, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PlaceCard from '../components/places/PlaceCard';
import { TOURIST_PLACES, CATEGORIES, WEATHER_INFO, TRIP_TEMPLATES } from '../data/kothagudemData';
import { KOTHAGUDEM_NEWS } from '../data/newsData';
import useStore from '../stores/useStore';

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Home = () => {
  const navigate = useNavigate();
  const { setActiveTab, userLocation } = useStore();
  useEffect(() => setActiveTab('home'), []);

  const featured = TOURIST_PLACES.filter(p => p.featured);
  const weather = WEATHER_INFO.kothagudem;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>

      {/* ── Hero Section ─────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh', display: 'flex', alignItems: 'flex-end' }}>
        {/* Background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.35)',
        }} />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, #0a0a0f 30%, rgba(10,10,15,0.6) 70%, transparent)',
        }} />
        {/* Animated orbs */}
        <div style={{
          position: 'absolute', top: '15%', right: '10%',
          width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.15), transparent 70%)',
          animation: 'float 4s ease-in-out infinite',
        }} />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', padding: '6rem 1.25rem 2rem', width: '100%' }}
        >
          {/* Location badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)',
            borderRadius: '20px', padding: '4px 14px', marginBottom: '0.75rem', fontSize: '0.78rem',
            color: '#f97316', fontWeight: 600,
          }}>
            <MapPin size={12} /> Bhadradri Kothagudem, Telangana
          </div>

          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.6rem' }}>
            Discover the<br />
            <span className="gradient-text">Hidden Wonders</span><br />
            of Kothagudem
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem', maxWidth: 360 }}>
            Waterfalls, temples, wildlife sanctuaries & tribal culture — all in one local guide.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>

            <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('/explore')}
              className="btn-glass" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} /> Mana Uru
            </motion.button>
          </div>

          {/* Quick stats */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {[['24+', 'Tourist Places'], ['8', 'Waterfalls'], ['635km²', 'Forest Area']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f97316' }}>{v}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Dashboard: Hyperlocal News ────────────────── */}
      <section style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.5px' }}>🗞️ Local <span className="gradient-text">News</span></h2>
            <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>TRENDING IN KOTHAGUDEM</p>
          </div>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/news')}
            className="btn-glass" style={{ padding: '6px 14px', borderRadius: '12px', fontSize: '0.78rem', color: '#f97316', fontWeight: 700 }}
          >
            All News
          </motion.button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {KOTHAGUDEM_NEWS.slice(0, 3).map((news, i) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate('/news')}
              style={{
                display: 'flex', gap: '1rem', background: '#12121a', 
                border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', 
                padding: '0.75rem', cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative', width: 90, height: 90, flexShrink: 0 }}>
                <img src={news.image} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} alt="" />
                {news.trending && (
                  <div style={{ position: 'absolute', top: -5, left: -5, background: '#ef4444', color: 'white', fontSize: '0.6rem', fontWeight: 900, padding: '2px 6px', borderRadius: '6px', boxShadow: '0 4px 12px rgba(239,68,68,0.3)' }}>🔥</div>
                )}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.65rem', color: '#f97316', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>{news.category}</div>
                <h3 style={{ fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.3, marginBottom: '0.4rem', color: 'white' }} className="line-clamp-2">{news.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.68rem', color: '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <BadgeCheck size={12} className="text-blue-500" fill="currentColor" />
                    <span style={{ fontWeight: 700 }}>Verified</span>
                  </div>
                  <span>•</span>
                  <span>{news.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Weather Strip ─────────────────────────────── */}
      <div style={{ padding: '0.75rem 1.25rem' }}>
        <div style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.15)', borderRadius: '14px', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ fontSize: '1.5rem' }}>☀️</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Kothagudem — {weather.temperature}</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{weather.current_season} Season • {weather.humidity} humidity</div>
            </div>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#0ea5e9', textAlign: 'right' }}>
            Best months:<br />
            <span style={{ fontWeight: 700 }}>Oct – Feb</span>
          </div>
        </div>
      </div>

      {/* ── Categories ─────────────────────────────── */}
      <section style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.1rem' }}>Browse by Category</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem' }}>
          {CATEGORIES.slice(0, 10).map(cat => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(`/explore?category=${cat.id}`)}
              style={{
                background: '#12121a', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px', padding: '0.65rem 0.25rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '1.3rem' }}>{cat.icon}</div>
              <div style={{ fontSize: '0.58rem', color: '#94a3b8', fontWeight: 600, textAlign: 'center', lineHeight: 1.2 }}>
                {cat.name.split(' ')[0]}
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── Featured Places ─────────────────────────── */}
      <section style={{ padding: '0.5rem 1.25rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: '1.1rem' }}>✨ Must-Visit Places</h2>
            <p style={{ fontSize: '0.72rem', color: '#64748b' }}>Top-rated in Bhadradri district</p>
          </div>
          <button onClick={() => navigate('/explore')} style={{ background: 'none', border: 'none', color: '#f97316', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View all <ArrowRight size={14} />
          </button>
        </div>
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {featured.slice(0, 3).map(place => (
            <motion.div key={place.id} variants={fadeUp}>
              <PlaceCard place={place} />
            </motion.div>
          ))}
        </motion.div>
      </section>



      {/* ── Mana Uru Section ─────────────────────── */}
      <section style={{ padding: '0.5rem 1.25rem 1.5rem' }}>
        <h2 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>🏙️ Mana Uru Kothagudem</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {[
            { emoji: '🌊', name: 'Bogatha Waterfall', tag: 'Niagara of Telangana', color: '#0ea5e9', id: 'p2' },
            { emoji: '🕌', name: 'Bhadrachalam Temple', tag: 'Sacred Vaishnava Shrine', color: '#a855f7', id: 'p1' },
            { emoji: '🐯', name: 'Kinnerasani Sanctuary', tag: '635 km² Forest Reserve', color: '#22c55e', id: 'p3' },
            { emoji: '🏕️', name: 'Tribal Culture', tag: 'Authentic Forest Life', color: '#f97316', id: 'p7' },
          ].map(item => (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/place/${item.id}`)}
              style={{
                background: `rgba(${item.color === '#0ea5e9' ? '14,165,233' : item.color === '#a855f7' ? '168,85,247' : item.color === '#22c55e' ? '34,197,94' : '249,115,22'},0.08)`,
                border: `1px solid ${item.color}30`,
                borderRadius: '16px', padding: '1rem', cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{item.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.2rem' }}>{item.name}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{item.tag}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom padding for nav */}
      <div style={{ height: '5rem' }} />
    </div>
  );
};

export default Home;

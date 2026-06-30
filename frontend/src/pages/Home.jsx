import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, AlertTriangle, Zap, Calendar, CloudLightning, 
  Wind, TrendingUp, Building2, Users, FileText, Speaker, 
  ArrowRight, ShieldAlert, Navigation
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../stores/useStore';
import { MIRYALAGUDA_NEWS, LOCAL_ALERTS } from '../data/newsData';
import { TOURIST_PLACES, RESTAURANTS } from '../data/miryalagudaData';
import NewsCard from '../components/news/NewsCard';

const Home = () => {
  const navigate = useNavigate();
  const { setActiveTab } = useStore();
  const [activeArea, setActiveArea] = useState('Vidyanagar');

  useEffect(() => setActiveTab('home'), []);

  // MOCK DATA FOR NEW MVP SECTIONS
  const AQI = { score: 42, status: 'Good', color: 'text-green-500' };
  const WEATHER = { temp: '32°C', condition: 'Partly Cloudy' };
  
  const BREAKING_NEWS = MIRYALAGUDA_NEWS.find(n => n.category === 'emergency') || MIRYALAGUDA_NEWS[0];
  const TRENDING_NEWS = MIRYALAGUDA_NEWS.filter(n => n.trending);
  const LATEST_NEWS = MIRYALAGUDA_NEWS.slice(0, 4);
  const NEWS_NEAR_YOU = MIRYALAGUDA_NEWS.filter(n => n.location.includes(activeArea) || true).slice(0, 3); // Fallback to all if empty
  const MOST_VIEWED = [...MIRYALAGUDA_NEWS].sort((a, b) => parseInt(b.views) - parseInt(a.views)).slice(0, 3);
  
  const EVENTS = [
    { id: 1, title: 'Miryalaguda Book Fair', date: 'Oct 15 - Oct 20', location: 'Municipal Grounds' },
    { id: 2, title: 'Local Farmers Market', date: 'Every Sunday', location: 'Rythu Bazar' }
  ];

  const NOTICES = [
    { id: 1, title: 'Property Tax Deadline Extended', dept: 'Municipality' },
    { id: 2, title: 'New EV Charging Station Opens', dept: 'Transport' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      
      {/* ── 1. WEATHER & AQI (Top Bar) ── */}
      <div className="bg-[#12121a] border-b border-white/5 px-4 py-3 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <CloudLightning size={16} className="text-blue-400" />
            <span className="text-xs font-bold">{WEATHER.temp}</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Wind size={16} className={AQI.color} />
            <span className="text-xs font-bold">AQI: {AQI.score} ({AQI.status})</span>
          </div>
        </div>
        <div className="text-[10px] font-black tracking-widest text-slate-500 uppercase flex items-center gap-1">
          <MapPin size={10} /> Miryalaguda
        </div>
      </div>

      {/* ── 2. BREAKING NEWS & EMERGENCY ALERTS ── */}
      <div className="px-4 py-4">
        {/* Emergency Ticker */}
        {LOCAL_ALERTS.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 flex items-center gap-3">
            <ShieldAlert size={18} className="text-red-500 animate-pulse flex-shrink-0" />
            <div className="text-xs font-bold text-red-200 line-clamp-1">
              <span className="text-red-500 uppercase mr-2">ALERT:</span> 
              {LOCAL_ALERTS[0].message}
            </div>
          </div>
        )}

        {/* Breaking News Hero */}
        <div className="relative rounded-2xl overflow-hidden h-64 mb-8 border border-white/10 shadow-2xl" onClick={() => navigate('/news')}>
          <img src={BREAKING_NEWS.image} className="absolute inset-0 w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded inline-block mb-2 uppercase tracking-wider animate-pulse">
              Breaking News
            </div>
            <h2 className="text-xl font-black leading-tight mb-2">{BREAKING_NEWS.title}</h2>
            <p className="text-xs text-slate-300 line-clamp-2">{BREAKING_NEWS.summary}</p>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4">
        <div className="row g-4">
          
          {/* ── 3 & 4. TRENDING & LATEST NEWS ── */}
          <div className="col-12 col-md-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-lg flex items-center gap-2"><TrendingUp size={20} className="text-orange-500" /> Trending News</h3>
              <button onClick={() => navigate('/news')} className="text-xs text-orange-500 font-bold">See All</button>
            </div>
            <div className="row g-3 mb-6">
              {TRENDING_NEWS.slice(0,2).map(news => (
                <div key={news.id} className="col-6">
                  <div className="glass rounded-xl overflow-hidden h-full border border-white/5">
                    <img src={news.image} className="w-full h-24 object-cover" />
                    <div className="p-3">
                      <h4 className="text-xs font-bold line-clamp-2 leading-snug">{news.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-black text-lg mb-4 flex items-center gap-2"><Zap size={20} className="text-yellow-500" /> Latest News</h3>
            <div className="flex flex-col gap-3">
              {LATEST_NEWS.map(news => (
                <NewsCard key={news.id} news={news} horizontal />
              ))}
            </div>
          </div>

          {/* ── 5. NEWS NEAR YOU & MOST VIEWED (Sidebar) ── */}
          <div className="col-12 col-md-4">
            <div className="glass p-4 rounded-2xl border border-white/5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-sm flex items-center gap-2"><Navigation size={16} className="text-blue-500" /> News Near You</h3>
                <select 
                  className="bg-[#0a0a0f] text-[10px] font-bold px-2 py-1 rounded border border-white/10 outline-none"
                  value={activeArea} onChange={(e) => setActiveArea(e.target.value)}
                >
                  <option value="Vidyanagar">Vidyanagar</option>
                  <option value="Paloncha">Paloncha</option>
                  <option value="Main Road">Main Road</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                {NEWS_NEAR_YOU.map(news => (
                  <div key={news.id} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <h4 className="text-xs font-bold leading-snug mb-1">{news.title}</h4>
                    <span className="text-[10px] text-slate-500">{news.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-4 rounded-2xl border border-white/5">
              <h3 className="font-black text-sm mb-4">🔥 Most Viewed Articles</h3>
              <div className="flex flex-col gap-3">
                {MOST_VIEWED.map((news, idx) => (
                  <div key={news.id} className="flex gap-3 items-start">
                    <div className="text-xl font-black text-slate-700">0{idx+1}</div>
                    <div>
                      <h4 className="text-xs font-bold leading-snug mb-1">{news.title}</h4>
                      <span className="text-[10px] text-orange-500 font-bold">{news.views} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* ── 6. MANA URU HIGHLIGHTS & BUSINESSES ── */}
      <div className="px-4 mt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-lg flex items-center gap-2"><Building2 size={20} className="text-purple-500" /> Mana Uru Highlights</h3>
          <button onClick={() => navigate('/explore')} className="text-xs text-purple-500 font-bold">Explore Directory</button>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-none">
          {[...TOURIST_PLACES.slice(0,2), ...RESTAURANTS.slice(0,2)].map(place => (
            <div key={place.id} className="w-48 flex-shrink-0 glass rounded-xl overflow-hidden border border-white/5">
              <img src={place.images[0]} className="w-full h-28 object-cover" />
              <div className="p-3">
                <h4 className="text-xs font-bold truncate">{place.name}</h4>
                <p className="text-[10px] text-slate-400 truncate">{place.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 7. EVENTS, COMMUNITY, NOTICES ── */}
      <div className="container-fluid px-4 mt-6">
        <div className="row g-3">
          {/* Events */}
          <div className="col-12 col-md-4">
            <div className="glass p-4 rounded-2xl border border-white/5 h-full">
              <h3 className="font-black text-sm mb-4 flex items-center gap-2"><Calendar size={16} className="text-pink-500" /> Upcoming Events</h3>
              <div className="flex flex-col gap-3">
                {EVENTS.map(ev => (
                  <div key={ev.id} className="bg-white/5 p-3 rounded-lg border border-white/5">
                    <h4 className="text-xs font-bold text-pink-300">{ev.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">{ev.date} • {ev.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Community Updates */}
          <div className="col-12 col-md-4">
            <div className="glass p-4 rounded-2xl border border-white/5 h-full">
              <h3 className="font-black text-sm mb-4 flex items-center gap-2"><Users size={16} className="text-green-500" /> Community Updates</h3>
              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 text-xs text-green-100">
                <span className="font-bold text-green-400 block mb-1">Blood Donation Camp</span>
                Tomorrow at Govt Hospital. 50+ donors registered. Join us!
              </div>
            </div>
          </div>

          {/* Notices */}
          <div className="col-12 col-md-4">
            <div className="glass p-4 rounded-2xl border border-white/5 h-full">
              <h3 className="font-black text-sm mb-4 flex items-center gap-2"><Speaker size={16} className="text-blue-500" /> Govt Notices</h3>
              <div className="flex flex-col gap-2">
                {NOTICES.map(notice => (
                  <div key={notice.id} className="flex gap-2 items-start">
                    <FileText size={14} className="text-slate-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] font-bold">{notice.title}</h4>
                      <p className="text-[9px] text-slate-400">{notice.dept}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;

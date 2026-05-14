import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Search, Filter, RefreshCw, 
  ChevronRight, Sparkles, AlertTriangle,
  Zap, Info, TrendingUp
} from 'lucide-react';
import { KOTHAGUDEM_NEWS, NEWS_CATEGORIES, LOCAL_ALERTS, KOTHAGUDEM_ARTICLES } from '../data/newsData';
import NewsCard from '../components/news/NewsCard';
import { BookOpen, Heart } from 'lucide-react';

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeArea, setActiveArea] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique areas
  const uniqueAreas = useMemo(() => {
    const areas = new Set(KOTHAGUDEM_NEWS.map(n => n.location));
    return ['all', ...Array.from(areas)];
  }, []);

  const filteredNews = useMemo(() => {
    let result = KOTHAGUDEM_NEWS;
    if (activeCategory !== 'all') {
      result = result.filter(n => n.category === activeCategory);
    }
    if (activeArea !== 'all') {
      result = result.filter(n => n.location === activeArea);
    }
    if (searchQuery) {
      result = result.filter(n => 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [activeCategory, activeArea, searchQuery]);

  const trendingNews = useMemo(() => KOTHAGUDEM_NEWS.filter(n => n.trending), []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-[4.5rem] pb-[5.5rem] text-white">
      
      {/* ─── HEADER ─── */}
      <div className="px-5 mb-6">
        <div className="flex justify-between items-center mb-5">
           <div>
              <h1 className="text-2xl font-black">
                Hyperlocal <span className="gradient-text">News</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">Kothagudem & Bhadradri District</p>
           </div>
           <div className="flex gap-2">
              <motion.button whileTap={{ scale: 0.9 }} className="p-2.5 glass rounded-xl border-white/5 relative">
                 <Bell size={18} className="text-orange-500" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping" />
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} className="p-2.5 glass rounded-xl border-white/5">
                 <RefreshCw size={18} className="text-slate-400" />
              </motion.button>
           </div>
        </div>

        {/* Local Alerts Ticker */}
        <div className="mb-6">
           <div className="glass-orange p-3 rounded-2xl border-orange-500/10 flex items-start gap-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-5">
                 <Zap size={60} fill="currentColor" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                 <AlertTriangle size={20} className="text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                 <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black text-orange-500 uppercase">Flash Alert</span>
                    <span className="text-[9px] text-slate-500 font-bold">{LOCAL_ALERTS[0].time}</span>
                 </div>
                 <p className="text-[11px] font-bold leading-relaxed pr-6">
                   {LOCAL_ALERTS[0].message}
                 </p>
              </div>
           </div>
        </div>

        {/* Categories Scroller */}
        <div className="flex overflow-x-auto gap-2 pb-2 -mx-5 px-5 scrollbar-none mb-3">
           {NEWS_CATEGORIES.map(cat => (
             <motion.button
               key={cat.id}
               whileTap={{ scale: 0.9 }}
               onClick={() => setActiveCategory(cat.id)}
               className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                 activeCategory === cat.id 
                 ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                 : 'glass border-white/5 text-slate-400'
               }`}
             >
               <span>{cat.icon}</span>
               {cat.label}
             </motion.button>
           ))}
        </div>

        {/* Hyperlocal Area Filter */}
        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5">
           <Filter size={14} className="text-slate-400 ml-2" />
           <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">News Near You:</span>
           <select 
             className="bg-transparent text-xs font-bold text-white outline-none flex-1 appearance-none cursor-pointer"
             value={activeArea}
             onChange={(e) => setActiveArea(e.target.value)}
           >
              <option value="all" className="bg-[#12121a]">All Areas</option>
              {uniqueAreas.filter(a => a !== 'all').map(area => (
                 <option key={area} value={area} className="bg-[#12121a]">
                    📍 {area}
                 </option>
              ))}
           </select>
        </div>
      </div>

      {/* ─── TRENDING NOW (Horizontal) ─── */}
      {activeCategory === 'all' && (
        <div className="mb-8">
           <div className="px-5 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                 <TrendingUp size={18} className="text-red-500" />
                 <h2 className="font-black text-sm tracking-tight uppercase">Trending Now</h2>
              </div>
              <ChevronRight size={16} className="text-slate-500" />
           </div>
           <div className="flex overflow-x-auto gap-4 px-5 pb-2 scrollbar-none">
              {trendingNews.map(news => (
                <div key={news.id} className="w-[280px] flex-shrink-0">
                   <NewsCard news={news} />
                </div>
              ))}
           </div>
        </div>
      )}

      {/* ─── FEATURED ARTICLES (Immersive) ─── */}
      {activeCategory === 'all' && (
        <div className="mb-10">
           <div className="px-5 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                 <BookOpen size={18} className="text-purple-500" />
                 <h2 className="font-black text-sm tracking-tight uppercase">Featured Articles</h2>
              </div>
              <span className="text-[10px] font-bold text-slate-500">KOTHAGUDEM HERITAGE</span>
           </div>
           <div className="flex overflow-x-auto gap-5 px-5 pb-2 scrollbar-none">
              {KOTHAGUDEM_ARTICLES.map(art => (
                <motion.div 
                  key={art.id} 
                  whileTap={{ scale: 0.98 }}
                  className="w-[300px] flex-shrink-0 glass rounded-3xl overflow-hidden border-white/5 shadow-2xl"
                >
                   <div className="relative h-40">
                      <img src={art.image} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute top-3 left-3 bg-purple-600 text-white text-[9px] font-black px-2 py-1 rounded-md">
                        {art.category.toUpperCase()}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                         <h4 className="text-sm font-black leading-tight text-white line-clamp-2">
                           {art.title}
                         </h4>
                      </div>
                   </div>
                   <div className="p-4">
                      <p className="text-[11px] text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                        {art.summary}
                      </p>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                            <Clock size={10} /> {art.readTime}
                         </div>
                         <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                            <Heart size={10} className="text-red-500" fill="currentColor" /> {art.likes}
                         </div>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      )}

      {/* ─── MAIN FEED ─── */}
      <div className="px-5">
         <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-sm tracking-tight uppercase">
              {activeCategory === 'all' ? 'Latest Updates' : `${activeCategory} News`}
            </h2>
            <div className="text-[10px] font-bold text-slate-500">
              {filteredNews.length} ARTICLES
            </div>
         </div>

         <div className="space-y-4">
            {filteredNews.map((news, idx) => (
               <motion.div
                 key={news.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.1 }}
               >
                 {/* For variety, some news are horizontal, some vertical */}
                 <NewsCard news={news} horizontal={idx % 3 !== 0} />
               </motion.div>
            ))}

            {filteredNews.length === 0 && (
              <div className="py-20 text-center glass rounded-3xl border-white/5">
                 <div className="text-3xl mb-3">🗞️</div>
                 <p className="text-slate-500 text-sm font-bold">No news found in this category</p>
                 <button 
                   onClick={() => setActiveCategory('all')}
                   className="mt-4 text-orange-500 text-xs font-black uppercase tracking-widest"
                 >
                   Reset Filters
                 </button>
              </div>
            )}
         </div>
      </div>

      {/* ─── BOTTOM CTA: JOIN REPORTERS ─── */}
      <div className="mt-12 px-5 pb-8">
         <div className="glass p-5 rounded-3xl border-white/5 relative overflow-hidden text-center bg-gradient-to-br from-orange-500/10 to-purple-500/10">
            <div className="relative z-10">
               <h3 className="text-lg font-black mb-1">Become a Local Reporter</h3>
               <p className="text-xs text-slate-400 mb-5 max-w-[240px] mx-auto leading-relaxed">
                 Spot news in your area? Share verified updates and earn a verified contributor badge.
               </p>
               <motion.button
                 whileTap={{ scale: 0.95 }}
                 className="btn-primary px-8 py-3 text-xs font-black"
               >
                 APPLY NOW
               </motion.button>
            </div>
            <Sparkles className="absolute top-2 left-2 text-orange-500/10 w-20 h-20" />
            <Sparkles className="absolute bottom-2 right-2 text-purple-500/10 w-20 h-20" />
         </div>
      </div>

    </div>
  );
};

export default NewsPage;

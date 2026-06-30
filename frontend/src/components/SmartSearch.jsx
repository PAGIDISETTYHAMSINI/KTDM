import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Newspaper, MapPin, Calendar, Store, Tag, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MIRYALAGUDA_NEWS } from '../data/newsData';
import { TOURIST_PLACES, RESTAURANTS } from '../data/miryalagudaData';

// Aggregate all searchable items into one list
const ALL_ITEMS = [
  ...MIRYALAGUDA_NEWS.map(n => ({ ...n, _type: 'news', _icon: '🗞️', _label: n.category })),
  ...TOURIST_PLACES.map(p => ({ ...p, _type: 'place', _icon: '📍', _label: p.category, summary: p.description })),
  ...RESTAURANTS.map(r => ({ ...r, _type: 'restaurant', _icon: '🍽️', _label: 'Food', summary: r.description })),
];

const TYPE_COLORS = {
  news: 'text-orange-400',
  place: 'text-blue-400',
  restaurant: 'text-green-400',
};

const POPULAR_TAGS = [
  'Hospitals', 'Elections', 'Water Supply', 'Waterfalls',
  'Restaurants', 'SCCL', 'Festivals', 'Road'
];

const SmartSearch = () => {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ALL_ITEMS.filter(item =>
      item.title?.toLowerCase().includes(q) ||
      item.name?.toLowerCase().includes(q) ||
      item.summary?.toLowerCase().includes(q) ||
      item._label?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [query]);

  const handleSelect = (item) => {
    if (item._type === 'news') navigate('/news');
    else navigate(`/place/${item.id}`);
    setActive(false);
    setQuery('');
  };

  return (
    <div className="relative z-50 w-full">
      {/* Search Bar */}
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${
        active ? 'border-orange-500/60 bg-[#12121a]' : 'border-white/10 bg-[#12121a]'
      }`}>
        <Search size={18} className={active ? 'text-orange-500' : 'text-slate-500'} />
        <input
          type="text"
          placeholder="Search news, places, events, businesses..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setActive(true)}
          className="bg-transparent flex-1 outline-none text-sm text-white placeholder:text-slate-500"
        />
        {query && (
          <button onClick={() => setQuery('')}>
            <X size={16} className="text-slate-500" />
          </button>
        )}
      </div>

      {/* Overlay Backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-40"
            onClick={() => { setActive(false); setQuery(''); }}
          />
        )}
      </AnimatePresence>

      {/* Results Dropdown */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#12121a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 max-h-[70vh] overflow-y-auto"
          >
            {/* No Query: Show Popular Tags */}
            {!query && (
              <div className="p-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">🔥 Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-slate-300 hover:bg-white/10 transition-colors flex items-center gap-1"
                    >
                      <Tag size={10} /> {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {query && results.length > 0 && (
              <div className="divide-y divide-white/5">
                <p className="px-4 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {results.length} results for "{query}"
                </p>
                {results.map(item => (
                  <motion.button
                    key={`${item._type}-${item.id}`}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleSelect(item)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                  >
                    {/* Thumbnail */}
                    {(item.image || (item.images && item.images[0])) ? (
                      <img
                        src={item.image || item.images[0]}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        alt=""
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl flex-shrink-0">
                        {item._icon}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{item.title || item.name}</h4>
                      <p className="text-xs text-slate-400 truncate">{item.summary || item.description}</p>
                    </div>
                    <div className={`text-[10px] font-black uppercase ${TYPE_COLORS[item._type]} flex-shrink-0`}>
                      {item._label}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* No Results */}
            {query && results.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                <Search size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm font-bold">No results for "{query}"</p>
                <p className="text-xs mt-1">Try "Hospitals", "Election", or "Waterfall"</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartSearch;

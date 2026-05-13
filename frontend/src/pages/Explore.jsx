import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Search, Navigation, Star, Clock, 
  Shield, Utensils, ShoppingBag, Hotel, 
  GraduationCap, Film, Compass, CloudRain,
  TrendingUp, Zap, Radio, LayoutGrid, Map as MapIcon,
  Filter, Bell, Sparkles, ChevronRight
} from 'lucide-react';
import useStore from '../stores/useStore';
import { KOTHAGUDEM_PLACES, LOCAL_NEWS, CURRENT_WEATHER, HIDDEN_GEMS, AI_SUGGESTIONS } from '../data/kothagudemFull';
import SectionRow from '../components/explore/SectionRow';
import { useGeolocation } from '../hooks/useGeolocation';

const ManaUru = () => {
  const { setActiveTab, userLocation } = useStore();
  const { loading: locLoading } = useGeolocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  useEffect(() => {
    setActiveTab('explore');
  }, [setActiveTab]);

  // AI Recommendation Logic: Get places based on time/weather
  const aiRecs = useMemo(() => {
    const hour = new Date().getHours();
    let timeKey = 'morning';
    if (hour >= 11 && hour < 17) timeKey = 'afternoon';
    else if (hour >= 17 && hour < 22) timeKey = 'evening';
    
    const suggestedCats = AI_SUGGESTIONS[timeKey].places;
    const allPlaces = Object.values(KOTHAGUDEM_PLACES).flat();
    
    return {
      title: `AI Pick for ${AI_SUGGESTIONS[timeKey].time}`,
      reason: AI_SUGGESTIONS[timeKey].reason,
      places: allPlaces.filter(p => suggestedCats.some(c => p.name.includes(c) || p.tags?.some(t => c.toLowerCase().includes(t.toLowerCase())))).slice(0, 5)
    };
  }, []);

  // Filter logic for search
  const allPlaces = useMemo(() => Object.values(KOTHAGUDEM_PLACES).flat(), []);
  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return allPlaces.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, allPlaces]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-[4.5rem] pb-[5.5rem] text-white overflow-x-hidden">
      
      {/* ─── TOP HEADER & SMART WIDGETS ─── */}
      <div className="px-5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2">
              Mana <span className="gradient-text">Uru</span>
              <Sparkles className="text-purple-500 w-5 h-5 animate-pulse" />
            </h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide">SMART CITY DISCOVERY ENGINE</p>
          </div>
          <div className="flex gap-2">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
              className="p-2.5 glass rounded-xl border-white/10"
            >
              {viewMode === 'list' ? <MapIcon size={18} className="text-orange-500" /> : <LayoutGrid size={18} className="text-orange-500" />}
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} className="p-2.5 glass rounded-xl border-white/10">
              <Bell size={18} className="text-slate-400" />
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            <Search size={18} />
          </div>
          <input 
            type="text"
            placeholder="Explore shops, hospitals, food, waterfalls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3.5 pl-12 pr-4 glass border-white/5 rounded-2xl text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">
            <Zap size={16} fill="currentColor" className="animate-pulse" />
          </div>
        </div>

        {/* Live News & Weather Widget */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="glass-orange p-3 rounded-2xl border-orange-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Radio size={14} className="text-orange-500 animate-pulse" />
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-tighter">Live News</span>
            </div>
            <div className="h-10 overflow-hidden">
               <motion.div 
                 animate={{ y: [0, -40, -80, -120] }} 
                 transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                 className="space-y-4"
               >
                 {LOCAL_NEWS.slice(0, 4).map(n => (
                   <div key={n.id} className="text-[11px] font-bold leading-tight line-clamp-2">
                     {n.icon} {n.title}
                   </div>
                 ))}
               </motion.div>
            </div>
          </div>
          
          <div className="glass p-3 rounded-2xl border-white/5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl">{CURRENT_WEATHER.icon}</span>
              <span className="text-lg font-black tracking-tighter">{CURRENT_WEATHER.temp}</span>
            </div>
            <div className="text-[10px] text-slate-500 font-bold truncate">
              {CURRENT_WEATHER.condition} • {CURRENT_WEATHER.travel_tip.split('—')[0]}
            </div>
          </div>
        </div>
      </div>

      {/* ─── SEARCH RESULTS ─── */}
      <AnimatePresence>
        {searchQuery && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-5 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-400 text-sm">Found {searchResults.length} results</h2>
              <button onClick={() => setSearchQuery('')} className="text-xs text-orange-500 font-bold">Clear</button>
            </div>
            <div className="space-y-3">
               {searchResults.length > 0 ? (
                 searchResults.map(p => (
                   <div key={p.id} className="glass p-3 rounded-2xl flex gap-4 items-center">
                      <img src={p.images[0]} className="w-16 h-16 rounded-xl object-cover" alt="" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate">{p.name}</h4>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                          <MapPin size={10} /> {p.address}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                           <span className="text-[10px] font-bold text-orange-500 flex items-center gap-0.5">
                             <Star size={10} fill="currentColor" /> {p.rating}
                           </span>
                           <span className="text-[10px] text-slate-600">{(p.reviews || 0).toLocaleString()} reviews</span>
                        </div>
                      </div>
                      <motion.button whileTap={{ scale: 0.9 }} className="p-2 bg-orange-500 rounded-lg">
                         <Navigation size={14} className="text-white" />
                      </motion.button>
                   </div>
                 ))
               ) : (
                 <div className="text-center py-10">
                    <p className="text-slate-500 text-sm">No results for "{searchQuery}"</p>
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!searchQuery && (
        <div className="space-y-2">
          {/* 1. Restaurants & Food Spots */}
          <SectionRow 
            title="Restaurants & Food Spots"
            emoji="🍛"
            places={KOTHAGUDEM_PLACES.restaurants}
            color="#f97316"
          />

          {/* 2. Hospitals & Clinics */}
          <SectionRow 
            title="Hospitals & Clinics"
            emoji="🏥"
            places={KOTHAGUDEM_PLACES.hospitals}
            color="#dc2626"
          />

          {/* 3. Hotels & Lodging */}
          <SectionRow 
            title="Hotels & Lodging"
            emoji="🏨"
            places={KOTHAGUDEM_PLACES.hotels}
            color="#6366f1"
          />

          {/* 4. Temples & Cultural Places */}
          <SectionRow 
            title="Temples & Cultural Places"
            emoji="🕌"
            places={KOTHAGUDEM_PLACES.temples}
            color="#a855f7"
          />

          {/* 5. Shopping & Markets */}
          <SectionRow 
            title="Shopping & Markets"
            emoji="🛍️"
            places={KOTHAGUDEM_PLACES.shopping}
            color="#3b82f6"
          />

          {/* 6. Tourist Attractions */}
          <SectionRow 
            title="Tourist Attractions"
            emoji="🏛️"
            places={KOTHAGUDEM_PLACES.tourist}
            color="#ec4899"
          />

          {/* Additional Smart Sections */}
          <div className="pt-4 px-5 pb-2">
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Smart Discovery</h3>
          </div>

          <SectionRow 
            title="Trending in Kothagudem"
            emoji="🔥"
            places={[...KOTHAGUDEM_PLACES.tourist, ...KOTHAGUDEM_PLACES.restaurants].sort((a,b) => b.rating - a.rating).slice(0, 6)}
            color="#ef4444"
          />

          <SectionRow 
            title="Hidden Gems"
            emoji="💎"
            places={HIDDEN_GEMS}
            color="#10b981"
          />

          <SectionRow 
            title={aiRecs.title}
            emoji="🤖"
            places={aiRecs.places}
            color="#a855f7"
          />
        </div>
      )}

      {/* ─── BOTTOM FLOATING BAR FOR MOBILE ─── */}
      <div className="fixed bottom-20 left-5 right-5 z-[40]">
         <motion.div 
           initial={{ y: 50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="glass p-4 rounded-3xl border-white/10 flex items-center justify-between shadow-2xl"
         >
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                  <MapPin size={20} />
               </div>
               <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nearby Kothagudem</div>
                  <div className="text-xs font-bold truncate max-w-[150px]">Detecting Live Location...</div>
               </div>
            </div>
            <button className="bg-orange-500 text-white px-5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5">
               <Zap size={14} fill="currentColor" /> SYNC MAP
            </button>
         </motion.div>
      </div>

    </div>
  );
};

export default ManaUru;

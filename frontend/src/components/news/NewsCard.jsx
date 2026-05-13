import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Clock, MapPin, Eye, Share2, TrendingUp } from 'lucide-react';

const NewsCard = ({ news, horizontal = false }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="glass border-white/5 overflow-hidden rounded-2xl flex flex-col h-full"
      style={{
        flexDirection: horizontal ? 'row' : 'column',
      }}
    >
      {/* Image Area */}
      <div className={`relative ${horizontal ? 'w-32' : 'w-full h-48'} flex-shrink-0`}>
        <img 
          src={news.image} 
          className="w-full h-full object-cover" 
          alt={news.title} 
          loading="lazy"
        />
        {news.trending && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
             <TrendingUp size={10} /> TRENDING
          </div>
        )}
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-2 left-2 text-[10px] text-white/80 font-bold flex items-center gap-1">
           <MapPin size={10} /> {news.location}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
           <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">
             {news.category}
           </span>
           <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
              <Clock size={10} /> {news.time}
           </div>
        </div>

        <h3 className={`font-bold leading-tight mb-2 ${horizontal ? 'text-sm line-clamp-2' : 'text-lg line-clamp-3'}`}>
          {news.title}
        </h3>

        {!horizontal && (
          <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            {news.summary}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                {news.author.charAt(0)}
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-slate-300 flex items-center gap-1">
                   {news.author.split(',')[0]}
                   {news.verified && <BadgeCheck size={12} className="text-blue-500" fill="currentColor" />}
                 </span>
                 <span className="text-[9px] text-slate-500">{news.author.split(',')[1]}</span>
              </div>
           </div>
           <div className="flex items-center gap-3 text-slate-500">
              <div className="flex items-center gap-1 text-[10px] font-bold">
                 <Eye size={12} /> {news.views}
              </div>
              <motion.button whileTap={{ scale: 0.8 }}>
                 <Share2 size={12} />
              </motion.button>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;

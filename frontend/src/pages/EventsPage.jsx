import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ChevronRight, Filter } from 'lucide-react';

const EVENTS_DATA = [
  {
    id: 1,
    title: 'Miryalaguda Book Fair 2024',
    category: 'Cultural',
    date: 'Oct 15 – Oct 20',
    time: '10:00 AM – 8:00 PM',
    location: 'Municipal Grounds, Miryalaguda',
    description: 'Annual book fair featuring over 200 stalls from publishers across Telangana. Free entry for students.',
    attendees: 1200,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
    color: '#a855f7',
    emoji: '📚',
  },
  {
    id: 2,
    title: 'Blood Donation Camp',
    category: 'Healthcare',
    date: 'Jul 01, 2024',
    time: '9:00 AM – 4:00 PM',
    location: 'Govt. District Hospital',
    description: 'Organized by Red Cross in association with the District Administration. Donors will receive free health checkup.',
    attendees: 340,
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61059e0?w=600',
    color: '#ef4444',
    emoji: '🩸',
  },
  {
    id: 3,
    title: 'Local Farmers Market',
    category: 'Community',
    date: 'Every Sunday',
    time: '6:00 AM – 12:00 PM',
    location: 'Rythu Bazar, Main Road',
    description: 'Fresh organic vegetables, fruits, and local produce directly from farmers. Cashless payments accepted.',
    attendees: 500,
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600',
    color: '#22c55e',
    emoji: '🌽',
  },
  {
    id: 4,
    title: 'Krishna Pushkaralu Celebrations',
    category: 'Religious',
    date: 'Aug 12 – Aug 23',
    time: 'All Day',
    location: 'Krishna River Ghats',
    description: 'Grand 12-day festival on the banks of the Krishna river with spiritual gatherings, cultural programs, and folk performances.',
    attendees: 50000,
    image: 'https://images.unsplash.com/photo-1514525253344-933399436329?w=600',
    color: '#f97316',
    emoji: '🪔',
  },
  {
    id: 5,
    title: 'District Level Sports Tournament',
    category: 'Sports',
    date: 'Jul 20 – Jul 25',
    time: '8:00 AM onwards',
    location: 'Indoor Stadium, Miryalaguda',
    description: 'Kabaddi, volleyball, and chess competitions for youth aged 14–22. Registration open until July 15.',
    attendees: 800,
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600',
    color: '#0ea5e9',
    emoji: '🏆',
  },
  {
    id: 6,
    title: 'Government Free Medical Camp',
    category: 'Healthcare',
    date: 'Jul 5, 2024',
    time: '9:00 AM – 1:00 PM',
    location: 'Primary Health Center, Nallapadu',
    description: 'Free consultation, blood sugar testing, BP screening, and medicine distribution for senior citizens.',
    attendees: 250,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
    color: '#10b981',
    emoji: '🏥',
  },
];

const EVENT_CATEGORIES = ['All', 'Cultural', 'Healthcare', 'Community', 'Religious', 'Sports'];

const EventsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [calendarView, setCalendarView] = useState(false);

  const filtered = activeCategory === 'All'
    ? EVENTS_DATA
    : EVENTS_DATA.filter(e => e.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pt-20 pb-24 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black mb-1">
          Upcoming <span className="gradient-text">Events</span>
        </h1>
        <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Miryalaguda, Nalgonda District</p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setCalendarView(false)}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${!calendarView ? 'bg-orange-500 text-white' : 'glass text-slate-400 border border-white/5'}`}
        >
          📋 List View
        </button>
        <button
          onClick={() => setCalendarView(true)}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${calendarView ? 'bg-orange-500 text-white' : 'glass text-slate-400 border border-white/5'}`}
        >
          📅 Calendar
        </button>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto gap-2 pb-3 -mx-4 px-4 scrollbar-none mb-6">
        {EVENT_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${
              activeCategory === cat
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white/5 text-slate-400 border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Calendar View Mock */}
      {calendarView ? (
        <div className="glass rounded-2xl border border-white/5 p-4 mb-6">
          <div className="text-center font-black text-lg mb-4">July 2024</div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-500 mb-2">
            {['S','M','T','W','T','F','S'].map((d,i) => <div key={i}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(31)].map((_, i) => {
              const day = i + 1;
              const hasEvent = [1, 5, 15, 20, 21, 22].includes(day);
              return (
                <div key={day} className={`aspect-square flex items-center justify-center rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  hasEvent ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : 'text-slate-400 hover:bg-white/5'
                }`}>
                  {day}
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-500 text-center mt-3">🟠 Orange = Events on that day</p>
        </div>
      ) : null}

      {/* Events List */}
      <div className="space-y-4">
        {filtered.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="glass rounded-2xl overflow-hidden border border-white/5"
          >
            {/* Image */}
            <div className="relative h-40">
              <img src={event.image} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] to-transparent" />
              <div
                className="absolute top-3 left-3 text-white text-[10px] font-black px-2.5 py-1 rounded-full"
                style={{ background: event.color }}
              >
                {event.emoji} {event.category}
              </div>
              <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Users size={10} /> {event.attendees.toLocaleString()}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-black text-base mb-3 leading-tight">{event.title}</h3>
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Calendar size={12} className="text-orange-500" />
                  <span className="font-bold">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock size={12} className="text-blue-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <MapPin size={12} className="text-green-500" />
                  <span>{event.location}</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">{event.description}</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-orange-500 text-white text-xs font-black py-2.5 rounded-xl">
                  Interested
                </button>
                <button className="flex items-center justify-center w-10 h-10 glass rounded-xl border border-white/5">
                  <ChevronRight size={16} className="text-slate-400" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;

import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Shield, Bell, LogOut, ChevronRight, BadgeCheck } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-[4.5rem] pb-[5.5rem] text-white">
      <div className="px-5 mb-8">
        <h1 className="text-2xl font-black mb-6">Your <span className="gradient-text">Profile</span></h1>
        
        {/* Profile Card */}
        <div className="glass p-6 rounded-3xl border-white/5 flex flex-col items-center text-center relative overflow-hidden">
           <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-br from-orange-500/20 to-purple-500/20" />
           <div className="relative z-10">
              <div className="w-24 h-24 rounded-full border-4 border-[#0a0a0f] bg-slate-800 flex items-center justify-center text-3xl font-black mb-4 mx-auto overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-black flex items-center justify-center gap-2">
                Hamsini Pagidisetty
                <BadgeCheck size={20} className="text-blue-500" fill="currentColor" />
              </h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Verified Local Explorer</p>
           </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 grid grid-cols-3 gap-3 mb-8">
         {[
           { label: 'Saved', value: '12', color: 'orange' },
           { label: 'Reviews', value: '4', color: 'purple' },
           { label: 'Visits', value: '28', color: 'green' }
         ].map(s => (
           <div key={s.label} className="glass p-3 rounded-2xl border-white/5 text-center">
              <div className={`text-lg font-black text-${s.color}-500`}>{s.value}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">{s.label}</div>
           </div>
         ))}
      </div>

      {/* Menu */}
      <div className="px-5 space-y-3">
         {[
           { icon: User, label: 'Edit Account', sub: 'Personal information' },
           { icon: Bell, label: 'Notifications', sub: 'Local alerts & news' },
           { icon: Shield, label: 'Security', sub: 'Password & privacy' },
           { icon: Settings, label: 'Settings', sub: 'App preferences' },
         ].map((item, i) => (
           <motion.div 
             key={item.label}
             whileTap={{ scale: 0.98 }}
             className="glass p-4 rounded-2xl border-white/5 flex items-center justify-between"
           >
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                    <item.icon size={20} />
                 </div>
                 <div>
                    <div className="text-sm font-bold">{item.label}</div>
                    <div className="text-[10px] text-slate-500">{item.sub}</div>
                 </div>
              </div>
              <ChevronRight size={16} className="text-slate-700" />
           </motion.div>
         ))}

         <motion.button 
           whileTap={{ scale: 0.98 }}
           className="w-full p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center gap-2 font-bold text-sm mt-6"
         >
            <LogOut size={18} /> Logout
         </motion.button>
      </div>
    </div>
  );
};

export default Profile;

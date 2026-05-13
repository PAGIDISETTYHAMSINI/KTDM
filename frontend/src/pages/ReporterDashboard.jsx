import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, Image as ImageIcon, MapPin, 
  Tag, AlertCircle, CheckCircle2, 
  Clock, History, LayoutDashboard
} from 'lucide-react';

const ReporterDashboard = () => {
  const [form, setForm] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'general',
    area: 'Kothagudem Main',
    urgency: 'normal'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ title: '', summary: '', content: '', category: 'general', area: 'Kothagudem Main', urgency: 'normal' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-[4.5rem] pb-[5.5rem] text-white">
      <div className="px-5 mb-8">
        <h1 className="text-2xl font-black mb-1">Reporter <span className="gradient-text">Studio</span></h1>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">SUBMIT VERIFIED UPDATES</p>
      </div>

      <div className="px-5">
        <form onSubmit={handleSubmit} className="space-y-6">
           
           {/* Post Title */}
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Headline</label>
              <input 
                required
                type="text"
                placeholder="What is happening in Kothagudem?"
                className="w-full p-4 glass border-white/5 rounded-2xl text-sm focus:border-orange-500/50 outline-none transition-all"
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
              />
           </div>

           {/* Media Upload Mock */}
           <div className="grid grid-cols-2 gap-4">
              <div className="glass p-4 rounded-2xl border-dashed border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/5 transition-all">
                 <ImageIcon size={24} className="text-slate-500" />
                 <span className="text-[10px] font-bold text-slate-500">ADD PHOTOS</span>
              </div>
              <div className="glass p-4 rounded-2xl border-dashed border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/5 transition-all">
                 <MapPin size={24} className="text-slate-500" />
                 <span className="text-[10px] font-bold text-slate-500">ADD LOCATION</span>
              </div>
           </div>

           {/* Content */}
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Detailed Content</label>
              <textarea 
                required
                rows={6}
                placeholder="Describe the event, date, and people involved..."
                className="w-full p-4 glass border-white/5 rounded-2xl text-sm focus:border-orange-500/50 outline-none transition-all resize-none"
                value={form.content}
                onChange={e => setForm({...form, content: e.target.value})}
              />
           </div>

           {/* Tags & Metadata */}
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                 <select 
                   className="w-full p-3 glass border-white/5 rounded-xl text-xs font-bold text-slate-300 outline-none"
                   value={form.category}
                   onChange={e => setForm({...form, category: e.target.value})}
                 >
                    <option value="politics">Politics</option>
                    <option value="events">Events</option>
                    <option value="education">Education</option>
                    <option value="emergency">Emergency</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Urgency</label>
                 <select 
                   className="w-full p-3 glass border-white/5 rounded-xl text-xs font-bold text-slate-300 outline-none"
                   value={form.urgency}
                   onChange={e => setForm({...form, urgency: e.target.value})}
                 >
                    <option value="normal">Normal</option>
                    <option value="high">High Alert</option>
                    <option value="urgent">Urgent</option>
                 </select>
              </div>
           </div>

           {/* Submit Button */}
           <motion.button
             whileTap={{ scale: 0.95 }}
             type="submit"
             disabled={submitted}
             className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl transition-all ${
               submitted ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
             }`}
           >
              {submitted ? (
                <>
                  <CheckCircle2 size={18} /> SUBMITTED FOR APPROVAL
                </>
              ) : (
                <>
                  <Send size={18} /> SEND TO ADMIN
                </>
              )}
           </motion.button>
        </form>

        {/* History / Recent Submissions */}
        <div className="mt-12 space-y-4">
           <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-tight flex items-center gap-2">
                 <History size={16} className="text-slate-500" />
                 Recent Submissions
              </h2>
           </div>

           {[
             { title: 'New Park Opening in Paloncha', status: 'Approved', time: '2h ago' },
             { title: 'Traffic Diverted near Main Road', status: 'Pending', time: '5h ago' }
           ].map(post => (
             <div key={post.title} className="glass p-4 rounded-2xl border-white/5 flex items-center justify-between">
                <div>
                   <div className="text-xs font-bold mb-1">{post.title}</div>
                   <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock size={10} /> {post.time}
                   </div>
                </div>
                <div className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                  post.status === 'Approved' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                }`}>
                   {post.status}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ReporterDashboard;

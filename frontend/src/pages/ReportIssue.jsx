import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Camera, MapPin, Send, CheckCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ISSUE_CATEGORIES = [
  'Water Leakage', 'Garbage', 'Broken Roads', 'Street Lights', 
  'Traffic', 'Missing Persons', 'Missing Pets', 'Illegal Dumping', 
  'Civic Complaints', 'Public Safety'
];

const ReportIssue = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', category: '', area: '', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to backend
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => navigate('/'), 3000);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6 text-white text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-8 rounded-3xl border border-white/10 max-w-sm">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black mb-2">Report Submitted</h2>
          <p className="text-slate-400 text-sm">Your issue has been sent to the Admin for verification. Once approved, it will be published to the community.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-24 px-5">
      <div className="max-w-md mx-auto">
        
        <div className="mb-8">
          <h1 className="text-2xl font-black flex items-center gap-2 mb-2">
            <AlertTriangle className="text-orange-500" /> Report an Issue
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Help keep Miryalaguda clean and safe. Submit a civic complaint and our verified community reporters and admins will take it up.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Issue Category</label>
            <div className="flex flex-wrap gap-2">
              {ISSUE_CATEGORIES.map(cat => (
                <button
                  key={cat} type="button"
                  onClick={() => setForm({ ...form, category: cat })}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                    form.category === cat 
                      ? 'bg-orange-500 text-white border-orange-500' 
                      : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Title</label>
            <input
              required
              type="text"
              placeholder="E.g. Broken street light near Govt Hospital"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-[#12121a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Area */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Location / Area</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-4 top-3.5 text-slate-400" />
              <input
                required
                type="text"
                placeholder="Specific area in Miryalaguda"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                className="w-full bg-[#12121a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Details</label>
            <textarea
              required
              rows="4"
              placeholder="Provide more context about the issue..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-[#12121a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
            />
          </div>

          {/* Photo Upload (Mock) */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Attach Photo (Optional)</label>
            <button type="button" className="w-full border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-orange-500/50 hover:text-orange-500 transition-colors bg-[#12121a]">
              <Camera size={24} className="mb-2" />
              <span className="text-xs font-bold">Tap to upload a photo</span>
            </button>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl flex gap-3 mt-4">
            <Info size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-blue-200 leading-relaxed">
              Your report will be reviewed by an Admin to prevent spam. Once verified, it will be visible in the Community Updates section.
            </p>
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 mt-6"
          >
            <Send size={18} />
            SUBMIT REPORT
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;

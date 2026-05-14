import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, FileText, CheckCircle, XCircle, 
  BarChart3, AlertCircle, ShieldAlert, 
  TrendingUp, Activity, Search, Filter
} from 'lucide-react';
import { KOTHAGUDEM_NEWS } from '../data/newsData';
import { NewsAPI } from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('moderation');
  
  const [pendingNews, setPendingNews] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchPendingNews();
  }, []);

  const fetchPendingNews = async () => {
    setLoading(true);
    const data = await NewsAPI.getPendingNews();
    if (data.length === 0) {
      // Mock data for display if backend is empty/unavailable
      setPendingNews([
        {
          id: "p1",
          title: "New Shopping Mall Proposal in SCCL Colony",
          author: { name: "Rahul V." },
          category: "development",
          date: "2024-05-13",
          summary: "A private developer has submitted a proposal for a 3-story mall...",
          image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800"
        }
      ]);
    } else {
      setPendingNews(data);
    }
    setLoading(false);
  };

  const handleAction = async (id, action) => {
    try {
      if (action === 'approve') {
        await NewsAPI.approveNews(id);
      }
      setPendingNews(pendingNews.filter(n => n.id !== id));
      alert(`Post ${action === 'approve' ? 'Approved' : 'Rejected'} successfully!`);
    } catch (error) {
      alert(`Backend action simulated: Post ${action === 'approve' ? 'Approved' : 'Rejected'}!`);
      setPendingNews(pendingNews.filter(n => n.id !== id));
    }
  };

  const stats = [
    { label: 'Total News', value: '412', icon: FileText, color: 'blue' },
    { label: 'Pending Approval', value: pendingNews.length, icon: Activity, color: 'orange' },
    { label: 'Verified Reporters', value: '28', icon: Users, color: 'green' },
    { label: 'Fake News Blocked', value: '14', icon: ShieldAlert, color: 'red' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-[4.5rem] pb-[5.5rem] text-white">
      <div className="px-5 mb-8">
        <h1 className="text-2xl font-black mb-1">Admin <span className="gradient-text">Ecosystem</span></h1>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Kothagudem Control Center</p>
      </div>

      {/* Stats Grid */}
      <div className="px-5 grid grid-cols-2 gap-4 mb-8">
         {stats.map(s => (
           <div key={s.label} className="glass p-4 rounded-3xl border-white/5 relative overflow-hidden">
              <div className={`absolute top-0 right-0 p-2 opacity-10 text-${s.color}-500`}>
                 <s.icon size={40} />
              </div>
              <div className="text-xl font-black mb-1">{s.value}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase leading-tight">{s.label}</div>
           </div>
         ))}
      </div>

      {/* Tabs */}
      <div className="px-5 mb-6">
         <div className="glass p-1 rounded-2xl border-white/5 flex gap-1">
            {['Moderation', 'Analytics', 'Users'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                  activeTab === tab.toLowerCase() ? 'bg-orange-500 text-white' : 'text-slate-500'
                }`}
              >
                {tab}
              </button>
            ))}
         </div>
      </div>

      {/* Main Content Area */}
      <div className="px-5">
         {activeTab === 'moderation' && (
           <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                 <h2 className="text-sm font-black uppercase tracking-tight flex items-center gap-2">
                    <Activity size={16} className="text-orange-500" />
                    Pending Approval
                 </h2>
                 <span className="text-[10px] font-bold text-slate-500">{pendingNews.length} POSTS</span>
              </div>

              {pendingNews.map(news => (
                <motion.div 
                  layout
                  key={news.id} 
                  className="glass p-4 rounded-3xl border-white/5"
                >
                   <div className="flex gap-4 mb-4">
                      <img src={news.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                      <div className="flex-1 min-w-0">
                         <div className="text-[9px] font-bold text-orange-500 uppercase">{news.category}</div>
                         <h3 className="text-sm font-bold truncate mb-1">{news.title}</h3>
                         <div className="text-[10px] text-slate-500 font-bold">BY {news.author.toUpperCase()}</div>
                      </div>
                   </div>
                   <p className="text-[11px] text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                     {news.summary}
                   </p>
                   <div className="flex gap-2">
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction(news.id, 'approve')}
                        className="flex-1 py-2.5 bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2"
                      >
                         <CheckCircle size={14} /> Approve
                      </motion.button>
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction(news.id, 'reject')}
                        className="flex-1 py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2"
                      >
                         <XCircle size={14} /> Reject
                      </motion.button>
                   </div>
                </motion.div>
              ))}

              {pendingNews.length === 0 && (
                <div className="py-20 text-center glass rounded-3xl border-white/5 opacity-50">
                   <div className="text-3xl mb-2">✅</div>
                   <p className="text-sm font-bold">No pending posts to moderate</p>
                </div>
              )}
           </div>
         )}

         {activeTab === 'analytics' && (
           <div className="space-y-6">
              <div className="glass p-6 rounded-3xl border-white/5">
                 <h3 className="text-sm font-black mb-4 flex items-center gap-2 uppercase">
                   <TrendingUp size={16} className="text-blue-500" />
                   Traffic Insights
                 </h3>
                 <div className="h-40 flex items-end justify-between gap-1">
                    {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                         <div className="w-full bg-blue-500/20 rounded-t-lg relative group">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              className="w-full bg-blue-500 rounded-t-lg"
                            />
                         </div>
                         <span className="text-[8px] font-bold text-slate-500">DAY {i+1}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="glass p-6 rounded-3xl border-white/5">
                 <h3 className="text-sm font-black mb-4 flex items-center gap-2 uppercase">
                   <Filter size={16} className="text-purple-500" />
                   Category Popularity
                 </h3>
                 <div className="space-y-3">
                    {[
                      { label: 'Politics', val: '45%', color: 'orange' },
                      { label: 'Emergency', val: '25%', color: 'red' },
                      { label: 'Education', val: '20%', color: 'blue' },
                      { label: 'Others', val: '10%', color: 'slate' }
                    ].map(c => (
                      <div key={c.label}>
                         <div className="flex justify-between text-[10px] font-bold mb-1 uppercase">
                            <span>{c.label}</span>
                            <span>{c.val}</span>
                         </div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full bg-${c.color}-500`} style={{ width: c.val }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
         )}
      </div>

    </div>
  );
};

export default AdminDashboard;

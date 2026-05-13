import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Users, Wallet, ChevronDown, Loader2, MapPin, Clock, Utensils, Moon } from 'lucide-react';
import { generateItinerary, calculateBudget } from '../../utils/aiPlanner';

const TYPES = ['Family', 'Couple', 'Solo', 'Friends', 'Bike Trip'];
const DURATIONS = ['1 Day', '2 Days', '3 Days', '5 Days'];
const BUDGETS = ['Low', 'Medium', 'High'];
const TRAVELERS = ['Solo', 'Couple', 'Family', 'Friends'];

const TripPlannerAI = () => {
  const [prefs, setPrefs] = useState({ type: 'Family', duration: '2 Days', budget: 'Medium', travelers: 'Family' });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    const result = generateItinerary(prefs);
    const budget = calculateBudget(parseInt(prefs.duration), prefs.travelers, prefs.budget);
    setPlan({ ...result, budgetBreakdown: budget });
    setLoading(false);
  };

  return (
    <div style={{ padding: '0 1rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '10px',
          background: 'linear-gradient(135deg,#a855f7,#6366f1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Sparkles size={18} color="white" />
        </div>
        <div>
          <h2 style={{ fontWeight: 800, fontSize: '1.1rem', lineHeight: 1 }}>AI Trip Planner</h2>
          <p style={{ fontSize: '0.72rem', color: '#64748b' }}>Personalized itinerary for Bhadradri</p>
        </div>
      </div>

      {/* Preference Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1rem' }}>
        {/* Trip Type */}
        <div style={{ background: '#12121a', borderRadius: '14px', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trip Type</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {TYPES.map(t => (
              <button key={t} onClick={() => setPrefs(p => ({ ...p, type: t }))} style={{
                padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600,
                background: prefs.type === t ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.04)',
                border: prefs.type === t ? '1px solid #f97316' : '1px solid rgba(255,255,255,0.08)',
                color: prefs.type === t ? '#f97316' : '#94a3b8', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div style={{ background: '#12121a', borderRadius: '14px', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Duration</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {DURATIONS.map(d => (
              <button key={d} onClick={() => setPrefs(p => ({ ...p, duration: d }))} style={{
                padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600,
                background: prefs.duration === d ? 'rgba(14,165,233,0.2)' : 'rgba(255,255,255,0.04)',
                border: prefs.duration === d ? '1px solid #0ea5e9' : '1px solid rgba(255,255,255,0.08)',
                color: prefs.duration === d ? '#0ea5e9' : '#94a3b8', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
              }}>{d}</button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div style={{ background: '#12121a', borderRadius: '14px', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Budget</div>
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            {BUDGETS.map(b => (
              <button key={b} onClick={() => setPrefs(p => ({ ...p, budget: b }))} style={{
                flex: 1, padding: '4px 0', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 600,
                background: prefs.budget === b ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.04)',
                border: prefs.budget === b ? '1px solid #22c55e' : '1px solid rgba(255,255,255,0.08)',
                color: prefs.budget === b ? '#22c55e' : '#94a3b8', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
              }}>{b === 'Low' ? '💰' : b === 'Medium' ? '💳' : '👑'} {b}</button>
            ))}
          </div>
        </div>

        {/* Travelers */}
        <div style={{ background: '#12121a', borderRadius: '14px', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Travelers</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {TRAVELERS.map(t => (
              <button key={t} onClick={() => setPrefs(p => ({ ...p, travelers: t }))} style={{
                padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600,
                background: prefs.travelers === t ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.04)',
                border: prefs.travelers === t ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.08)',
                color: prefs.travelers === t ? '#a855f7' : '#94a3b8', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={generate}
        disabled={loading}
        className="btn-primary"
        style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
      >
        {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Generating Plan...</>
                 : <><Sparkles size={18} /> Generate AI Itinerary</>}
      </motion.button>

      {/* Generated Plan */}
      <AnimatePresence>
        {plan && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '1.25rem' }}
          >
            {/* Plan Header */}
            <div style={{
              background: 'linear-gradient(135deg,rgba(168,85,247,0.15),rgba(99,102,241,0.1))',
              border: '1px solid rgba(168,85,247,0.2)',
              borderRadius: '16px', padding: '1rem', marginBottom: '1rem',
            }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.3rem' }}>{plan.title}</div>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: '#a855f7', flexWrap: 'wrap' }}>
                <span>📅 {plan.duration}</span>
                <span>💰 {plan.total_budget}</span>
                <span>☀️ {plan.best_season}</span>
              </div>
            </div>

            {/* Budget Breakdown */}
            <div style={{ background: '#12121a', borderRadius: '14px', padding: '0.9rem', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.7rem', fontSize: '0.9rem' }}>💰 Budget Breakdown</div>
              {Object.entries(plan.budgetBreakdown).filter(([k]) => k !== 'total').map(([key, val]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.82rem' }}>
                  <span style={{ color: '#94a3b8', textTransform: 'capitalize' }}>{key.replace('_', ' ')}</span>
                  <span style={{ fontWeight: 600 }}>₹{val.toLocaleString()}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                <span>Total Estimate</span>
                <span className="gradient-text">₹{plan.budgetBreakdown.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Day-by-Day */}
            {plan.itinerary.map((day) => (
              <div key={day.day} style={{ background: '#12121a', borderRadius: '14px', padding: '1rem', marginBottom: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontWeight: 800, marginBottom: '0.75rem', color: '#f97316', fontSize: '0.9rem' }}>
                  📅 Day {day.day} – {day.theme}
                </div>
                {[
                  { icon: '🌅', label: 'Morning', time: day.morning.time, text: day.morning.activity, note: day.morning.notes, cost: day.morning.cost },
                  { icon: '🍛', label: 'Lunch', time: day.lunch.time, text: day.lunch.restaurant, note: day.lunch.cuisine, cost: day.lunch.cost },
                  { icon: '⛅', label: 'Afternoon', time: day.afternoon.time, text: day.afternoon.activity, note: day.afternoon.notes, cost: day.afternoon.cost },
                  { icon: '🌇', label: 'Evening', time: day.evening.time, text: day.evening.activity, note: day.evening.notes, cost: day.evening.cost },
                  { icon: '🌙', label: 'Night', time: day.night.time, text: day.night.activity, note: day.night.notes, cost: day.night.cost },
                ].map((slot) => (
                  <div key={slot.label} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.7rem', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '1.1rem', marginTop: '2px' }}>{slot.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{slot.text}</div>
                        <div style={{ fontSize: '0.7rem', color: '#22c55e', fontWeight: 600 }}>{slot.cost}</div>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{slot.time} • {slot.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Tips */}
            <div style={{ background: 'rgba(249,115,22,0.08)', borderRadius: '14px', padding: '1rem', border: '1px solid rgba(249,115,22,0.15)' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.6rem', fontSize: '0.88rem', color: '#f97316' }}>💡 Travel Tips</div>
              {plan.tips.map((tip, i) => (
                <div key={i} style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.35rem' }}>• {tip}</div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TripPlannerAI;

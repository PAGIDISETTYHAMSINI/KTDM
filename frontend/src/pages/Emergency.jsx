import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Navigation, ShieldAlert, Clock, Activity } from 'lucide-react';
import { EMERGENCY_CONTACTS, HOSPITALS } from '../data/miryalagudaData';

const Emergency = () => {
  const [sosActive, setSosActive] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', paddingTop: '4.5rem', paddingBottom: '5rem' }}>

      {/* Header */}
      <div style={{ padding: '1.25rem 1.25rem 0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <ShieldAlert size={24} color="#ef4444" />
          <h1 style={{ fontWeight: 900, fontSize: '1.5rem', color: '#ef4444' }}>Emergency SOS</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Quick access to emergency services in Miryalaguda</p>
      </div>

      {/* BIG SOS Button */}
      <div style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'center' }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          animate={sosActive ? { boxShadow: ['0 0 30px rgba(239,68,68,0.6)', '0 0 60px rgba(239,68,68,0.8)', '0 0 30px rgba(239,68,68,0.6)'] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={() => { setSosActive(!sosActive); window.open('tel:108'); }}
          style={{
            width: 140, height: 140, borderRadius: '50%',
            background: sosActive
              ? 'linear-gradient(135deg,#dc2626,#991b1b)'
              : 'linear-gradient(135deg,#ef4444,#dc2626)',
            border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(239,68,68,0.5)',
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>🆘</span>
          <span style={{ color: 'white', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '2px' }}>SOS</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.65rem' }}>Tap to call 108</span>
        </motion.button>
      </div>

      {/* Quick Contacts */}
      <div style={{ padding: '0.5rem 1.25rem 1rem' }}>
        <h2 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.75rem' }}>⚡ Quick Contacts</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
          {EMERGENCY_CONTACTS.map(contact => (
            <motion.a
              key={contact.name}
              href={`tel:${contact.number}`}
              whileTap={{ scale: 0.94 }}
              style={{
                background: `${contact.color}15`,
                border: `1px solid ${contact.color}30`,
                borderRadius: '16px', padding: '0.9rem',
                display: 'flex', flexDirection: 'column', gap: '0.35rem',
                textDecoration: 'none',
              }}
            >
              <div style={{ fontSize: '1.5rem' }}>{contact.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'white' }}>{contact.name}</div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: contact.color }}>
                {contact.number}
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Nearby Hospitals */}
      <div style={{ padding: '0 1.25rem 1rem' }}>
        <h2 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.75rem' }}>🏥 Nearest Hospitals</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {HOSPITALS.map(h => (
            <div key={h.id} style={{ background: '#12121a', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '16px', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{h.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{h.type} • {h.beds} Beds</div>
                </div>
                <div style={{
                  background: h.open_24hrs ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                  border: `1px solid ${h.open_24hrs ? '#22c55e' : '#ef4444'}30`,
                  padding: '2px 8px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 700,
                  color: h.open_24hrs ? '#22c55e' : '#ef4444',
                }}>
                  {h.open_24hrs ? '24/7 OPEN' : 'Check hours'}
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.6rem' }}>
                📍 {h.address}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.75rem' }}>
                {h.specialities?.slice(0, 3).map(s => (
                  <span key={s} style={{ fontSize: '0.65rem', background: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '2px 8px', borderRadius: '20px', fontWeight: 600 }}>{s}</span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a href={`tel:${h.emergency}`} className="btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.78rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', borderRadius: '10px' }}>
                  <Phone size={13} /> Call Emergency
                </a>
                <a href={h.google_maps} target="_blank" rel="noopener noreferrer" className="btn-glass" style={{ flex: 1, padding: '0.5rem', fontSize: '0.78rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', borderRadius: '10px' }}>
                  <Navigation size={13} /> Navigate
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Tips */}
      <div style={{ padding: '0 1.25rem' }}>
        <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '16px', padding: '1rem' }}>
          <h3 style={{ fontWeight: 700, color: '#f59e0b', marginBottom: '0.6rem', fontSize: '0.9rem' }}>⚠️ Safety Tips for Bhadradri Forest Areas</h3>
          {[
            "Always inform local forest department before trekking",
            "Carry offline maps and a fully charged phone",
            "Avoid forest areas after sunset",
            "Nearest medical facility: GGH Miryalaguda (108)",
            "No mobile signal in deep forest areas — carry satellite communicator if possible",
          ].map((tip, i) => (
            <div key={i} style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.3rem' }}>• {tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Emergency;

import React from 'react';
import TripPlannerAI from '../components/ai/TripPlannerAI';

const TripPlanner = () => (
  <div style={{ minHeight: '100vh', background: '#0a0a0f', paddingTop: '4.5rem', paddingBottom: '5rem' }}>
    <div style={{ padding: '1.25rem 1.25rem 0' }}>
      <h1 style={{ fontWeight: 900, fontSize: '1.5rem', marginBottom: '0.25rem' }}>
        AI <span style={{ background: 'linear-gradient(135deg,#a855f7,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Trip Planner</span>
      </h1>
      <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
        Generate a personalized Bhadradri itinerary in seconds
      </p>
    </div>
    <TripPlannerAI />
  </div>
);

export default TripPlanner;

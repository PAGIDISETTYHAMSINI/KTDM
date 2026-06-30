import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { Layers, Navigation, MapPin, RefreshCw } from 'lucide-react';
import { TOURIST_PLACES, RESTAURANTS, HOSPITALS, CATEGORIES } from '../data/miryalagudaData';
import useStore from '../stores/useStore';

// Fix default marker icons for react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const createIcon = (emoji, color) => L.divIcon({
  html: `<div style="background:${color};border-radius:50% 50% 50% 0;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.4);transform:rotate(-45deg)"><span style="transform:rotate(45deg)">${emoji}</span></div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

const ICONS = {
  Temple: createIcon('🕌', '#a855f7'),
  Waterfall: createIcon('💦', '#0ea5e9'),
  Wildlife: createIcon('🐯', '#22c55e'),
  Scenic: createIcon('🌄', '#f59e0b'),
  Spiritual: createIcon('🙏', '#ec4899'),
  Heritage: createIcon('🏛️', '#6366f1'),
  Adventure: createIcon('🏕️', '#10b981'),
  Restaurant: createIcon('🍛', '#f97316'),
  Hospital: createIcon('🏥', '#ef4444'),
  default: createIcon('📍', '#f97316'),
};

const MapPage = () => {
  const navigate = useNavigate();
  const { userLocation, mapCenter, setMapCenter } = useStore();
  const [activeLayer, setActiveLayer] = useState('all');
  const [selectedMarker, setSelectedMarker] = useState(null);

  const allMarkers = [
    ...TOURIST_PLACES.map(p => ({ ...p, _type: 'place' })),
    ...RESTAURANTS.map(r => ({ ...r, _type: 'restaurant', category: 'Restaurant' })),
    ...HOSPITALS.map(h => ({ ...h, _type: 'hospital', category: 'Hospital', description: h.specialities?.join(', ') })),
  ];

  const filtered = activeLayer === 'all' ? allMarkers :
    activeLayer === 'places' ? allMarkers.filter(m => m._type === 'place') :
    activeLayer === 'food' ? allMarkers.filter(m => m._type === 'restaurant') :
    allMarkers.filter(m => m._type === 'hospital');

  return (
    <div style={{ position: 'relative', height: '100vh', background: '#0a0a0f', overflow: 'hidden' }}>

      {/* Layer controls */}
      <div style={{
        position: 'absolute', top: '5rem', left: '1rem', zIndex: 1000,
        display: 'flex', flexDirection: 'column', gap: '0.4rem',
      }}>
        {[
          { id: 'all', label: 'All', icon: '🌐' },
          { id: 'places', label: 'Places', icon: '🗺️' },
          { id: 'food', label: 'Food', icon: '🍛' },
          { id: 'hospitals', label: 'Medical', icon: '🏥' },
        ].map(l => (
          <motion.button key={l.id} whileTap={{ scale: 0.9 }} onClick={() => setActiveLayer(l.id)} style={{
            padding: '0.4rem 0.7rem', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700,
            background: activeLayer === l.id ? 'rgba(249,115,22,0.9)' : 'rgba(10,10,15,0.85)',
            border: '1px solid rgba(255,255,255,0.1)', color: 'white',
            cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
            backdropFilter: 'blur(12px)',
          }}>
            {l.icon} {l.label}
          </motion.button>
        ))}
      </div>

      {/* Map */}
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='© OpenStreetMap contributors © CARTO'
          maxZoom={19}
        />
        <ZoomControl position="bottomright" />

        {/* User Location */}
        {userLocation && (
          <Circle
            center={[userLocation.lat, userLocation.lng]}
            radius={200}
            fillColor="#f97316"
            fillOpacity={0.3}
            color="#f97316"
            weight={2}
          />
        )}

        {/* Place Markers */}
        {filtered.map(place => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={ICONS[place.category] || ICONS.default}
            eventHandlers={{ click: () => setSelectedMarker(place) }}
          >
            <Popup>
              <div style={{ fontFamily: 'Outfit, sans-serif', minWidth: 200 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{place.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.4rem' }}>{place.category}</div>
                {place.rating && (
                  <div style={{ fontSize: '0.8rem', marginBottom: '0.4rem' }}>⭐ {place.rating}</div>
                )}
                <a href={place.google_maps || `https://maps.google.com/?q=${place.lat},${place.lng}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: '0.78rem', color: '#f97316', fontWeight: 700 }}>
                  Open in Google Maps →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Bottom info panel - selected marker */}
      <AnimatePresence>
        {selectedMarker && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            style={{
              position: 'absolute', bottom: '5rem', left: '1rem', right: '1rem', zIndex: 1000,
              background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(249,115,22,0.2)',
              borderRadius: '20px', padding: '1rem',
            }}
          >
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <img src={selectedMarker.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200'}
                alt="" style={{ width: 60, height: 60, borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{selectedMarker.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>{selectedMarker.category}</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a href={selectedMarker.google_maps || `https://maps.google.com/?q=${selectedMarker.lat},${selectedMarker.lng}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-primary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.75rem', fontWeight: 700, borderRadius: '10px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Navigation size={12} /> Navigate
                  </a>
                  <button onClick={() => navigate(`/place/${selectedMarker.id}`)}
                    className="btn-glass" style={{ padding: '0.4rem 0.9rem', fontSize: '0.75rem', fontWeight: 700, borderRadius: '10px' }}>
                    Details
                  </button>
                  <button onClick={() => setSelectedMarker(null)}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '0.4rem', marginLeft: 'auto' }}>✕</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapPage;

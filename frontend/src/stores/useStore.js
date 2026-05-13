import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Location
  userLocation: null,
  setUserLocation: (loc) => set({ userLocation: loc }),

  // UI State
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
  darkMode: true,
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),

  // Search
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
  searchResults: [],
  setSearchResults: (r) => set({ searchResults: r }),

  // Saved / Bookmarks
  savedPlaces: [],
  toggleSave: (place) => set((s) => ({
    savedPlaces: s.savedPlaces.find(p => p.id === place.id)
      ? s.savedPlaces.filter(p => p.id !== place.id)
      : [...s.savedPlaces, place]
  })),
  isSaved: (id) => get().savedPlaces.some(p => p.id === id),

  // Map
  mapCenter: { lat: 17.5558, lng: 80.6198 },
  setMapCenter: (c) => set({ mapCenter: c }),
  mapZoom: 11,
  setMapZoom: (z) => set({ mapZoom: z }),
  selectedPlace: null,
  setSelectedPlace: (p) => set({ selectedPlace: p }),
  activeCategory: 'all',
  setActiveCategory: (c) => set({ activeCategory: c }),

  // Emergency
  emergencyMode: false,
  setEmergencyMode: (v) => set({ emergencyMode: v }),

  // Trip Planner
  tripPlan: null,
  setTripPlan: (plan) => set({ tripPlan: plan }),
  tripPreferences: {
    type: 'Family',
    duration: '1 Day',
    budget: 'Medium',
    interests: [],
  },
  setTripPreferences: (prefs) => set((s) => ({
    tripPreferences: { ...s.tripPreferences, ...prefs }
  })),
}));

export default useStore;

import axios from 'axios';
import { MIRYALAGUDA_NEWS } from '../data/newsData';
import { TOURIST_PLACES, RESTAURANTS, HOTELS, HOSPITALS } from '../data/miryalagudaData';

// Make sure to set VITE_API_URL in your deployment environment (e.g., Render)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor to attach auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const NewsAPI = {
  getNews: async (category = 'All', status = 'Approved') => {
    try {
      const response = await api.get('/news', { params: { category, status } });
      return response.data;
    } catch (error) {
      console.warn("Backend unavailable, falling back to mock news data.");
      // Fallback logic
      let data = MIRYALAGUDA_NEWS;
      if (category !== 'All') {
        data = data.filter(n => n.category.toLowerCase() === category.toLowerCase());
      }
      return data;
    }
  },
  
  getPendingNews: async () => {
    try {
      const response = await api.get('/news', { params: { status: 'Pending' } });
      return response.data;
    } catch (error) {
      console.warn("Backend unavailable, using empty pending list.");
      return []; // Real mock could be here if needed
    }
  },

  submitNews: async (newsData) => {
    try {
      const response = await api.post('/news', newsData);
      return response.data;
    } catch (error) {
      console.error("Failed to submit news", error);
      throw error;
    }
  },
  
  approveNews: async (id) => {
    try {
      const response = await api.put(`/news/${id}/approve`);
      return response.data;
    } catch (error) {
      console.error("Failed to approve news", error);
      throw error;
    }
  }
};

export const PlacesAPI = {
  getPlaces: async (category) => {
    try {
      const response = await api.get('/places', { params: { category } });
      return response.data;
    } catch (error) {
      console.warn("Backend unavailable, falling back to mock places data.");
      if (category === 'Restaurants') return RESTAURANTS;
      if (category === 'Hotels') return HOTELS;
      if (category === 'Hospitals') return HOSPITALS;
      return TOURIST_PLACES;
    }
  }
};

export default api;

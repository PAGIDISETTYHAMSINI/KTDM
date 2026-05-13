import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import ChatAssistant from './components/ai/ChatAssistant';
import Home from './pages/Home';
import Explore from './pages/Explore';
import MapPage from './pages/MapPage';
import FoodPage from './pages/FoodPage';
import Emergency from './pages/Emergency';
import SavedPage from './pages/SavedPage';
import Profile from './pages/Profile';
import PlaceDetail from './pages/PlaceDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/food" element={<FoodPage />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/saved" element={<SavedPage />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/place/:id" element={<PlaceDetail />} />
      </Routes>
      <BottomNav />
      <ChatAssistant />
    </BrowserRouter>
  );
}

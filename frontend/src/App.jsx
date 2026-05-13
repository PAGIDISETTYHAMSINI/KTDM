import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Home, Map, Bookmark, User, PlusCircle, Languages } from 'lucide-react';
import { LanguageProvider } from './context/LanguageContext';

import HomePage from './pages/Home';
import ManaUruPage from './pages/ManaUru';
import NewsDetailPage from './pages/NewsDetail';
import PlaceDetailPage from './pages/PlaceDetail';

const SavedPage = () => <div className="container" style={{paddingTop: '2rem', paddingBottom: '6rem'}}>
  <h1 className="section-title">Saved Items</h1>
  <div className="card">You haven't saved anything yet.</div>
</div>;

const ProfilePage = () => <div className="container" style={{paddingTop: '2rem', paddingBottom: '6rem'}}>
  <h1 className="section-title">My Profile</h1>
  <div className="card">Login to view your profile.</div>
</div>;

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/explore" element={<ManaUruPage />} />
            <Route path="/explore/:id" element={<PlaceDetailPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>

          <nav className="bottom-nav">
            <NavLink to="/" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
              <Home size={24} />
              <span>Home</span>
            </NavLink>
            <NavLink to="/explore" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
              <Map size={24} />
              <span>Mana Uru</span>
            </NavLink>
            <NavLink to="/saved" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
              <Bookmark size={24} />
              <span>Saved</span>
            </NavLink>
            <NavLink to="/profile" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
              <User size={24} />
              <span>Profile</span>
            </NavLink>
          </nav>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;

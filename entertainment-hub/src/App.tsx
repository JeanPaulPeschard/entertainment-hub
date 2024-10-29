// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';
import MusicPage from './pages/MusicPage';
import UserProfile from './pages/UserProfile';
import Navbar from './components/NavBar';
import GlobalStyles from './styles/GlobalStyles';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Use element instead of component */}
        <Route path="/movies/:id" element={<MovieDetails></MovieDetails>} /> {/* Movie details route */}
        <Route path="/music" element={<MusicPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;

// src/pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Change to useNavigate
import MovieList from '../components/MovieList';
import MusicPlayer from '../components/MusicPlayer';
import VimeoVideoPlayer from '../components/VimeoVideoPlayer';
import useFetch from '../hooks/useFetch';
import { fetchTMDB } from '../utils/api';
import GlobalStyles from '../styles/GlobalStyles';
import { Container } from 'react-bootstrap';

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // Create a navigate function
  const { data: movies, loading } = useFetch(() => fetchTMDB('trending/movie/week'));

  // Define the onMovieClick function
  const handleMovieClick = (id: number) => {
    console.log('Movie clicked:', id);
    // Navigate to the movie detail page
    navigate(`/movies/${id}`); // Use navigate instead of history.push
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <h1 className="mt-4">Trending Movies</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <MovieList 
            movies={movies.results} // Pass the movies data
            onMovieClick={handleMovieClick} // Pass the onMovieClick handler
          />
        )}
        <h1 className="mt-4">Spotify Playlist</h1>
        <MusicPlayer />
        <VimeoVideoPlayer query="movie trailers" />
      </Container>
    </>
  );
};

export default HomePage;

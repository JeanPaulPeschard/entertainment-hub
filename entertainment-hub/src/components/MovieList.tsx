// src/components/MovieList.tsx
import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types'; // Assuming you have a Movie type
import { Row, Col } from 'react-bootstrap'; // Import Bootstrap components

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (id: number) => void; // This should be defined here
}

const MovieList: React.FC<MovieListProps> = ({ movies, onMovieClick }) => {
  return (
    <Row>
      {movies.map(movie => (
        <Col key={movie.id} xs={12} sm={6} md={4} className="mb-4"> {/* Adjust column sizes */}
          <MovieCard
            id={movie.id} // Pass the id prop
            title={movie.title}
            poster={movie.poster_path} // Adjust based on your data
            onClick={() => onMovieClick(movie.id)} // Pass the onClick handler
          />
        </Col>
      ))}
    </Row>
  );
};

export default MovieList;

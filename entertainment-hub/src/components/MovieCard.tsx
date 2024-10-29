// src/components/MovieCard.tsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  position: relative;
  margin: 10px;
  width: 200px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
    z-index: 10;
  }

  img {
    width: 100%;
    border-radius: 5px;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.2s;
    border-radius: 5px;
  }

  &:hover .overlay {
    opacity: 1;
  }

  h3 {
    margin: 0;
  }
`;

interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  onClick: () => void; // Keep the onClick prop
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, poster, onClick }) => {
  return (
    <div className="movie-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt={title} style={{ width: '100%', height: 'auto' }} />
      <h3>{title}</h3>
    </div>
  );
};

export default MovieCard;

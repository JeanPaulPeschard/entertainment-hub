// src/pages/MovieDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTMDB } from '../utils/api';
import styled from 'styled-components';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// Define a styled component with props for backgroundUrl
const MovieDetailsContainer = styled.div<{ backgroundUrl: string }>`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(${(props) => props.backgroundUrl}) center/cover no-repeat;
  color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const MovieTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const MovieOverview = styled.p`
  font-size: 1.2rem;
  margin: 20px 0;
`;

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null); // Use an appropriate type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetchTMDB(`movie/${id}`);
      setMovie(response);
      setLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="mt-5">
      <MovieDetailsContainer backgroundUrl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}>
        <Row>
          <Col md={4}>
            <Card className="bg-dark text-white border-0">
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
              <Card.Body>
                <Card.Title as="h2">{movie.title}</Card.Title>
                <Card.Text>Release Date: {movie.release_date}</Card.Text>
                <Card.Text>Rating: {movie.vote_average} ⭐</Card.Text>
                <Button variant="primary" href={movie.homepage} target="_blank">
                  Visit Official Site
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieOverview>{movie.overview}</MovieOverview>
          </Col>
        </Row>
      </MovieDetailsContainer>
    </Container>
  );
};

export default MovieDetails;

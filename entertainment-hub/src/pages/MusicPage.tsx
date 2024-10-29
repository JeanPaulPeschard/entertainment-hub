// src/pages/MusicPage.tsx
import React from 'react';
import MusicPlayer from '../components/MusicPlayer';
import { Container } from 'react-bootstrap';

const MusicPage: React.FC = () => {
  return (
    <Container>
      <h1>Music Page</h1>
      <MusicPlayer />
    </Container>
  );
};

export default MusicPage;

// src/components/MusicPlayer.tsx
import React, { useEffect, useState } from 'react';
import { fetchSpotifyToken, fetchSpotify } from '../utils/api';
import styled from 'styled-components';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';

const PlayerContainer = styled.div`
  background-color: #282c34;
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const NowPlaying = styled.div`
  margin-bottom: 20px;
`;

const SongList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SongItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #3b3f44;
  margin: 5px 0;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #4b4f54;
  }
`;

const MusicPlayer: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [songs, setSongs] = useState<any[]>([]);
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await fetchSpotifyToken();
      setToken(accessToken);
    };
    getToken();
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      if (token) {
        const response = await fetchSpotify('featured-playlists', token); // Modify this to fetch the required data
        if (response) {
          setSongs(response.tracks.items);
          setLoading(false);
        } else {
          setError('Failed to fetch songs');
          setLoading(false);
        }
      }
    };

    fetchSongs();
  }, [token]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    if (token) {
      const response = await fetchSpotify(`search?query=${searchQuery}&type=track`, token); // Adjust the API endpoint
      if (response) {
        setSongs(response.tracks.items);
        setSearchQuery('');
      } else {
        setError('Failed to fetch search results');
      }
    }
  };

  const handlePlay = (song: any) => {
    setCurrentSong(song);
    // Here you can add code to play the song using an audio player or a library
    console.log('Now playing:', song.name);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="mt-4">
      <PlayerContainer>
        <h2>Music Player</h2>
        
        {/* Error Alert */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Search Bar */}
        <Form onSubmit={handleSearch}>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search for a song..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Search
          </Button>
        </Form>

        {/* Now Playing Section */}
        {currentSong && (
          <NowPlaying>
            <h3>Now Playing: {currentSong.name} by {currentSong.artists.map((artist: any) => artist.name).join(', ')}</h3>
            {/* You can add audio controls here */}
          </NowPlaying>
        )}

        {/* Song List */}
        <h4>Songs</h4>
        <SongList>
          {songs.map((song) => (
            <SongItem key={song.id} onClick={() => handlePlay(song)}>
              <span>{song.name}</span>
              <span>{song.artists.map((artist: any) => artist.name).join(', ')}</span>
            </SongItem>
          ))}
        </SongList>

        {/* Spotify Embedded Player */}
        {token ? (
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src={`https://open.spotify.com/embed/playlist/37i9dQZF1DWXLeA8Omikj7`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="encrypted-media"
            />
          </div>
        ) : (
          <p>Loading Spotify player...</p>
        )}
      </PlayerContainer>
    </Container>
  );
};

export default MusicPlayer;

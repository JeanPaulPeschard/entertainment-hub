// src/components/VimeoVideoPlayer.tsx
import React, { useEffect, useState } from 'react';
import { fetchVimeoVideos } from '../utils/api';
import { Spinner, Card, Button } from 'react-bootstrap';

interface Video {
  uri: string;
  name: string;
  link: string;
  embed: {
    html: string;
  };
}

const VimeoVideoPlayer: React.FC<{ query: string }> = ({ query }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      try {
        const data = await fetchVimeoVideos(query);
        setVideos(data.data);
      } catch (error) {
        console.error('Error fetching Vimeo videos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadVideos();
  }, [query]);

  return (
    <div className="mt-4">
      <h2>Related Videos on Vimeo</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <div className="row">
          {videos.map((video) => (
            <Card key={video.uri} className="col-md-4 mb-3">
              <Card.Body>
                <div dangerouslySetInnerHTML={{ __html: video.embed.html }} />
                <Card.Title>{video.name}</Card.Title>
                <Button variant="primary" href={video.link} target="_blank">
                  Watch on Vimeo
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VimeoVideoPlayer;

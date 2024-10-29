// src/utils/api.ts
const TMDB_API_KEY = 'bfea98288a2c4e2bc413752d2396f7ca';
const SPOTIFY_CLIENT_ID = '4bd667a06f424471bc50f2de41bb7003';
const SPOTIFY_CLIENT_SECRET = '7184132d4ca243ebb2c096236f08db1a';
const VIMEO_ACCESS_TOKEN = '7f21c979766cb28495ca0fb77e98e016';

const BASE_URL = 'https://api.spotify.com/v1';

export const fetchTMDB = async (endpoint: string) => {
  const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${TMDB_API_KEY}`);
  return response.json();
};

export const fetchVimeoVideos = async (query: string) => {
  const response = await fetch(`https://api.vimeo.com/videos?query=${query}`, {
    headers: {
      Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
    },
  });
  return response.json();
};

export const fetchSpotifyToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  return data.access_token;
};

export const fetchSpotify = async (endpoint: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from Spotify API');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return null; // Return null or handle the error as needed
  }
}
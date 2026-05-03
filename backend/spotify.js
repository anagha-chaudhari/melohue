const fetch = require('node-fetch');
const { getCached } = require('./redis');
require('dotenv').config();

// token helpers - we no longer store the token in a plain variable.
// it will live in redis with a 55 min ttl so all containers share one token and it auto refreshes when it expires

async function fetchFreshToken() {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await res.json();

  if (!data.access_token) {
    throw new Error('Spotify token fetch failed: ' + JSON.stringify(data));
  }

  return data.access_token;
}

async function getAccessToken() {
  return getCached('spotify:token', fetchFreshToken, 3300);
} // spotify tokens last 3600 seconds, we set cache ttl to 3300 to be safe

async function searchTrack(query) {
  if (!query || !query.trim()) {
    throw new Error('Search query cannot be empty');
  }

  // Normalise key: "Lofi" / "lofi" / " lofi " all hit the same cache entry
  const cacheKey = `spotify:search:${query.toLowerCase().trim()}`;

  return getCached(
    cacheKey,
    async () => {
      const accessToken = await getAccessToken();

      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const data = await res.json();

      if (data.error) {
        throw new Error(`Spotify API error ${data.error.status}: ${data.error.message}`);
      }

      if (!data.tracks || !data.tracks.items) {
        throw new Error('Unexpected Spotify response shape: ' + JSON.stringify(data));
      }

      return data.tracks.items;
    },
    3600 
  );
}

module.exports = { searchTrack };
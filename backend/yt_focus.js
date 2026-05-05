const express = require('express');
const fetch = require('node-fetch');
const { getCached } = require('./redis'); // imporing the helper
require('dotenv').config();

const router = express.Router();

router.get('/study-videos', async (req, res) => {
  try {
    // Static key — everyone gets same study videos
    // TTL 6 hours — no need to refresh frequently
    const videos = await getCached(
      'yt:studyvideos',
      fetchStudyVideos,
      21600
    );

    res.json(videos);
  } catch (error) {
    console.error('Error fetching study videos:', error);
    res.status(500).json({ error: 'Failed to fetch study videos' });
  }
});

// Extracted as named function — clean and testable
async function fetchStudyVideos() {
  const query = 'study with me 3 hours';
  const maxResults = 5;

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${process.env.YT_API_KEY}&maxResults=${maxResults}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  if (!data.items) {
    throw new Error('YouTube API error: ' + JSON.stringify(data));
  }

  return data.items.map(item => ({
    title: item.snippet.title,
    youtubeId: item.id.videoId,
    thumbnail: item.snippet.thumbnails.medium.url
  }));
}

module.exports = router;
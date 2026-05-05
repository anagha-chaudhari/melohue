require('dotenv').config();
const { createClient } = require('redis');

const client = createClient({ url: process.env.REDIS_URL });

client.on('error', (err) => console.error('Redis error:', err.message));

let isReady = false;

async function connect() {
  try {
    await client.connect();
    isReady = true;
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis — caching disabled:', err.message);
  }
}

async function getCached(key, fn, ttl = 3600) {
  if (!isReady) {
    console.warn('Redis not ready, fetching from API directly');
    return fn();
  }

  try {
    const cached = await client.get(key);

    if (cached) {
      console.log(`Cache HIT: ${key}`);
      return JSON.parse(cached);
    }

    console.log(`Cache MISS: ${key}`);
    const freshData = await fn();
    await client.setEx(key, ttl, JSON.stringify(freshData));
    return freshData;

  } catch (err) {
    console.error(`Redis error on key "${key}", falling back:`, err.message);
    return fn();
  }
}

// Export connect so server.js awaits it — connect() is NOT called here
module.exports = { getCached, connect };
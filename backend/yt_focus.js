const { createClient } = require('redis');
const client = createClient({ url: process.env.REDIS_URL});
client.on('error', (err) => console.log('Redis Client Error', err));

let isReady = false;

async function connect() {
  try{
    await client.connect();
    isReady = true;
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
}

connect();

async function getCached(key, fn, ttl = 3600) {
  // If Redis never connected, skip straight to real API
  if (!isReady) return fn();

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
    console.error(`Redis error on key "${key}", falling back to API:`, err.message);
    return fn(); // user never sees this failure
  }
}

module.exports = { getCached };
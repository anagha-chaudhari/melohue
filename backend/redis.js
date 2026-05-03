const { createClient } = require('redis');

const client = createClient({ url: process.env.REDIS_URL});

client.on('error', (err) => console.error('Redis error:', err));

client.connect();

/**
 * getCached — the cache-aside pattern as a reusable function
 *
 * @param {string} key - unique Redis key e.g. "yt:studyvideos"
 * @param {function} fn - async function that fetches real data if cache misses
 * @param {number} ttl - seconds before Redis auto-deletes this key
 */

async function getCached(key, fn, ttl = 3600) {
    const cached = await client.get(key); // check redist first for this key

    if (cached) {
        console.log(`Cache hit for ${key}`);
        return JSON.parse(cached); // data already exists, retrun it immediately
    }

    console.log(`Cache miss for ${key}`);
    const freshData = await fn(); // if redis has nothing, call the real API
    await client.setEx(key, ttl, JSON.stringify(freshData)); // store result as a string with TTL
    return freshData;
}

module.exports = { getCached };
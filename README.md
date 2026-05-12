<div align="center">

# 🎵 MeloHue

**Your personal retro-aesthetic space for music, focus, and flow.**

![License](https://img.shields.io/badge/Copyright-Govt.%20of%20India-blue)
![Backend](https://img.shields.io/badge/Backend-Dockerized-2496ED?logo=docker)
![Cache](https://img.shields.io/badge/Cache-Redis-DC382D?logo=redis)
![APIs](https://img.shields.io/badge/APIs-YouTube%20%7C%20Spotify-success)

</div>

---

## Overview

I used to keep YouTube and Spotify open while studying, and I'd always end up getting distracted switching between tabs. I just wanted one place where I could have my music, my channels, and a focus video — all together. So I built MeloHue as my own little space on the internet that keeps me on track without the noise. No more app switching, no more rabbit holes.

MeloHue is an interactive personal website that blends **retro Windows XP-era design aesthetics** with smooth, modern web interactions — creating a distinctive digital space that's equal parts nostalgic and functional.

Designed for users who value simplicity and productivity, MeloHue brings your favorite media, focus tools, and music discovery into one distraction-free environment.

---

## Features

### I] Channel & Music Hub
Browse your favorite vlog channels and music in a single, curated, distraction-free space — no algorithm rabbit holes, just what you love.

### II] Focus Mode
Enter a deep-work session with a randomly fetched **"Study With Me"** YouTube video, pulled live via the YouTube Data API. Just click, and focus.

### III] Spotify Integration
Search tracks, preview playback, and personalize your music taste using the **Spotify API** — all without leaving MeloHue.

### IV] Music Notebook
Maintain a personal notebook of songs you emotionally connect with. Save, revisit, and reflect on your musical journey over time.

---

## Performance

| Metric | Before | After |
|---|---|---|
| API Response Time | ~1200 ms | ~8 ms |
| External API Calls | Baseline | ↓ ~90% |

A **Redis caching layer** dramatically reduced latency and external API dependency, making MeloHue feel instant.

---

## Tech Stack

HTML | CSS | JavaScript | Youtube Data API | Spotify API | Node.js | Express.js | MongoDB | Redis & Docker

---

## 🔌 APIs & External Services

### YouTube Data API
Fetches relevant background study videos and channel content dynamically for Focus Mode.

### Spotify API
Powers music search, playback preview, and playlist management within the app.

### Icons & Fonts
- **Icons:** Canva Free Icons — used under Canva's free license policy.
- **Fonts:** Sourced from [Google Fonts](https://fonts.google.com/) — free for personal and commercial use under the [Open Font License (OFL)](https://scripts.sil.org/OFL).

---

## 🐳 Running with Docker

```bash
# Clone the repository
git clone https://github.com/your-username/melohue.git
cd melohue

# Start the backend
docker compose up --build
```

Make sure to set up your `.env` file with the required API keys before running:

```env
YOUTUBE_API_KEY=your_youtube_api_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
REDIS_URL=redis://localhost:6379
```

---

<img width="1919" height="969" alt="Screenshot 2025-07-10 200522" src="https://github.com/user-attachments/assets/55a6abf9-606a-4dc1-9218-6ee89a0b7648" />
<img width="1894" height="977" alt="Screenshot 2025-07-10 201432" src="https://github.com/user-attachments/assets/0bd3c72e-802b-4608-8006-8996e2ad40b0" />
<img width="1919" height="969" alt="Screenshot 2025-07-10 200726" src="https://github.com/user-attachments/assets/137cfbc7-6980-4844-b663-2b54cf6b6482" />
<img width="1895" height="965" alt="Screenshot 2025-07-10 200757" src="https://github.com/user-attachments/assets/30a1f964-64e3-4d0f-880a-036f3c02ba75" />
<img width="1896" height="964" alt="Screenshot 2025-07-10 200917" src="https://github.com/user-attachments/assets/ccf26203-1b61-4780-a7ae-fd18b7598c4e" />
<img width="1915" height="962" alt="Screenshot 2025-07-10 201201" src="https://github.com/user-attachments/assets/f7243f34-5b45-4891-a519-dc827ccde7a1" />
<img width="1914" height="958" alt="Screenshot 2025-07-10 201217" src="https://github.com/user-attachments/assets/0376709a-ea4d-4221-bfa6-9c151782fa9d" />
<img width="1918" height="983" alt="Screenshot 2025-07-10 201319" src="https://github.com/user-attachments/assets/19261c2e-8cfc-47aa-93e8-c602bdc03ee8" />

---
## Copyright

© MeloHue. All rights reserved.
**Copyright registered under the Government of India.**

---

<div align="center">
  Made with 🎵 and a love for the early 2000s internet.
</div>

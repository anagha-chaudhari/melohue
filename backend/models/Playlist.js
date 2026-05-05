const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  spotifyTrackId: { type: String, required: true, trim: true },
  tags: [String]
}, { timestamps: true });

const userPlaylistSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  playlist: [trackSchema]
}, { timestamps: true });


module.exports = mongoose.model('UserPlaylist', userPlaylistSchema);
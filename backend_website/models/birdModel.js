const mongoose = require('mongoose');

const birdSchema = new mongoose.Schema({
  species: { type: String, required: true },
  scientificName: { type: String, required: true },  // ✅ New field
  identification: { type: String, required: true },  // ✅ New field
  description: { type: String },
  imageUrl: { type: String },
  logs: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Bird', birdSchema);
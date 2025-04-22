const mongoose = require('mongoose');

const birdSchema = new mongoose.Schema({
  species: { type: String, required: true }, // Bird species
  scientificName: { type: String, required: true }, // Scientific name
  identification: { type: String, required: true }, // Identification
  description: { type: String }, // Description
  imageUrl: { type: String },// URL of the image
  Distribution: { type: String }, //  Stored as "Europe, North America, Asia"
  image_url_distribution: { type: String },
  logs: [{ type: String }], // Array of logs
  beakColor: [{ type: String }], // Array of colors
  conservationStatus: { type: String },
  diet: { type: String }, // Stored as "Carnivore, Omnivore, Herbivore"
  featherColors: [{ type: String }], // Array of colors
  legColor: [{ type: String }],
  length: { type: String }, // Stored as a string "24-25cm"
  habitats: [{ type: String }], // Array of habitats
  ukBreedingBirds: { type: String }, // Stored as "5,100,000 pairs"
  ukWintering: { type: String }, // Stored as "10-15 million birds"
  weight: { type: String }, // Stored as "80-100g"
  wingspan: { type: String } // Stored as "34-38.5cm"
}, { timestamps: true });

module.exports = mongoose.model('Bird', birdSchema);

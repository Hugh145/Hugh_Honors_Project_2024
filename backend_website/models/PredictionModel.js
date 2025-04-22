// models/PredictionModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the prediction schema
// This schema is used to store the predictions made by users
const predictionSchema = new Schema({
  className: { type: String, required: true }, // Class name of the prediction
  image: { type: String, required: true }, // Image URL or path
  userEmail: { type: String, required: true } // Email of the user who made the prediction
}, { timestamps: true });

module.exports = mongoose.model('Prediction', predictionSchema);
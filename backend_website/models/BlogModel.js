const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the blog schema
// This schema is used to store blog posts created by users
// It includes fields for title, content, image, user email 
const blogSchema = new Schema({
  title: { type: String, required: true }, // Blog title
  content: { type: String, required: true }, // Blog content
  image: { type: String, required: true }, // Image URL or path
  userEmail: { type: String, required: true }, // Email of the user who created the blog
  ratings: { type: [Number], default: [] }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

module.exports = mongoose.model('Blog', blogSchema);
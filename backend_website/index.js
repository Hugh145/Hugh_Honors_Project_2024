// Code to run the backend server
const express = require('express');
// Import the CORS middleware
const cors = require('cors');
// Import the mongoose module
const mongoose = require('mongoose');
// Import the body-parser module
const bodyParser = require('body-parser');
// Import the routes module from the routes folder
const routes = require('./routes/routes');

// Create an Express app
const app = express();
// Use the body-parser middleware
app.use(bodyParser.json());
// Use the CORS middleware
app.use(cors());

// Use the body-parser middleware
app.use(bodyParser.json({ limit: '50mb' }));
// Use the body-parser middleware for URL-encoded data
app.use(bodyParser.urlencoded({ extended: true, limit: '80mb' }))

// Connect to MongoDB (Remove deprecated options)
mongoose.connect('mongodb+srv://campbellh2711:ujU9FFBg2JkgUZBl@honourscluster01.34r9i.mongodb.net/?retryWrites=true&w=majority&appName=honoursCluster01')
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/// Set up the routes
app.use('/api', routes); // Use the routes defined in the routes module
// Set up the static file serving for uploaded files
app.use('/uploads', express.static('uploads'));

// Set the port for the server to listen on. Use the PORT environment variable default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));// Start the server
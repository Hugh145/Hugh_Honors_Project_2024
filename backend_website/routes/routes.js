const express = require('express');// Import express
const router = express.Router();// Create a new router object
const controller = require('../controllers/controller');// Import the controller
const { verifyToken } = require('../auth/auth');   // Import the verifyToken middleware
const multer = require('multer');// Import multer for file uploads

// Set up multer for file uploads
// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); //  'uploads'
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage });
  
// Routes for creating, updating, and deleting blogs (protected)
router.post('/create/blogs', verifyToken, upload.single('image'), controller.createBlog);
  
// User endpoints
router.post('/users/register', controller.registerUser);// Register
router.post('/users/login', controller.loginUser);// Login
router.post('/users/change-password', verifyToken, controller.changePassword);// Change password
router.get('/users/:email', controller.getUserProfile);// Get user profile
router.put('/users/update', controller.updateUserProfile);// Update user profile
router.delete('/users/delete', verifyToken, controller.deleteUserAccount);// Delete user account
// Prediction routes
router.post('/predictions', verifyToken, controller.storePrediction);// Store a prediction
router.get('/predictions', verifyToken, controller.getUserPredictions);// Get all predictions
router.delete('/predictions/:id', verifyToken, controller.deletePrediction);// Delete a prediction
// Bird Routes
router.get('/birds', controller.getBirds);  // Get all birds
router.post('/birds', controller.addBird);  // Add a bird
router.get('/birds/:id', controller.getBirdById);  // Get a bird by ID
// Routes for creating, updating, and deleting blogs (protected)
router.post('/create/blogs', verifyToken, upload.single('image'), controller.createBlog);
router.delete('/create/blogs/:id', verifyToken, controller.deleteBlog);// Delete a blog
// Routes for viewing blogs (public for all,)
router.get('/view/blogs', controller.getAllBlogs);// Get all blogs
router.get('/view/blogs/user', verifyToken, controller.getUserBlogs);// Get blogs by user

module.exports = router;
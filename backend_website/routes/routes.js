const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// User endpoints
router.post('/users/register', controller.registerUser);
router.post('/users/login', controller.loginUser);
router.post('/users/reset-password', controller.resetPassword);

router.get('/users/:email', controller.getUserProfile);
router.put('/users/update', controller.updateUserProfile);
// Bird Routes
router.get('/birds', controller.getBirds);  // Get all birds
router.post('/birds', controller.addBird);  // Add a bird
router.get('/birds/:id', controller.getBirdById);  // Get a bird by ID

module.exports = router;
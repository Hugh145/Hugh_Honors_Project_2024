const User = require('../models/userModel.js');
const Bird = require('../models/birdModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Controller Functions

// Register User
exports.registerUser = async (req, res) => {
  try {
    console.log("Incoming Request Data:", req.body); // Debug Log
    const { email, password, firstName, lastName, dob, address1 } = req.body;
    
    if (!email || !password || !firstName || !lastName || !dob || !address1) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already exists' });

    user = new User(req.body);
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Login User with email and password credentials
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, userType: user.userType }, "SECRET_KEY", { expiresIn: "1h" });

    res.json({ token, user: { firstName: user.firstName, email: user.email, userType: user.userType } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};


// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { email, updates } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields
    Object.assign(user, updates);
    await user.save();

    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

// Get all birds
exports.getBirds = async (req, res) => {
  try {
    const birds = await Bird.find();
    res.status(200).json({ success: true, data: birds });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add a new bird
exports.addBird = async (req, res) => {
  try {
    const newBird = await Bird.create(req.body);
    res.status(201).json({ success: true, data: newBird });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single bird by ID
exports.getBirdById = async (req, res) => {
  try {
    const bird = await Bird.findById(req.params.id);
    if (!bird) return res.status(404).json({ success: false, error: "Bird not found" });
    res.status(200).json({ success: true, data: bird });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const TeachableMachine = require('@sashido/teachablemachine-node');
const model = new TeachableMachine({
  modelUrl: 'https://teachablemachine.withgoogle.com/models/46N9lZImy/',  // URL to your Teachable Machine model
});

// Image Classification function
exports.classifyImage = async (req, res) => {
  const { imageUrl } = req.body; // Retrieve the image URL from the request body
  try {
    const predictions = await model.classify({ imageUrl });
    res.json(predictions);  // Return predictions to the client
  } catch (error) {
    console.error("Error classifying image:", error);
    res.status(500).json({ error: error.message });
  }
};


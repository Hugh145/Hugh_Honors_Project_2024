const User = require('../models/userModel.js');
const Bird = require('../models/birdModel.js');
const Blog = require('../models/BlogModel.js');
const Prediction = require('../models/PredictionModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Controller Functions

// Store a prediction result in the database (only for authenticated users)
exports.storePrediction = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { className, image } = req.body;
    const newPrediction = await Prediction.create({ className, image, userEmail });
    res.status(201).json({ message: 'Prediction stored successfully', prediction: newPrediction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all predictions for the logged-in user
exports.getUserPredictions = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const predictions = await Prediction.find({ userEmail });
    res.status(200).json({ message: 'User predictions', predictions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a prediction by ID
exports.deletePrediction = async (req, res) => {
  try {
    const predictionId = req.params.id;
    const userEmail = req.user.email;
    const prediction = await Prediction.findById(predictionId);
    if (!prediction) return res.status(404).json({ message: "Prediction not found" });
    if (prediction.userEmail !== userEmail) {
      return res.status(403).json({ message: "You are not authorized to delete this prediction" });
    }
    await prediction.deleteOne();
    res.status(200).json({ message: "Prediction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create a new blog post only for log in users
exports.createBlog = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { title, content } = req.body;
    
    // Check for the uploaded file
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }
    // Get the file path from req.file (set by Multer)
    const imagePath = req.file.path;
    
    // Insert the new blog into the database
    const newBlog = await Blog.create({
      title,
      content,
      image: imagePath,  // store the file path or URL
      userEmail
    });

    res.status(201).json({
      message: 'Blog post created',
      blog: newBlog
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// Get all blog posts which are public
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'All blogs', blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get blog posts of the logged-in user
exports.getUserBlogs = async (req, res) => {
  try {
    const userEmail = req.user.email;
    // Retrieve blogs for the user from the database (placeholder response)
    res.status(200).json({ message: 'User blogs', blogs: [], userEmail });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single blog post by ID
exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userEmail = req.user.email;  // Comes from the token (ensure it's in the token payload)
    
    // Find the blog by ID
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    
    // Check ownership
    if (blog.userEmail !== userEmail) {
      return res.status(403).json({ message: "You are not authorized to delete this blog" });
    }
    
    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete user profile by email 
exports.deleteUserAccount = async (req, res) => {
  try {
    const email = req.user.email;
    await User.deleteOne({ email });
    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register User with email and password credentials
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

    // Include the user's email in the JWT token payload
    const token = jwt.sign(
      { id: user._id, email: user.email, userType: user.userType },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.json({ token, user: { firstName: user.firstName, email: user.email, userType: user.userType } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Reset Password for a user with email address
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const email = req.user.email;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Validate current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Assign the plain new password; the pre-save hook will hash it.
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile by email address 
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
    console.log("Fetched birds from DB:", birds); // Debugging line
    res.status(200).json({ success: true, data: birds });
  } catch (error) {
    console.error("Error fetching birds:", error); // Log error
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




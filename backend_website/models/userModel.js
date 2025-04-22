const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
// This schema is used to store user information, including first name, last name, email, password, user type, date of birth, address, and image
// It includes pre-save middleware to hash the password before saving it to the database
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['user', 'staff'], default: 'user' },
  dob: { type: Date, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  image: { type: String },
}, { timestamps: true });

// Add pre-save middleware to hash the password before saving it to the database
// This ensures that the password is stored securely and not in plain text
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
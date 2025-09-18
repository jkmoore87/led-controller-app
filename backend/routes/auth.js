import express from "express";   // Express framework for building web applications.
import bcrypt from "bcryptjs"; // Hashing and verifying passwords.
import jwt from "jsonwebtoken";   // Creating and verifying JSON Web Tokens.
import User from "../models/User.js";   // User model for database operations.
import { JWT_SECRET } from "../config.js";   // Secret key for signing JWTs.

// Create a router instance.
const router = express.Router();

// ====================Register=====================
router.post("/register", async (req, res) => {

// Extract data from request body.
  const { firstName, lastName, email, password } = req.body;

// Validate input fields.
  if (!firstName || !lastName || !email || !password)
    return res.status(400).json({ message: "Please enter all fields" });

  try {
// Check if user already exists.
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Email already in use" });

// Hash the password before saving.
    const hashedPassword = await bcrypt.hash(password, 10);

// Create and save the new user in database.    
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

// Generate JWT and refresh token.  
  const name = `${firstName} ${lastName}`;

// Create JWT tokens.
  const token = jwt.sign({ id: user._id, name }, JWT_SECRET, { expiresIn: "15m" });

// Create Refresh Token.
  const refreshToken = jwt.sign({ id: user._id, name }, JWT_SECRET, { expiresIn: "7d" });

// Respond with tokens and user info.
    res.status(201).json({
      token,
      refreshToken,
      user: { id: user._id, firstName, lastName, email, name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ====================Login=====================
router.post("/login", async (req, res) => {

// Extract email and password from request body.
  const { email, password } = req.body;

// Validate input fields.
  if (!email || !password)
    return res.status(400).json({ message: "Please enter all fields" });

  try {

// Find user by email.
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

// Compare provided password with stored hashed password.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

// Create full name for token payload.
  const name = `${user.firstName} ${user.lastName}`;
  
// Generate JWT and refresh token.
  const token = jwt.sign({ id: user._id, name }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user._id, name }, JWT_SECRET, { expiresIn: "7d" });

// Respond with tokens and user info.  
  res.json({ token, refreshToken, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email, name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ====================Refresh endpoint=====================
router.post('/refresh', (req, res) => {

// Extract refresh token from request body.
  const { token } = req.body;

// Validate presence of refresh token.
  if (!token) return res.status(400).json({ message: 'Missing refresh token' });
  try {

// Verify and decode the refresh token.
    const payload = jwt.verify(token, JWT_SECRET);

// Generate new JWT and refresh token.
    const newToken = jwt.sign({ id: payload.id, name: payload.name }, JWT_SECRET, { expiresIn: '15m' });
    const newRefresh = jwt.sign({ id: payload.id, name: payload.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token: newToken, refreshToken: newRefresh });

// Handle invalid or expired refresh token.
  } catch (e) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
});


// Export the router to be used in the application.
export default router;
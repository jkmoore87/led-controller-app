// Import mongoose to define the schema and model.
import mongoose from 'mongoose';

// Define the User schema with fields: firstName, lastName, email, and password.
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

// Create and export the User model.
const User = mongoose.model('User', userSchema);

export default User;

// Import dotenv to load environment variables from a .env file
import dotenv from 'dotenv';

// Load variables from .env into process.env
dotenv.config();

// Define the port the server will run on, use the PORT environment variable if set, otherwise default to 5000
export const PORT = process.env.PORT || 5000;

// Define the MongoDB connection URI
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/led-controller';

// JWT secret key for signing/verifying JSON Web Tokens
export const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';

// Allowed origin for CORS (frontend URL)
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
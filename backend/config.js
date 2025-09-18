import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/led-controller';
// WARNING: for development only. In production set JWT_SECRET in your environment.
export const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

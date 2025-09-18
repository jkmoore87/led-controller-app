// Database connection setup using Mongoose.
import mongoose from "mongoose";

// Establish connection to MongoDB.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

// Lets me know if the connection to MongoDB was successful or not.    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Exports the function for use in other modules.
export default connectDB;

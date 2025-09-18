// Import mongoose to define the schema and model
import mongoose from 'mongoose';

// Define the Resource schema
const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    downloadUrl: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    steps: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

// Create the Resource model from the schema
const Resource = mongoose.model('Resource', resourceSchema);

// Export the Resource model for use elsewhere in the application
export default Resource;
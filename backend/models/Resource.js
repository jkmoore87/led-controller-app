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

// Create and export the Resource model
const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;

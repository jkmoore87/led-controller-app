import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  downloadUrl: { type: String }, // e.g., firmware zip or PDF stored statically
  steps: [{ type: String }],     // step-by-step instructions
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Resource', resourceSchema);

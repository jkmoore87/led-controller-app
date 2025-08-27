import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  imageUrl: { type: String }, // served from /uploads
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

postSchema.index({ title: 'text', body: 'text' });

export default mongoose.model('Post', postSchema);

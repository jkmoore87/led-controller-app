import mongoose from 'mongoose';

const presetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  color: { type: String, required: true },      // hex string
  brightness: { type: Number, min: 0, max: 100, required: true },
  animation: { type: String, enum: ['solid','pulse','rainbow','twinkle'], default: 'solid' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Preset', presetSchema);

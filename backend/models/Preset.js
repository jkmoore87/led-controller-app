// Import mongoose and define the Preset schema.
import mongoose from 'mongoose';

// Preset schema definition for LED settings.
const presetSchema = new mongoose.Schema(
  {
// Reference to the user who owns the preset.
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

// Preset name, color, brightness, animation type, speed, and status flags.
    name: { type: String, required: true, trim: true },
    color: {
      type: String,
      required: true,
      trim: true,
      match: /^#([0-9A-F]{3}){1,2}$/i 
    },
    brightness: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
      validate: { validator: Number.isInteger, message: '{VALUE} is not an integer' }
    },
    animation: { type: String, enum: ['solid', 'pulse', 'rainbow', 'twinkle'], default: 'solid' },
    speed: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
      validate: { validator: Number.isInteger, message: '{VALUE} is not an integer' }
    },
    isDefault: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Create and export the Preset model.
const Preset = mongoose.model('Preset', presetSchema);

// Export the Preset model for use elsewhere in the application
export default Preset;
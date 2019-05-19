import mongoose from 'mongoose';

const pinSchema = new mongoose.Schema({
  pin: {
    type: Number,
    required: true,
    unique: true
  },
  on: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['student', 'family']
  }
});

export const Pin = mongoose.model('pin', pinSchema);

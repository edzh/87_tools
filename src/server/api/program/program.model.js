import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  currentSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'session'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

export const Program = mongoose.model('program', programSchema);

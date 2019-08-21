import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  start: Date,
  end: Date,
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'program',
    required: true
  }
});

export const Session = mongoose.model('session', sessionSchema);

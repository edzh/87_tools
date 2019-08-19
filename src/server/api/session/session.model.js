import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  start: Date,
  end: Date
});

export const Session = mongoose.model('session', sessionSchema);

import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  start: Date,
  end: Date,
  clubs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'club'
    }
  ]
});

export const Session = mongoose.model('session', sessionSchema);

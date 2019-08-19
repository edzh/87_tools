import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  capacity: Number,
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'session'
  }
});

export const Club = mongoose.model('club', clubSchema);

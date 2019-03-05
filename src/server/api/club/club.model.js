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
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'student'
    }
  ]
});

export const Club = mongoose.model('club', clubSchema);

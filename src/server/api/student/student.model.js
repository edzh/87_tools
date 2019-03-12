import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  clubs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'club'
    }
  ],
  pin: {
    type: Number,
    unique: true
  },
  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'family'
  }
});

export const Student = mongoose.model('student', studentSchema);

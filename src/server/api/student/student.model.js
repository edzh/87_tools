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
  currentClubs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'club'
    }
  ],
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
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'program'
  }
});

export const Student = mongoose.model('student', studentSchema);

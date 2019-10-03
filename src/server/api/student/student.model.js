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
    unique: true,
    sparse: true
  },
  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'family'
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'program'
  },
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'session'
    }
  ]
});

export const Student = mongoose.model('student', studentSchema);

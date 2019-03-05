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
  clubs: [mongoose.Schema.Types.ObjectId],
  pin: {
    type: Number,
    unique: true
  }
});

export const Student = mongoose.model('student', studentSchema);

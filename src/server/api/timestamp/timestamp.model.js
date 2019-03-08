import mongoose from 'mongoose';

const timestampSchema = new mongoose.Schema({
  datetime: {
    type: Date,
    default: Date.now,
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
    unique: true,
    required: true
  },
  timesheet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'timesheet',
    required: true
  }
});

export const Timestamp = mongoose.model('timestamp', timestampSchema);

import mongoose from 'mongoose';

const timesheetSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  io: {
    type: String,
    required: true
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'session',
    required: true
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'program',
    required: true
  }
});

timesheetSchema.index({ date: 1, io: 1, session: 1 }, { unique: true });

export const Timesheet = mongoose.model('timesheet', timesheetSchema);

import mongoose from 'mongoose';

const timesheetSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  timestamp: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'timestamp'
    }
  ],
  io: {
    type: String,
    required: true
  }
});

timesheetSchema.index({ date: 1, io: 1 }, { unique: true });

export const Timesheet = mongoose.model('timesheet', timesheetSchema);

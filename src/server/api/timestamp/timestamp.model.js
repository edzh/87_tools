import mongoose from 'mongoose';
import { Timesheet } from '../timesheet/timesheet.model';

const timestampSchema = new mongoose.Schema({
  datetime: {
    type: Date,
    default: Date.now,
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
    required: true
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'club'
  },
  timesheet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'timesheet',
    required: true
  },
  fobStatus: {
    type: String
  }
});

timestampSchema.post('save', next => {});

timestampSchema.index({ student: 1, timesheet: 1 }, { unique: true });

export const Timestamp = mongoose.model('timestamp', timestampSchema);

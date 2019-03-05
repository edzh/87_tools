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
  students: [mongoose.Schema.Types.ObjectId]
});

export const Club = mongoose.model('club', clubSchema);

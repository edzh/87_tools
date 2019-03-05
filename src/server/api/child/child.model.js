import mongoose from 'mongoose';

const childSchema = new mongoose.Schema({
  name: {
    type: String
  },
  grade: {
    type: Number
  },
  clubs: [mongoose.Schema.Types.ObjectId],
  pin: Number
});

export const Child = mongoose.model('children', childSchema);

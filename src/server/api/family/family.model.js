import mongoose from 'mongoose';

const familySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'student',
      unique: true
    }
  ],
  pickups: [
    {
      name: String,
      pin: Number
    }
  ],
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'program'
  }
});

familySchema.index({ pickups: 'text' });

export const Family = mongoose.model('family', familySchema, 'families');

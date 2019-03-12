import mongoose from 'mongoose';

const familySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'student'
    }
  ],
  pickups: [
    {
      name: String,
      pin: Number
    }
  ]
});

familySchema.index({ pickups: 'text' });

export const Family = mongoose.model('family', familySchema, 'families');

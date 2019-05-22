const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/87attendance', {
  useNewURLParser: true
});

const exampleChild = {
  name: 'Rich Jones',
  grade: '2',
  clubs: ['123', '234'],
  pin: '123123'
};

const Child = mongoose.model('Child', {
  name: {
    type: String
  },
  grade: {
    type: Number
  },
  clubs: [mongoose.Schema.Types.ObjectId],
  pin: Number
});

const child = new Child(exampleChild);

const output = () => child.save().then(() => console.log('saved'));

module.exports = output;

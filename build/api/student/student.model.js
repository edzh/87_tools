"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Student = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var studentSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  clubs: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'club'
  }],
  pin: {
    type: Number,
    unique: true
  },
  family: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'family'
  }
});

var Student = _mongoose.default.model('student', studentSchema);

exports.Student = Student;
//# sourceMappingURL=student.model.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Club = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clubSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  students: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'student'
  }]
});

var Club = _mongoose.default.model('club', clubSchema);

exports.Club = Club;
//# sourceMappingURL=club.model.js.map
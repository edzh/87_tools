"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timestamp = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _timesheet = require("../timesheet/timesheet.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timestampSchema = new _mongoose.default.Schema({
  datetime: {
    type: Date,
    default: Date.now,
    required: true
  },
  student: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'student',
    required: true
  },
  club: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'club'
  },
  timesheet: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'timesheet',
    required: true
  },
  fobStatus: {
    type: String
  }
});
timestampSchema.post('save', function (next) {});
timestampSchema.index({
  student: 1,
  timesheet: 1
}, {
  unique: true
});

var Timestamp = _mongoose.default.model('timestamp', timestampSchema);

exports.Timestamp = Timestamp;
//# sourceMappingURL=timestamp.model.js.map
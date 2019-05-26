"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timesheet = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timesheetSchema = new _mongoose.default.Schema({
  date: {
    type: Date,
    required: true
  },
  timestamp: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'timestamp'
  }],
  io: {
    type: String,
    required: true
  }
});
timesheetSchema.index({
  date: 1,
  io: 1
}, {
  unique: true
});

var Timesheet = _mongoose.default.model('timesheet', timesheetSchema);

exports.Timesheet = Timesheet;
//# sourceMappingURL=timesheet.model.js.map
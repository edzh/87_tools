"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pin = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pinSchema = new _mongoose.default.Schema({
  pin: {
    type: Number,
    required: true,
    unique: true
  },
  on: {
    type: _mongoose.default.Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['student', 'family']
  }
});

var Pin = _mongoose.default.model('pin', pinSchema);

exports.Pin = Pin;
//# sourceMappingURL=pin.model.js.map
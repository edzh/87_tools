"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Family = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var familySchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  students: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'student',
    unique: true
  }],
  pickups: [{
    name: String,
    pin: Number
  }]
});
familySchema.index({
  pickups: 'text'
});

var Family = _mongoose.default.model('family', familySchema, 'families');

exports.Family = Family;
//# sourceMappingURL=family.model.js.map
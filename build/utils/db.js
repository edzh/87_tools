"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbUrl = _config.default.dbUrl;

var connect = function connect() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : dbUrl;
  return _mongoose.default.connect(url, {
    useNewUrlParser: true
  });
};

exports.connect = connect;
//# sourceMappingURL=db.js.map
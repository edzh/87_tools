"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _pin = _interopRequireDefault(require("./pin.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.route('/:pin').get(_pin.default.getOne);
var _default = router;
exports.default = _default;
//# sourceMappingURL=pin.router.js.map
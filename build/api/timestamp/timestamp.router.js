"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _timestamp = _interopRequireDefault(require("./timestamp.model"));

var _timestamp2 = _interopRequireDefault(require("./timestamp.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.route('/').get(_timestamp2.default.getMany).post(_timestamp2.default.createOne);
router.route('/:id').get(_timestamp2.default.getOne).put(_timestamp2.default.updateOne).delete(_timestamp2.default.removeOne);
var _default = router;
exports.default = _default;
//# sourceMappingURL=timestamp.router.js.map
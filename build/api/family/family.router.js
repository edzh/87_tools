"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _family = _interopRequireDefault(require("./family.model"));

var _family2 = _interopRequireDefault(require("./family.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.route('/').get(_family2.default.getMany).post(_family2.default.createOne);
router.route('/:id').get(_family2.default.getOne).put(_family2.default.updateOne).delete(_family2.default.removeOne);
var _default = router;
exports.default = _default;
//# sourceMappingURL=family.router.js.map
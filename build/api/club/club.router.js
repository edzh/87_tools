"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _club = _interopRequireDefault(require("./club.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.route('/').get(_club.default.getMany).post(_club.default.createOne);
router.route('/:id').get(_club.default.getOne).put(_club.default.updateOne).delete(_club.default.removeOne);
var _default = router;
exports.default = _default;
//# sourceMappingURL=club.router.js.map
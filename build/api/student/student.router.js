"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _student = _interopRequireDefault(require("./student.model"));

var _student2 = _interopRequireDefault(require("./student.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.route('/').get(_student2.default.getMany).post(_student2.default.createOne);
router.route('/:id').get(_student2.default.getOne).put(_student2.default.updateOne).delete(_student2.default.removeOne);
var _default = router;
exports.default = _default;
//# sourceMappingURL=student.router.js.map
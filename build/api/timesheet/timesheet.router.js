"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _student = _interopRequireDefault(require("../student/student.model"));

var _timesheet = _interopRequireDefault(require("./timesheet.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.route('/').get(_timesheet.default.getMany).post(_timesheet.default.createOne);
router.route('/:id').get(_timesheet.default.getOne).put(_timesheet.default.updateOne).delete(_timesheet.default.removeOne);
var _default = router;
exports.default = _default;
//# sourceMappingURL=timesheet.router.js.map
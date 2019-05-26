"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = require("./user.controller");

var router = (0, _express.Router)();
router.get('/', _user.me);
router.put('/', _user.updateMe);
var _default = router;
exports.default = _default;
//# sourceMappingURL=user.router.js.map
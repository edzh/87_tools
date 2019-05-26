"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getOne = void 0;

var _family = require("../family/family.model");

var _student = require("../student/student.model");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getOne =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var studentPin, familyPin;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _student.Student.findOne({
              pin: req.params.pin
            }).populate().lean().exec();

          case 3:
            studentPin = _context.sent;

            if (!studentPin) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              data: studentPin
            }));

          case 6:
            _context.next = 8;
            return _family.Family.findOne({
              'pickups.pin': {
                $eq: req.params.pin
              }
            }).populate('students').lean().exec();

          case 8:
            familyPin = _context.sent;

            if (familyPin) {
              _context.next = 12;
              break;
            }

            console.log(req.params.pin, 'does not exist!');
            return _context.abrupt("return", res.status(400).end());

          case 12:
            res.status(200).json({
              data: familyPin
            });
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            res.status(400).end();

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function getOne(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getOne = getOne;
var controller = {
  getOne: getOne
};
var _default = controller;
exports.default = _default;
//# sourceMappingURL=pin.controller.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMe = exports.me = void 0;

var _user = require("./user.model");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var me = function me(req, res) {
  res.status(200).json({
    data: req.user
  });
};

exports.me = me;

var updateMe =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user.User.findByIdAndUpdate(req.user._id, req.body, {
              new: true
            }).lean().exec();

          case 3:
            user = _context.sent;
            res.status(200).json({
              data: user
            });
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            res.status(400).end();

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function updateMe(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateMe = updateMe;
//# sourceMappingURL=user.controller.js.map
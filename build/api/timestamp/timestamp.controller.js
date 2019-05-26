"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.removeOne = exports.updateOne = exports.createOne = exports.getMany = exports.getOne = void 0;

var _timestamp = require("./timestamp.model");

var _timesheet = require("../timesheet/timesheet.model");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getOne =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var timestamp;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _timestamp.Timestamp.findOne({
              _id: req.params.id
            }).lean().exec();

          case 3:
            timestamp = _context.sent;

            if (timestamp) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).end());

          case 6:
            res.status(200).json({
              data: timestamp
            });
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            res.status(400).end();

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function getOne(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getOne = getOne;

var getMany =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var timestamps;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _timestamp.Timestamp.find(req.query).lean().exec();

          case 3:
            timestamps = _context2.sent;
            res.status(200).json({
              data: timestamps
            });
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
            res.status(400).end();

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getMany(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getMany = getMany;

var createOne =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var timestamp, updatedTimesheet;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _timestamp.Timestamp.create(_objectSpread({}, req.body));

          case 3:
            timestamp = _context3.sent;
            _context3.next = 6;
            return _timesheet.Timesheet.findOneAndUpdate({
              _id: req.body.timesheet
            }, {
              $push: {
                timestamp: [timestamp._id]
              }
            }, {
              new: true,
              upsert: true,
              safe: true
            });

          case 6:
            updatedTimesheet = _context3.sent;

            if (updatedTimesheet) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(400).end());

          case 9:
            res.status(201).json({
              data: timestamp
            });
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);
            res.status(400).end();

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 12]]);
  }));

  return function createOne(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createOne = createOne;

var updateOne =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var updatedTimestamp;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _timestamp.Timestamp.findOneAndUpdate({
              _id: req.params.id
            }, req.body, {
              new: true,
              upsert: true,
              safe: true
            }).lean().exec();

          case 3:
            updatedTimestamp = _context4.sent;

            if (updatedTimestamp) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(400).end());

          case 6:
            res.status(200).json({
              data: updatedTimestamp
            });
            _context4.next = 13;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0);
            res.status(400).end();

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));

  return function updateOne(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateOne = updateOne;

var removeOne =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var removed, updatedTimesheet;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _timestamp.Timestamp.findOneAndRemove({
              _id: req.params.id
            });

          case 3:
            removed = _context5.sent;
            _context5.next = 6;
            return _timesheet.Timesheet.findOneAndUpdate({
              _id: removed.timesheet
            }, {
              $pull: {
                timestamp: removed._id
              }
            }, {
              new: true
            });

          case 6:
            updatedTimesheet = _context5.sent;

            if (removed) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.status(400).end());

          case 9:
            return _context5.abrupt("return", res.status(200).json({
              data: removed
            }));

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0);
            res.status(400).end();

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 12]]);
  }));

  return function removeOne(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.removeOne = removeOne;
var controller = {
  getOne: getOne,
  getMany: getMany,
  createOne: createOne,
  updateOne: updateOne,
  removeOne: removeOne
};
var _default = controller;
exports.default = _default;
//# sourceMappingURL=timestamp.controller.js.map
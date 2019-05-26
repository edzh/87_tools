"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleListen = exports.start = exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

require("@babel/polyfill");

var _db = require("./utils/db");

var _config = _interopRequireDefault(require("./config"));

var _club = _interopRequireDefault(require("./api/club/club.router"));

var _family = _interopRequireDefault(require("./api/family/family.router"));

var _pin = _interopRequireDefault(require("./api/pin/pin.router"));

var _student = _interopRequireDefault(require("./api/student/student.router"));

var _timesheet = _interopRequireDefault(require("./api/timesheet/timesheet.router"));

var _timestamp = _interopRequireDefault(require("./api/timestamp/timestamp.router"));

var _user = _interopRequireDefault(require("./api/user/user.router"));

var _auth = require("./utils/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express.default)();
exports.app = app;
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _morgan.default)('dev'));
app.set('json spaces', 2); // if (process.env.NODE_ENV === 'production') {

app.use(_express.default.static('build')); // }

app.use('/api/club', _auth.protect, _club.default);
app.use('/api/family', _auth.protect, _family.default);
app.use('/api/pin', _auth.protect, _pin.default);
app.use('/api/student', _student.default);
app.use('/api/timesheet', _auth.protect, _timesheet.default);
app.use('/api/timestamp', _auth.protect, _timestamp.default);
app.use('/api/user', _auth.protect, _user.default);
app.post('/api/signup', _auth.signup);
app.post('/api/signin', _auth.signin);
app.get('/*', function (req, res) {
  res.sendFile(_path.default.join(__dirname, './index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

var start =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _db.connect)();

          case 3:
            app.listen(_config.default.port, handleListen(console.log, _config.default.port));
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

exports.start = start;

var handleListen = function handleListen(log, port) {
  return log("Listening on http://localhost:".concat(_config.default.port));
};

exports.handleListen = handleListen;
start();
//# sourceMappingURL=index.js.map
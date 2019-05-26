"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var env = process.env.NODE_ENV || 'development';
var baseConfig = {
  env: env,
  isDev: env === 'development',
  port: 3001,
  secrets: {
    jwtExp: '100d',
    jwt: 'default'
  },
  // dbUrl: 'mongodb://10.5.7.5:27017/87attendance'
  // dbUrl: 'mongodb://localhost:27017/87attendance'
  dbUrl: 'mongodb://edzh:password1@ds261616.mlab.com:61616/aftercaremanage'
};
var _default = baseConfig;
exports.default = _default;
//# sourceMappingURL=index.js.map
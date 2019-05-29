const env = process.env.NODE_ENV || 'development';

let config;

switch (env) {
  case 'development':
    config = {
      port: process.env.PORT || 3001,
      secrets: {
        jwtExp: '100d',
        jwt: 'default'
      },
      dbUrl: 'mongodb://localhost:27017/87attendance'
    };
    break;
  case 'production':
    config = {
      port: process.env.PORT || 3001,
      secrets: {
        jwtExp: '100d',
        jwt: 'default'
      },
      dbUrl: 'mongodb://edzh:password1@ds261616.mlab.com:61616/aftercaremanage'
    };
    break;
  default:
    config = {
      port: process.env.PORT || 3001,
      secrets: {
        jwtExp: '100d',
        jwt: 'default'
      },
      dbUrl: 'mongodb://localhost:27017/87attendance'
    };
}

export default config;

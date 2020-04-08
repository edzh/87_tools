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
        jwtExp: '7d',
        jwt: process.env.JWT_SECRET
      },
      dbUrl: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`
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

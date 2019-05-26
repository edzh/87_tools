const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  isDev: env === 'development',
  port: process.env.PORT || 3001,
  secrets: {
    jwtExp: '100d',
    jwt: 'default'
  },
  // dbUrl: 'mongodb://10.5.7.5:27017/87attendance'
  // dbUrl: 'mongodb://localhost:27017/87attendance'
  dbUrl: 'mongodb://edzh:password1@ds261616.mlab.com:61616/aftercaremanage'
};

export default baseConfig;

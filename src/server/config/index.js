const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  isDev: env === 'development',
  port: 3001,
  secrets: {
    jwtExp: '100d',
    jwt: 'default'
  },
  // dbUrl: 'mongodb://10.5.7.5:27017/87attendance'
  dbUrl: 'mongodb://localhost:27017/87attendance'
};

export default baseConfig;

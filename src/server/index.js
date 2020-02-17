import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import '@babel/polyfill';
import passport from 'passport';

import { connect } from './utils/db';
import config from './config';
import routes from './utils/routes';
import { signup, signin, protect, passportLocalStrategy } from './utils/auth';

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.set('json spaces', 2);

passport.use(passportLocalStrategy);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.use('/api', routes);
app.post('/api/signup', signup);
app.post('/api/signin', passport.authenticate('local'), signin);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, handleListen(console.log, config.port));
  } catch (e) {
    console.error(e);
  }
};

export const handleListen = (log, port) =>
  log(`Listening on http://localhost:${config.port}`);

start();

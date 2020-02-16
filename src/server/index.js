import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import '@babel/polyfill';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { connect } from './utils/db';
import config from './config';

import clubRouter from './api/club/club.router';
import familyRouter from './api/family/family.router';
import pinRouter from './api/pin/pin.router';
import programRouter from './api/program/program.router';
import sessionRouter from './api/session/session.router';
import studentRouter from './api/student/student.router';
import timesheetRouter from './api/timesheet/timesheet.router';
import timestampRouter from './api/timestamp/timestamp.router';

import userRouter from './api/user/user.router';
import { signup, signin, protect, newToken } from './utils/auth';

import { User } from './api/user/user.model';

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('json spaces', 2);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

passport.use(
  new LocalStrategy({ usernameField: 'email' }, function(
    username,
    password,
    done
  ) {
    User.findOne({ email: username }, async function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      const match = await user.checkPassword(password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use('/api/club', clubRouter);
app.use('/api/family', familyRouter);
app.use('/api/pin', pinRouter);
app.use('/api/program', programRouter);
app.use('/api/session', sessionRouter);
app.use('/api/student', studentRouter);
app.use('/api/timesheet', timesheetRouter);
app.use('/api/timestamp', timestampRouter);
app.use('/api/user', protect, userRouter);
app.post('/api/signup', signup);
app.post('/api/signin', passport.authenticate('local'), (req, res) => {
  const token = newToken(req.user);
  return res.status(201).send({ token });
});

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

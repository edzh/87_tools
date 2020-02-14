import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import '@babel/polyfill';

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
import { signup, signin, protect } from './utils/auth';

export const app = express();

app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('json spaces', 2);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

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
app.post('/api/signin', signin);

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

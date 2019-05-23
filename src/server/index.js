import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import { connect } from './utils/db';
import config from './config';

import clubRouter from './api/club/club.router';
import familyRouter from './api/family/family.router';
import pinRouter from './api/pin/pin.router';
import studentRouter from './api/student/student.router';
import timesheetRouter from './api/timesheet/timesheet.router';
import timestampRouter from './api/timestamp/timestamp.router';

import userRouter from './api/user/user.router';
import { signup, signin, protect } from './utils/auth';

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('json spaces', 2);

app.use('/api/club', protect, clubRouter);
app.use('/api/family', protect, familyRouter);
app.use('/api/pin', protect, pinRouter);
app.use('/api/student', studentRouter);
app.use('/api/timesheet', protect, timesheetRouter);
app.use('/api/timestamp', protect, timestampRouter);
app.use('/api/user', protect, userRouter);
app.post('/api/signup', signup);
app.post('/api/signin', signin);

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

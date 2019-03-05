import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import { connect } from './utils/db';
import config from './config';

import childRouter from './api/child/child.router';

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('json spaces', 2);

app.use('/api/child', childRouter);

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

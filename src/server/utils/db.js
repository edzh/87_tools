import mongoose from 'mongoose';
import config from '../config';

const dbUrl = config.dbUrl;

export const connect = (url = dbUrl) =>
  mongoose.connect(url, { useNewUrlParser: true });

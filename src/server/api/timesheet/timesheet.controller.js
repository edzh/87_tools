import { Timesheet } from './timesheet.model';
import { Timestamp } from '../timestamp/timestamp.model';

export const getOne = async (req, res) => {
  try {
    const timesheet = await Timesheet.findOne({ _id: req.params.id })
      .lean()
      .exec();

    if (!timesheet) {
      return res.status(400).end();
    }

    res.status(200).json({ data: timesheet });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getMany = async (req, res) => {
  try {
    const timesheets = await Timesheet.find(req.query)
      .lean()
      .exec();

    res.status(200).json({ data: timesheets });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const createOne = async (req, res) => {
  try {
    const timesheet = await Timesheet.create({ ...req.body });
    res.status(201).json({ data: timesheet });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOne = async (req, res) => {
  try {
    const updatedTimesheet = await Timesheet.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, upsert: true, safe: true }
    )
      .lean()
      .exec();

    if (!updatedTimesheet) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedTimesheet });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const removeOne = async (req, res) => {
  try {
    const removed = await Timesheet.findOneAndRemove({ _id: req.params.id });
    const removedTimestamps = await Timestamp.deleteMany({
      timesheet: removed._id
    });

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getTimestamps = async (req, res) => {
  try {
    const timesheet = await Timesheet.findOne({ _id: req.params.id });
    const timestamps = await Timestamp.find({ timesheet: timesheet.id });

    return res.status(200).json({ data: timestamps });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const controller = {
  getOne,
  getMany,
  createOne,
  updateOne,
  removeOne,
  getTimestamps
};

export default controller;

import { Session } from './session.model';
import { Club } from '../club/club.model';
import { Timesheet } from '../timesheet/timesheet.model';

export const getOne = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id })
      .lean()
      .exec();

    if (!session) {
      return res.status(400).end();
    }

    res.status(200).json({ data: session });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getMany = async (req, res) => {
  try {
    const sessions = await Session.find(req.query)
      .lean()
      .exec();

    res.status(200).json({ data: sessions });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const createOne = async (req, res) => {
  try {
    const session = await Session.create({ ...req.body });

    res.status(201).json({ data: session });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOne = async (req, res) => {
  try {
    const updatedSession = await Session.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, upsert: true, safe: true }
    )
      .lean()
      .exec();

    if (!updatedSession) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedSession });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const removeOne = async (req, res) => {
  try {
    const removed = await Session.findOneAndRemove({ _id: req.params.id });

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getClubs = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id });
    const clubs = await Club.find({ session: session.id, ...req.query });

    return res.status(200).json({ data: clubs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getTimesheets = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id });
    const timesheets = await Timesheet.find({
      session: session.id,
      ...req.query
    });

    return res.status(200).json({ data: timesheets });
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
  getClubs,
  getTimesheets
};

export default controller;

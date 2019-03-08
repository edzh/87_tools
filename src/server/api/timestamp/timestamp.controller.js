import { Timestamp } from './timestamp.model';

export const getOne = async (req, res) => {
  try {
    const timestamp = await Timestamp.findOne({ _id: req.params.id })
      .lean()
      .exec();

    if (!timestamp) {
      return res.status(400).end();
    }

    res.status(200).json({ data: timestamp });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getMany = async (req, res) => {
  try {
    const timestamps = await Timestamp.find(req.query)
      .lean()
      .exec();

    res.status(200).json({ data: timestamps });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const createOne = async (req, res) => {
  try {
    const timestamp = await Timestamp.create({ ...req.body });
    res.status(201).json({ data: timestamp });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOne = async (req, res) => {
  try {
    const updatedTimestamp = await Timestamp.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, upsert: true, safe: true }
    )
      .lean()
      .exec();

    if (!updatedTimestamp) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedTimestamp });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const removeOne = async (req, res) => {
  try {
    const removed = await Timestamp.findOneAndRemove({ _id: req.params.id });

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: removed });
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
  removeOne
};

export default controller;

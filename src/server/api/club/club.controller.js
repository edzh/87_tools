import { Club } from './club.model';

export const getOne = async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id })
      .lean()
      .populate('students')
      .exec();

    if (!club) {
      return res.status(400).end();
    }

    res.status(200).json({ data: club });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getMany = async (req, res) => {
  try {
    const clubs = await Club.find(req.query)
      .lean()
      .exec();

    res.status(200).json({ data: clubs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const createOne = async (req, res) => {
  try {
    const club = await Club.create({ ...req.body });
    res.status(201).json({ data: club });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOne = async (req, res) => {
  try {
    const updatedClub = await Club.findOneAndUpdate(
      { _id: req.params.id },
      // req.body,
      { $push: { students: [req.body.students] } },
      { new: true, upsert: true, safe: true }
    )
      .lean()
      .exec();

    if (!updatedClub) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedClub });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const removeOne = async (req, res) => {
  try {
    const removed = await Club.findOneAndRemove({ _id: req.params.id });

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

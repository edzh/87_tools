import { Club } from './club.model';
import { Session } from '../session/session.model';
import { Student } from '../student/student.model';

export const getOne = async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id })
      .lean()
      .populate('session', '-clubs')
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
      .sort({ day: 1, name: 1 })
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
    const club = await Club.findOne({ _id: req.params.id });

    const updatedClub = await Club.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      // { students: req.body.students },
      { new: true, upsert: true, safe: true }
    )
      .lean()
      .populate('session', '-clubs')
      .exec();

    if (!club.session.equals(updatedClub.session)) {
      await Session.findOneAndUpdate(
        { _id: club.session },
        { $pull: { clubs: req.params.id } },
        { new: true }
      );

      await Session.findOneAndUpdate(
        { _id: updatedClub.session },
        { $addToSet: { clubs: [req.params.id] } },
        { new: true }
      );
    }

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

export const getStudents = async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id });
    const students = await Student.find({ clubs: club.id })
      .sort({ name: 1 })
      .exec();

    return res.status(200).json({ data: students });
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
  getStudents
};

export default controller;

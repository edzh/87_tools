import { Program } from './program.model';
import { Session } from '../session/session.model';
import { Student } from '../student/student.model';
import { Family } from '../family/family.model';

export const getOne = async (req, res) => {
  try {
    const program = await Program.findOne({ _id: req.params.id })
      .lean()
      .exec();

    if (!program) {
      return res.status(400).end();
    }

    res.status(200).json({ data: program });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getMany = async (req, res) => {
  try {
    const programs = await Program.find(req.query)
      .lean()
      .exec();

    res.status(200).json({ data: programs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const createOne = async (req, res) => {
  try {
    const program = await Program.create({ ...req.body });

    res.status(201).json({ data: program });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOne = async (req, res) => {
  try {
    const updatedProgram = await Program.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, upsert: true, safe: true }
    )
      .lean()
      .exec();

    if (!updatedProgram) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedProgram });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const removeOne = async (req, res) => {
  try {
    const removed = await Program.findOneAndRemove({ _id: req.params.id });

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getSessions = async (req, res) => {
  try {
    const program = await Program.findOne({ _id: req.params.id });
    const sessions = await Session.find({ program: program._id });

    res.status(200).json({ data: sessions });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

export const getStudents = async (req, res) => {
  try {
    const program = await Program.findOne({ _id: req.params.id });
    const students = await Student.find({ program: program._id })
      .sort({
        name: 1
      })
      .populate({
        path: 'currentClubs',
        select: '-__v -students',
        options: {
          sort: { day: 1 }
        }
      });

    res.status(200).json({ data: students });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

export const getFamilies = async (req, res) => {
  try {
    const program = await Program.findOne({ _id: req.params.id });
    const families = await Family.find({ program: program._id }).sort({
      name: 1
    });

    res.status(200).json({ data: families });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const controller = {
  getOne,
  getMany,
  createOne,
  updateOne,
  removeOne,
  getSessions,
  getStudents,
  getFamilies
};

export default controller;

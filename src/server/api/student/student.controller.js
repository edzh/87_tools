import { Student } from './student.model';
import { Family } from '../family/family.model';
import { Club } from '../club/club.model';

export const getOne = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id })
      .lean()
      .populate({
        path: 'currentClubs',
        select: '-__v -students',
        options: {
          sort: { day: 1 }
        }
      })
      .populate('family', '-students -__v')
      .exec();

    if (!student) {
      return res.status(400).end();
    }

    res.status(200).json({ data: student });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getMany = async (req, res) => {
  try {
    const students = await Student.find(req.query)
      .lean()
      .populate({
        path: 'currentClubs',
        select: '-__v -students',
        options: { sort: { day: 1 } }
      })
      .sort({ name: 1 })
      .exec();

    res.status(200).json({ data: students });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const createOne = async (req, res) => {
  try {
    const student = await Student.create({ ...req.body });
    res.status(201).json({ data: student });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOne = async (req, res) => {
  try {
    // const student = await Student.findOne({ _id: req.params.id }).lean();

    const updatedStudent = await Student.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    )
      .lean()
      .populate({
        path: 'currentClubs',
        select: '-__v -students',
        options: {
          sort: { day: 1 }
        }
      })
      .populate('family', '-students -__v')
      .exec();

    if (!updatedStudent) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedStudent });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const removeOne = async (req, res) => {
  try {
    const removed = await Student.findOneAndRemove({ _id: req.params.id });

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getStudentClubs = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id });
    const clubs = await Club.find({ _id: { $in: student.clubs } });

    res.status(200).json({ data: clubs });
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
  getStudentClubs
};

export default controller;

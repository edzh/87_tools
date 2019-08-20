import { Student } from './student.model';
import { Family } from '../family/family.model';
import { Club } from '../club/club.model';

export const getOne = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id })
      .lean()
      .populate({
        path: 'clubs',
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
        path: 'clubs',
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
        path: 'clubs',
        select: '-__v -students',
        options: {
          sort: { day: 1 }
        }
      })
      .populate('family', '-students -__v')
      .exec();

    // if (!student.clubs.equals(updatedStudent.clubs)) {
    //   console
    // }

    // console.log(student.clubs, updatedStudent.clubs)

    // console.log(student.clubs.filter(i => updatedStudent.clubs.indexOf(i) < 0))

    // console.log(student.clubs.equals(updatedStudent.clubs));

    // if (!student.family.equals(updatedStudent.family)) {
    //   await Family.findOneAndUpdate(
    //     { _id: student.family },
    //     { $pull: { students: req.params.id } },
    //     { new: true }
    //   );

    //   await Family.findOneAndUpdate(
    //     { _id: updatedStudent.family },
    //     { $addToSet: { students: [req.params.id] } },
    //     { new: true }
    //   );
    // }

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

const controller = {
  getOne,
  getMany,
  createOne,
  updateOne,
  removeOne
};

export default controller;

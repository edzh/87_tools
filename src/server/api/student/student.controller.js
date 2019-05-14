import { Student } from './student.model';
import { Family } from '../family/family.model';

export const getOne = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id })
      .lean()
      .populate('clubs', '-__v')
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
      .populate('clubs', '-__v -students')
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
    const student = await Student.findOne({ _id: req.params.id });
    const oldFamily = await Family.findOneAndUpdate(
      { _id: student.family },
      { $pull: { students: req.params.id } },
      { new: true }
    );

    const updatedStudent = await Student.findOneAndUpdate(
      { _id: req.params.id },
      // {
      // $set: {
      //   name: req.body.name,
      //   grade: req.body.grade,
      //   pin: req.body.pin,
      //   clubs: []
      // }
      // $push: { clubs: [req.body.clubs] }
      // $set: { family: req.body.family }
      // },
      req.body,
      { new: true }
    )
      .lean()
      .exec();

    const newFamily = await Family.findOneAndUpdate(
      { _id: updatedStudent.family },
      { $addToSet: { students: [req.params.id] } },
      { new: true }
    );

    console.log(newFamily);

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

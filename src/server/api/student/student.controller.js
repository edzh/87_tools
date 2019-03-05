import { Student } from './student.model';

export const getOne = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id })
      .lean()
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
    const students = await Student.find({})
      .lean()
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
    const updatedStudent = await Student.findOneAneUpdate(
      { _id: req.params.id },
      req.body
    )
      .lean()
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

const controller = {
  getOne,
  getMany,
  createOne,
  updateOne,
  removeOne
};

export default controller;

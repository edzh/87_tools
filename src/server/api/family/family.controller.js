import { Family } from './family.model';

export const getOne = async (req, res) => {
  try {
    const family = await Family.findOne({ _id: req.params.id })
      .lean()
      .populate('clubs', '-_id -__v')
      .populate('students', '-clubs')
      .exec();

    if (!family) {
      return res.status(400).end();
    }

    res.status(200).json({ data: family });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getMany = async (req, res) => {
  try {
    const families = await Family.find(req.query)
      .lean()
      .populate('clubs', '-_id -__v -families')
      .exec();

    res.status(200).json({ data: families });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const createOne = async (req, res) => {
  try {
    const family = await Family.create({ ...req.body });
    res.status(201).json({ data: family });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOne = async (req, res) => {
  try {
    const updatedFamily = await Family.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      // { $push: { students: [req.body.student] } },
      // // {
      // //   // $set: {
      // //   //   name: req.body.name,
      // //   //   grade: req.body.grade,
      // //   //   pin: req.body.pin,
      // //   //   clubs: []
      // //   // }
      // //   $push: { clubs: [req.body.clubs] }
      // // },
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedFamily) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedFamily });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const removeOne = async (req, res) => {
  try {
    const removed = await Family.findOneAndRemove({ _id: req.params.id });

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

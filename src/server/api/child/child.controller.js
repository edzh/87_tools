import { Child } from './child.model';

export const getOne = async (req, res) => {
  try {
    const child = await Child.findOne({ _id: req.params.id })
      .lean()
      .exec();

    if (!child) {
      return res.status(400).end();
    }

    res.status(200).json({ data: child });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getMany = async (req, res) => {
  try {
    const children = await Child.find({})
      .lean()
      .exec();

    res.status(200).json({ data: children });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const createOne = async (req, res) => {
  try {
    const child = await Child.create({ ...req.body });
    res.status(201).json({ data: child });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOne = async (req, res) => {
  try {
    const updatedChild = await Child.findOneAneUpdate(
      { _id: req.params.id },
      req.body
    )
      .lean()
      .exec();

    if (!updatedChild) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedChild });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const removeOne = async (req, res) => {
  try {
    const removed = await Child.findOneAndRemove({ _id: req.params.id });

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

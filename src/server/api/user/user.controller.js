import { User } from './user.model';
import { Program } from '../program/program.model';

export const me = (req, res) => {
  res.status(200).json({ data: req.user });
};

export const updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    })
      .lean()
      .exec();

    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getPrograms = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const programs = await Program.find({ owner: user._id });

    res.status(200).json({ data: programs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

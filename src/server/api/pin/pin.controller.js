import { Family } from '../family/family.model';

export const getOne = async (req, res) => {
  try {
    const pin = await Family.findOne({ 'pickups.pin': { $eq: req.params.pin } })
      .populate('students')
      .lean()
      .exec();

    if (!pin) {
      console.log(req.params.pin, 'pin not found');
      return res.status(400).end();
    }

    res.status(200).json({ data: pin });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const controller = {
  getOne
};

export default controller;

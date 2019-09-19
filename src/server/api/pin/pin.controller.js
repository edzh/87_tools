import { Family } from '../family/family.model';
import { Student } from '../student/student.model';

export const getOne = async (req, res, next) => {
  try {
    const studentPin = await Student.findOne({ pin: req.params.pin })
      .populate('currentClubs', '-__v -students')
      .lean()
      .exec();

    if (studentPin) {
      return res.status(200).json({ data: { ...studentPin, type: 'student' } });
    }

    const familyPin = await Family.findOne({
      'pickups.pin': { $eq: req.params.pin }
    })
      .lean()
      .exec();

    if (!familyPin) {
      console.log(req.params.pin, 'does not exist!');
      return res.status(400).end();
    }

    res.status(200).json({ data: { ...familyPin, type: 'family' } });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const controller = {
  getOne
};

export default controller;

import { Router } from 'express';

import clubRouter from '../api/club/club.router';
import familyRouter from '../api/family/family.router';
import pinRouter from '../api/pin/pin.router';
import programRouter from '../api/program/program.router';
import sessionRouter from '../api/session/session.router';
import studentRouter from '../api/student/student.router';
import timesheetRouter from '../api/timesheet/timesheet.router';
import timestampRouter from '../api/timestamp/timestamp.router';
import userRouter from '../api/user/user.router';
import { signup, signin, protect, passportLocalStrategy } from './auth';

const router = Router();

router.use('/club', clubRouter);
router.use('/family', familyRouter);
router.use('/pin', pinRouter);
router.use('/program', programRouter);
router.use('/session', sessionRouter);
router.use('/student', studentRouter);
router.use('/timesheet', timesheetRouter);
router.use('/timestamp', timestampRouter);
router.use('/user', protect, userRouter);

export default router;

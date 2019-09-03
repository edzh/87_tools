import { Router } from 'express';

import User from '../student/student.model';
import controller from './timesheet.controller';

const router = Router();

router
  .route('/')
  .get(controller.getMany)
  .post(controller.createOne);

router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.removeOne);

router.route('/:id/timestamps').get(controller.getTimestamps);

export default router;

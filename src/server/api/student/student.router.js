import { Router } from 'express';

import User from './student.model';
import controller from './student.controller';

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

router.route('/:id/clubs').get(controller.getStudentClubs);

export default router;

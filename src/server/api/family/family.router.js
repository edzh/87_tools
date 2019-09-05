import { Router } from 'express';

import User from './family.model';
import controller from './family.controller';

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

router.route('/:id/students').get(controller.getStudents);

export default router;

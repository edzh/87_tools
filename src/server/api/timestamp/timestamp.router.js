import { Router } from 'express';

import User from './timestamp.model';
import controller from './timestamp.controller';

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

router.route('/week/:date').get(controller.getWeek);

export default router;

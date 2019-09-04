import { Router } from 'express';

import controller from './session.controller';

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

router.route('/:id/clubs').get(controller.getClubs);
router.route('/:id/timesheets').get(controller.getTimesheets);

export default router;

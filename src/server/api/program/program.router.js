import { Router } from 'express';

import controller from './program.controller';

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

router.route('/:id/sessions').get(controller.getSessions);
router.route('/:id/students').get(controller.getStudents);
router.route('/:id/families').get(controller.getFamilies);

export default router;

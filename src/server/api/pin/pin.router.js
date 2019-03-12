import { Router } from 'express';

import controller from './pin.controller';

const router = Router();

router.route('/:pin').get(controller.getOne);

export default router;

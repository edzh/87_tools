import { Router } from 'express';
import { me, updateMe, findAll, getPrograms } from './user.controller';

const router = Router();

router.get('/', me);
router.put('/', updateMe);
router.get('/programs', getPrograms);

export default router;

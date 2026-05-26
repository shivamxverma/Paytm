import {Router} from 'express';
import { verifyJWT } from '../../shared/middleware.js';
import { getMe, getUser, getAllUser, searchUsers } from './user-controller.js';
const router = Router();

router.get('/me', verifyJWT, getMe);
router.get('/search', verifyJWT, searchUsers);
router.get('/:userId', verifyJWT, getUser);
router.get('/', verifyJWT, getAllUser);

export default router;
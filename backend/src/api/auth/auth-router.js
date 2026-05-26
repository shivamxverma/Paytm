import {Router} from 'express';
import { EmailPasswordRegister } from './auth-controller';

const router = Router();

router.post('/register', EmailPasswordRegister);
router.post('/login', EmailPasswordLogin);

export default router;
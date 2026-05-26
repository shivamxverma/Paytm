import {Router} from 'express';
import { EmailPasswordRegister, EmailPasswordLogin } from './auth-controller.js';
import { EmailPasswordRegisterSchema, EmailPasswordLoginSchema} from './auth-schema.js';
import validate from '../../shared/validate.js';

const router = Router();

router.post('/register',validate(EmailPasswordRegisterSchema), EmailPasswordRegister);
router.post('/login',validate(EmailPasswordLoginSchema) ,EmailPasswordLogin);

export default router;
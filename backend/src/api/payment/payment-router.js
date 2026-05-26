import {Router} from 'express';
import { verifyJWT } from '../../shared/middleware';
import { addMoney } from '../payment/payment-controller';
import { AddMoneySchema } from './payment-schema.js';
import validate from '../../shared/validate.js';

const router = Router();

router.post('/add-money', validate(AddMoneySchema), verifyJWT, addMoney);

export default router;
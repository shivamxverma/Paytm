import {Router} from 'express';
import { verifyJWT } from '../../shared/middleware';
import { addMoney, transferMoney, getTransactions } from './payment-controller';
import { AddMoneySchema, TranferMoneySchema } from './payment-schema.js';
import validate from '../../shared/validate.js';

const router = Router();

router.post('/add-money', validate(AddMoneySchema), verifyJWT, addMoney);
router.post('/transfer/:userId', validate(TranferMoneySchema), verifyJWT, transferMoney);
router.get('/transactions', verifyJWT, getTransactions);

export default router;
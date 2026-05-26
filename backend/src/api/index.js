import { Router } from 'express';
import authRouter from './auth/auth-router.js';
import paymentRouter from './payment/payment-router.js';
import userRouter from './user/user-router.js';

const router = Router();

const routes = [
    { path : '/auth' , route: authRouter},
    { path : '/payment' , route: paymentRouter},
    { path: '/user' , route: userRouter}
]

routes.forEach((r) => {
    router.use(r.path, r.route);
});

export default router;

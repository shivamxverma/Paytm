import { Router } from 'express';
import authRouter from './auth/auth-router.js';
import paymentRouter from './payment/payment-router.js';

const router = Router();

const routes = [
    { path : '/auth' , route: authRouter},
    { path : '/payment' , route: paymentRouter}
]

routes.forEach((r) => {
    router.use(r.path, r.route);
});

export default router;

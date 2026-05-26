import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './api/index.js';

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

async function startServer() {
    const app = express();
    const port = process.env.PORT;

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api/v1', router);
    app.listen(port, () => {

        console.log(`Server is started at ${port}`);
    });
}

startServer();


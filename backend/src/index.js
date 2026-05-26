import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config({});

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
    app.listen(port, () => {

        console.log(`Server is started at ${port}`);
    });
}

startServer();


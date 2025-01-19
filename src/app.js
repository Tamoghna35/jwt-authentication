import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import globalErrorHandler from './utils/GlobalErrorHandler.js';

import UserRouter from './routes/user.router.js';
import TaskRouter from './routes/task.router.js';
const app = express();

const cors_config = {
    origin: process.env.CORS_ORIGIN,
    credentials: true
}

app.use(cors(cors_config));
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/task', TaskRouter);

app.use(globalErrorHandler);
export { app }
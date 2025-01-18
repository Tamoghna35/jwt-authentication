import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import globalErrorHandler from './utils/GlobalErrorHandler.js';
const app = express();

coes_config = {
    origin: process.env.CORS_ORIGIN,
    credentials: true
}

app.use(cors(coes_config));
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())


app.use(globalErrorHandler);
export { app }
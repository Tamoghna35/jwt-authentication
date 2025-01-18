import dotenv from "dotenv"
import { connectDB } from "./models/index.js";
import express from "express";
import { app } from "./app.js";
const PORT = process.env.PORT || 3000;

dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`⚙️ Server is running at port : ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

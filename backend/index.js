import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './utils/db.js'
dotenv.config({});

const app = express();
const PORT = process.env.PORT||8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsConfig = {
    origin: 'http//localhost:3000',
    Credentials:true

}
app.use(cors(corsConfig))
app.listen(PORT, () => {
    connectDB();
    console.log(`server running at port ${PORT}`)
})
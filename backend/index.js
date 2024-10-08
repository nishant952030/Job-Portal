import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './utils/db.js';
import userRoute from "./routes/user.routes.js";
import CompanyRouter from './routes/company.js';
import JobRouter from './routes/job.js'
import ApplicationRouter from './routes/application.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsConfig = {
    origin: 'https://job-portal-ten-blond.vercel.app', //'http://localhost:5173', // Frontend URL
    credentials: true
};
app.use(cors(corsConfig));


app.get("/", (req, res) => {
    return res.json({ message: "hello there" });
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", CompanyRouter);
app.use("/api/v1/jobs", JobRouter);
app.use("/api/v1/application", ApplicationRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});

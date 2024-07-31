import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appoinmentRouter.js"
import { errorMiddleware } from "./middleware/errorMiddleware.js";

config({ path: "./config/.env" });

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("Database connected"))
        .catch((error) => console.log("Error occurred:", error));
};

const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



app.use('/api/v1/message', messageRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/appointment', appointmentRouter);

dbConnection();

app.use(errorMiddleware);

export default app;

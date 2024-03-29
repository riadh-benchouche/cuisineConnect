import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRouter from './src/routes/authRouter.js';

dotenv.config();
const corsOptions = {
    origin: process.env.FRONT_URL,
    credentials: true,
};
const app = express();
app.use(express.urlencoded({extended: true, limit: "16mb"}));
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/auth', authRouter);

try {
    mongoose.connect(process.env.MONGO_URL).then(r => console.log("Connected to MongoDB"));
} catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
}

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});




import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connectDB.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRoute from './routes/user.route.js'
import emailRoute from "./routes/email.route.js"

dotenv.config({});

connectDB();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

//middleware

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

 

//routes
app.use("/api/v1/user",userRoute)
app.use("/api/v1/email",emailRoute)

app.listen(PORT,()=>{
    console.log(` server running at port${PORT}`)
})
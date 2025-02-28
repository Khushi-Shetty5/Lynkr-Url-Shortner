import express from "express";
import connectToMongo from './connection.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import staticRoute from './routes/staticRouter.js';
import urlRoute from './routes/url.js';
import userRoute from './routes/user.js';
import dotenv from 'dotenv';
import { checkForAuthentication,restrictTo} from "./middlewares/auth.js";

dotenv.config();
const app=express(); 
const PORT = process.env.PORT || 8001;  
const MONGO_URL = process.env.MONGO_URL;

app.set("view engine","ejs");
app.set('views',path.resolve("./views"));


connectToMongo(MONGO_URL).then(()=>console.log("mongodb connected"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use("/user",userRoute);
app.use('/',staticRoute);

app.listen(PORT,()=>console.log(`server started at PORT ${PORT}`))
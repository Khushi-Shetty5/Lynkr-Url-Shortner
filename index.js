import express from "express";
import urlRoute from './routes/url.js';
import connectToMongo from './connection.js';
// const { connectToMongo } = default;

const app=express(); 
const PORT=8005;

connectToMongo('mongodb://localhost:27017/short-url').then(()=>console.log("mongodb connected"));

app.use("/url",urlRoute)
app.listen(PORT,()=>console.log("server started at PORT ${PORT}"))
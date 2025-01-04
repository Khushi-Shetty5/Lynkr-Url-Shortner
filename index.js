import express from "express";
import urlRoute from './routes/url.js';
import connectToMongo from './connection.js';
import URL from "./model/url.js";


const app=express(); 
const PORT=3001;

connectToMongo('mongodb://localhost:27017/short-url').then(()=>console.log("mongodb connected"));

app.use(express.json())
app.use("/url",urlRoute)
app.get('/:shortId',async (req,res)=>{
        const shortId=req.params.shortId;
        const entry=await URL.findOneAndUpdate({shortId},{$push:{visitedHistory:{timestamp:Date.now(),},},})
        res.redirect(entry.redirectUrl)
    }
)


app.listen(PORT,()=>console.log(`server started at PORT ${PORT}`))
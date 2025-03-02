import express from 'express';
import URL from '../model/url.js'
import { checkForAuthentication,restrictTo} from "../middlewares/auth.js";
import validator from 'validator';
import {methodGetAnalytics} from '../controller/url.js'

const router=express.Router();

router.get('/admin/urls',restrictTo(['ADMIN']),async(req,res,next)=>{
    try{
    const allurls=await URL.find({});
    return res.render("home",{urls:allurls});
    }catch(error){
        next(error);
    }
})


router.get('/',restrictTo(["NORMAL","ADMIN"]),async (req,res)=>{
   
    try {
        const allurls = await URL.find({ createdBy: req.user._id });
        return res.render("home", { urls: allurls, user: req.user });
    } catch (error) {
        res.status(500).json({ error: "Error retrieving URLs" });
    }
});

router.get('/signup',(req,res)=>
{
    res.render("signUp", { error: null });
});
router.get('/login',(req,res)=>
    {
        res.render("login", { error: null });
    });

 router.post('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.redirect('/login');
 })
export default router;
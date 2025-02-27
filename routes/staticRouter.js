import express from 'express';
import URL from '../model/url.js'
import { checkForAuthentication,restrictTo} from "../middlewares/auth.js";

const router=express.Router();

router.get('/admin/urls',restrictTo(['ADMIN']),async(req,res,next)=>{
    const allurls=await URL.find({});
    return res.render("home",{urls:allurls});
})


router.get('/',restrictTo(["NORMAL","ADMIN"]),async (req,res)=>{
   
   const allurls=await URL.find({createdBy:req.user._id});
    return res.render("home",{urls:allurls});
});
router.get('/signup',(req,res)=>
{
     return res.render("signUp");
});
router.get('/login',(req,res)=>
    {
        return res.render("login");
    });
export default router;
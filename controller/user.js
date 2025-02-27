 import User from '../model/user.js'
//  import { v4 as uuidv4 } from 'uuid';
 import {setUser,getUser} from '../service/auth.js'
 
async function handleUserSignup(req,res)
{
    const {name,email,password}=req.body;
    await User.create({
        name,email,password
    });
    return res.redirect("/");
}
async function handleUserLogin(req,res)
{
    const {email,password}=req.body;
    const user=await User.findOne({
        email,password
    });
    if(!user)
    {
        res.render("login",{error:"Invalid username or password",})
    }
    
    const token= setUser(user);
    res.cookie("token",token); 
    return res.redirect("/");
}


export {handleUserSignup,handleUserLogin};
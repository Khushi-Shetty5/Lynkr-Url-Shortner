 import User from '../model/user.js'
//  import { v4 as uuidv4 } from 'uuid';
 import {setUser,getUser} from '../service/auth.js'
 import validator from 'validator'; 
 
async function handleUserSignup(req,res)
{
    const {name,email,password}=req.body;
    if (!validator.isEmail(email)) {
        return res.render("signUp", { error: "Invalid email address" });
    };

    if (!validator.isLength(password, { min: 6 })) {
        return res.render("signUp", { error: "Password must be at least 6 characters long" });
    };
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.render("signUp", { error: "Email already registered" });
        }
    
       
        const user = await User.create({ name, email, password });
        req.body.user=user;
    return res.redirect("/");
}
catch(error){
    res.render("signUp", { error: "Error creating user, please try again" });
}
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.render("login", { error: "Invalid email address" });
}

  const user = await User.findOne({ email });
  
  
  if (!user) {
    return res.render("login", { error: "Invalid username or password" });
  }

  
  const isMatch = await user.isPasswordMatch(password);
  if (!isMatch) {
    return res.render("login", { error: "Invalid username or password" });
  }

  
  const token = setUser(user);
  res.cookie("token", token,{
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 3600000,
  });
  return res.redirect("/");
}

export {handleUserSignup,handleUserLogin};
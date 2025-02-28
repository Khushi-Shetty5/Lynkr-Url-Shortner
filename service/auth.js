import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const secret=process.env.secret_key;
function setUser(user)
{
    const options = {
        expiresIn: '1h', 
    };
    return jwt.sign(
        {
        _id:user._id,
        email:user.email,
        role:user.role,
    },secret,options);
}
function getUser(token)
{
    if(!token)
        return null;
    try{
        return jwt.verify(token,secret);
    }catch(error)
    {
        console.error("Token verification failed:", error);
        return null;
    }
    
}
export {setUser,getUser};
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const secret=process.env.secret_key;
function setUser(user)
{

    return jwt.sign(
        {
        _id:user.id,
        email:user.email,
        role:user.role,
    },secret);
}
function getUser(token)
{
    if(!token)
        return null;
    try{
        return jwt.verify(token,secret);
    }catch(error)
    {
        return null;
    }
    
}
export {setUser,getUser};
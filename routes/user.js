import express from 'express';
import{handleUserSignup,handleUserLogin } from '../controller/user.js'
import {logout} from '../service/auth.js'
const router=express.Router();
router.post('/',handleUserSignup)
router.post('/login',handleUserLogin)
router.post('/logout', logout);

export default router;
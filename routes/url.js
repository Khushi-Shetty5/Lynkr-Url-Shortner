import express from 'express';
import  methodGetShortUrls  from '../controller/url.js';

const router=express.Router();

router.post('/',methodGetShortUrls);
export default router;
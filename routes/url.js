import express from 'express';
import  {methodGetShortUrls,methodGetAnalytics} from '../controller/url.js';

const router=express.Router();

router.post('/',methodGetShortUrls);
// router.get('/:id',methodGetShortUrl);
router.get('/analytics/:shortId',methodGetAnalytics);

export default router;

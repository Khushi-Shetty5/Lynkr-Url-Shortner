import express from 'express';
import  {handleGenerateNewShortURL,methodGetAnalytics,methodRouteUrl} from '../controller/url.js';

const router=express.Router();

router.post('/',handleGenerateNewShortURL);
// router.get('/:id',methodGetShortUrl);
router.get('/analytics/:shortId',methodGetAnalytics);
router.get('/:shortId',methodRouteUrl);
export default router;

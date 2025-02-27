
import { nanoid } from 'nanoid';
import isURL from 'validator/lib/isURL.js'
import URL from '../model/url.js';

async function handleGenerateNewShortURL(req,res)
{
   const body=req.body;
   if (!body.url || !isURL(body.url)) {
  return res.status(400).json({ error: "A valid URL is required" });
    }


    let shortID = nanoid(8);
    let urlExists = await URL.findOne({ shortId: shortID });
    while (urlExists) {
      shortID = nanoid(8);
      urlExists = await URL.findOne({ shortId: shortID });
    }
   // console.log(shortID);
  await   URL.create({
    shortId:shortID,
    redirectURL:body.url,
    visitedHistory:[],
    createdBy:req.user._id,
   });
   return res.render("home",{id:shortID,})
}


async function methodGetAnalytics(req,res)
{
   const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    if (!result) {
      return res.status(404).json({ error: "URL not found" });
   }
    return res.json({totalClicks:result.visitedHistory.length, analytics:result.visitedHistory,});
}
async function methodRouteUrl(req,res){
   
      const shortId=req.params.shortId;
      const entry=await URL.findOneAndUpdate({shortId,},{$push:{visitedHistory:{timestamp:Date.now(),},},});
      if (!entry) {
         return res.status(404).json({ error: "URL not found" });
      }
   
      // console.log(val.redirectUrl)
      res.redirect(entry.redirectURL)
  
}
export {handleGenerateNewShortURL,methodGetAnalytics,methodRouteUrl};
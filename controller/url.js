
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
    let shortIdExists = await URL.findOne({ shortId: shortID });
    while (shortIdExists) {
      shortID = nanoid(8);
      urlExists = await URL.findOne({ shortId: shortID });
    }
   // console.log(shortID);
  await   URL.create({
    shortId:shortID,
    redirectURL:body.url,
    visitedHistory:[],
    createdBy:req.user?req.user._id :null,
   });
   const urls = await URL.find({ createdBy: req.user ? req.user._id : null });
   return res.render("home",{id:shortID,urls})
}


async function methodGetAnalytics(req, res) {
   try {
      //  console.log("Analytics function called"); // Debugging

       const shortId = req.params.shortId;
      //  console.log("Short ID:", shortId); // Debugging

       const result = await URL.findOne({ shortId });

       if (!result) {
         //   console.log("URL not found"); // Debugging
           return res.status(404).send("<h2>URL not found</h2>");
       }

      //  console.log("Visited History Data:", result.visitedHistory);

      //  console.log("Rendering analytics page..."); // Debugging

       return res.render("analytics", {
           shortId: result.shortId,
           totalClicks: result.visitedHistory.length,
           analytics: result.visitedHistory,
         // analytics: [],
       });
   } catch (error) {
      //  console.error("Error fetching analytics:", error); // Debugging
       return res.status(500).send("<h2>Internal Server Error</h2>");
   }
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
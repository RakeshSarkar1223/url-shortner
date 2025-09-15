const {nanoid} = require("nanoid")
const URL = require('../models/url')

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    console.log("Request body:", body);
    
    if(!body.url){
        return res.status(400).json({"error": "url is required"})
    }
    
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(body.url)) {
        return res.status(400).json({"error": "Please provide a valid URL starting with http:// or https://"});
    }
    
    const shortId = nanoid(8);
    
    try {
        await URL.create({
            shortId: shortId,
            redirectURL: body.url,
            visitHistory: [],
        });
        
        return res.json({ id: shortId });
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: "Failed to create short URL" });
    }
}


async function handleRedirect(req, res) {
    const shortId = req.params.shortId;
    
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { 
                $push: { 
                    visitHistory: { 
                        timestamp: new Date() 
                    } 
                } 
            },
            { new: true } 
        );
        
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }
        
        return res.redirect(entry.redirectURL);
        
    } catch (error) {
        console.error("Error during redirect:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirect,
}

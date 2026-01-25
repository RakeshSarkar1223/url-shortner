const urlService = require("../service/url.service");

const GenerateShortId = async (req, res) => {
    try {
        const {newUrl, user} =await urlService.generate(req);
        if(!newUrl || !user){
            throw new Error("No url or User is there!!");
        }
        res.status(201).json({
            "status":"URL generated Successfully",
            "username":user.username,
            "originalUrl":newUrl.originalUrl,
            "shortID":newUrl.shortId
        });

    } catch (error) {
        res.status(400).json({"error":error.message});
    }
}


const RedirectURL = async (req, res) => {
    try {
        const url = await urlService.redirect(req);
        if(!url){
            throw new Error("Invalid shortID!!");
        }
        res.redirect(url.originalUrl);
    } catch (error) {
        res.status(400).json({"error":error.message});
    }
}


module.exports = {
    GenerateShortId,
    RedirectURL
}
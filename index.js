const express = require("express")
const connectToMongo = require('./connect')
const urlRoutes = require("./routes/url")
const URL = require("./models/url")

const app = express();
const PORT = 3005;

connectToMongo('mongodb://localhost:27017/short-URL').then(() => console.log("mongodb connected"))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: "Invalid JSON format" });
    }
    next();
});

app.use('/url', urlRoutes);

app.get("/:shortId", async (req, res) => {
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId: req.params.shortId },
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
        
        res.redirect(entry.redirectURL);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


app.listen(PORT, (err) => {
    if(err) console.log("There is an error ", err)
    else console.log(`Server started successfully on port ${PORT} `)
})
const {GenerateShortId, RedirectURL} = require("../controller/url.controller");
const checkAuth = require("../middleware/protect");
const express = require("express");

const Router = express();

Router.get("/:shortId", RedirectURL);
Router.post("/shorten", checkAuth, GenerateShortId);


module.exports = Router;
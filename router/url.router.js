const {GenerateShortId} = require("../controller/url.controller");
const checkAuth = require("../middleware/protect");
const express = require("express");

const Router = express();

Router.post("/shorten", checkAuth, GenerateShortId);


module.exports = Router;
const express = require("express");
const {Register, Login, Logout} = require("../controller/auth.controller")
const Router = express();
const protect = require("../middleware/protect")


Router.post("/register",Register);
Router.post("/login",Login);
Router.post("/logout",Logout);
Router.get("/test-auth", protect, (req, res) => {
    res.status(200).json({ message: "You made it!", user: req.user })
});



module.exports = Router;
const express = require("express");
const AuthRouter = require("./router/auth.route");
const connect = require("./utils/connect");
const cookieParser = require("cookie-parser");
const UrlRouter = require("./router/url.router");
const path = require("path");

require("dotenv").config();
connect(process.env.MONGO_URI)
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());


app.get("/", (req, res) => {
    res.render("index");
});

app.use("/api/auth",AuthRouter);
app.use("/api", UrlRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
})
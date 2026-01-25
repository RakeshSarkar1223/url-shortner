const express = require("express");
const AuthRouter = require("./router/auth.route");
const connect = require("./utils/connect");
const cookieParser = require("cookie-parser");
const UrlRouter = require("./router/url.router");

require("dotenv").config();
connect(process.env.MONGO_URI)
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",AuthRouter);
app.use("/api",UrlRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
})
const express = require("express");
const app = express();
const home = require("./router/default/home");
const login = require("./router/admin/login");
const bodyParse = require("body-parser");
const session = require("express-session");
const adminauth = require("./middleware/adminauth");
const article = require("./router/admin/article");
let origin = ["http://localhost:3000", "http://localhost:3002"];
app.all("*", (req, res, next) => {
  if (origin.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  }
});
app.use(bodyParse.json());
app.use(bodyParse.urlencoded());
app.use(
  session({
    secret: "signkey",
    saveUninitialized: false,
    name: "session_id",
    resave: false,
  })
);
app.use('/admin',adminauth)
app.use("/admin", article);

app.use("/default", home);
app.use("/login", login);
// console.log(11)
app.listen(3001, () => {
  console.log("service start success");
});

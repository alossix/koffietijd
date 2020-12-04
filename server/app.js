require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);

const app = express();

require("./configs/db.config.js");
require("./configs/passport.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    genid: (req) => {
      return uuidv4();
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ url: process.env.MONGODB_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use("/", require("./routes/index.routes"));
app.use("/api", require("./routes/auth.routes"));
app.use("/api", require("./routes/user.routes"));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

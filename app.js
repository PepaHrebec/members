var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

// init app
var app = express();

// init session
app.use(
  session({ secret: "supersecret", resave: false, saveUninitialized: false })
);

// init strategies and passport
const initializePassport = require("./passport_config");
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require("./routes/index");

// connect to MongoDB
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.PASSWD;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// use routers
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

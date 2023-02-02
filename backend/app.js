const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sessions = require("express-session");
var cors = require("cors");
const getCurrentUser = require("./middlewares/getCurrentUser");

require("dotenv").config();
// connection to db
require("./models")();

var usersRouter = require("./routes/users");
var todoRouter = require("./routes/todo");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: "secretkeyforjustthistest",
    saveUninitialized: true,
    // cookie: { maxAge: oneDay },
    resave: true,
  })
);

app.use("/api/users", usersRouter);
app.use("/api/todo", getCurrentUser, todoRouter);

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
  res.json({ errors: err.message });
});

module.exports = app;

// Importing node modules
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Importing routes
var indexRouter = require("./routes/index");
var homeRouter = require("./routes/home");
var studentsRouter = require("./routes/students");
var testsRouter = require("./routes/tests");
var newtestRouter = require("./routes/newtest");
var logoutRouter = require("./routes/logout");

// Connecting to database using dbConnect.js
var connect = require("./dbConnect");

// Setting object APP to Express JS
var app = express();

// Setting view engine and viewports
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Setting routes for webpages
app.use("/home", homeRouter);
app.use("/", indexRouter);
app.use("/students", studentsRouter);
app.use("/tests", testsRouter);
app.use("/newtest", newtestRouter);
app.use("/logout", logoutRouter);

// Catching error 404 and forwarding to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Setting response local variables, only for providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Rendering the error page if error 500 is found
  res.status(err.status || 500);
  res.render("error");
});

// Exporting through router
module.exports = app;

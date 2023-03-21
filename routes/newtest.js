// Importing modules to set view routing for Express JS
var express = require("express");
var router = express.Router();

// Importing Schemas for MongoDB Database Collections
const User = require("../model/User");
const Students = require("../model/Students");
const Tests = require("../model/Tests");

// GET request to retrieve webpage on arrival
router.get("/", (req, res) => {
  // Retrieving the database collection
  User.find((err, data) => {
    if (err) res.send(err);
    else {
      Tests.find((err, tdata) => {
        if (err) res.send(err);
        else {
          // if no errors are found, check if user is logged in
          for (var i = 0; i < data.length; i++) {
            if (data[i].loggedIn == true) {
              var subject = data[i].subject;

              // render NEWTEST.ejs view while exporting relevant collection data
              res.render("newtest", {
                logdata: data,
                tdata: tdata,
                subject: subject,
              });
            }
          }
        }
      });
    }
  });
});

// POST request to get testDetails and perform necessary operations
router.post("/", (req, res) => {
  // Assigning the data in the input fields as
  const tname = req.body.testName;
  const sub = req.body.subject;
  const tdate = req.body.date;
  const max = req.body.maxMarks;
  const marksAtt = req.body.marksAtt;

  // Algorithm to take marks as a string separated by spaces and calculate the average score and percentile
  var sum = 0,
    lastspace = 0,
    n = 0,
    c = 0;
  var str = "";

  for (var i = 0; i < marksAtt.length - 1; i++) {
    // Substringing and parseing from last whitespace to current whitespace
    if (marksAtt[i] == " ") {
      str = marksAtt.slice(lastspace, i);
      n = parseInt(str);
      sum += n;
      lastspace = i + 1;
      c++;
    }

    // To calculate the final number, which lacks a whitespace
    if (i == marksAtt.length - 2) {
      str = marksAtt.slice(lastspace, i + 2);
      n = parseInt(str);
      sum += n;
      c++;
    }
  }

  n = parseInt(max);
  var avg = sum / c;
  avg = Math.round(avg * 10) / 10;

  var scale = (avg * 100) / n;
  scale = Math.round(scale * 10) / 10;

  // Assigning the value of the request body to prepare to push to TESTS collection in database
  req.body = {
    name: tname,
    subject: sub,
    date: tdate,
    results: [avg, n, scale],
  };

  // Creating an object to call and push the request body
  const tests = new Tests(req.body);

  // save function to push the object TESTS
  tests.save((err, data) => {
    if (err) res.send(err);
    else res.redirect(301, "../tests");
  });
});

// Exporting through router
module.exports = router;

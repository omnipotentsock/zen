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
              // render TESTS.ejs view while exporting relevant collection data
              res.render("tests", {
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

// POST request to send to NEWTEST.ejs by using router
router.post("/", (req, res) => {
  res.redirect("/newtest");
});

// Exporting through router
module.exports = router;

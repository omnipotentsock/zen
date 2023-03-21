// Importing modules to set view routing for Express JS
var express = require("express");
var router = express.Router();

// Importing Schemas for MongoDB Database Collections
const User = require("../model/User");
const Students = require("../model/Students");

// GET request to retrieve webpage on arrival
router.get("/", (req, res) => {
  // Retrieving the database collection
  User.find((err, data) => {
    if (err) res.send(err);
    else {
      Students.find((err, stdata) => {
        if (err) res.send(err);
        else {
          // if no errors are found, check if user is logged in
          for (var i = 0; i < data.length; i++) {
            if (data[i].loggedIn == true) {
              var subject = data[i].subject;
              // render STUDENTS.ejs view while exporting relevant collection data
              res.render("students", {
                logdata: data,
                stdata: stdata,
                subject: subject,
              });
            }
          }
        }
      });
    }
  });
});

// POST request to push login details to loginDetails collection
router.post("/push", (req, res) => {
  const { name, grade, subjects, studentID } = req.body;

  const stu = new Students(req.body);
  stu.save((err, data) => {
    if (err) res.send(err);
    else res.json({ data: data });
  });
});

// Exporting through router
module.exports = router;

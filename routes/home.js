// Importing modules to set view routing for Express JS
var express = require("express");
var router = express.Router();

// Importing Schemas for MongoDB Database Collections
const User = require("../model/User");

// GET request to retrieve webpage on arrival
router.get("/", (req, res) => {
  // Retrieving the database collection
  User.find((err, data) => {
    if (err) res.send(err);
    else {
      // if no errors are found, check if user is logged in
      for (var i = 0; i < data.length; i++) {
        if (data[i].loggedIn == true) {
          // render HOME.ejs view while exporting relevant collection data
          res.render("home", { data: data });
        }
      }
    }
  });
});

// POST request to push login details to loginDetails collection
router.post("/push", (req, res) => {
  const { loginID, password, name, subject, grades, loggedIn } = req.body;

  const user = new User(req.body);
  user.save((err, data) => {
    if (err) res.send(err);
    else res.json({ data: data });
  });
});

// Exporting through router
module.exports = router;

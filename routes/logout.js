// Importing modules to set view routing for Express JS
var express = require("express");
var router = express.Router();

// Importing Schemas for MongoDB Database Collections
const User = require("../model/User");

// GET request to retrieve webpage on arrival
router.get("/", function (req, res, next) {
  res.render("logout");
});

// POST request to logout from the website
router.post("/", (req, res) => {
  // Retrieving the database collection
  User.find((err, data) => {
    if (err) res.send(err);
    else {
      // Defining the request body to `"loggedIn" : false` for each account
      req.body = [{ requestName: "loggedIn", value: false }];

      // Retrieving the ObjectID of the login account as per current iteration
      let id = data[0]._id;

      // Defining the request body as an object to allow both singular and multiple updates to avoid server errors
      const updateOp = {};
      for (var i = 0; i < data.length; i++) {
        id = data[i]._id;
        for (const op of req.body) {
          updateOp[op.requestName] = op.value;
        }

        // update function called to push update operation to the USER (loginDetails) collection
        User.update({ _id: id }, { $set: updateOp })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      // if no error encountered, redirect to login page
      res.redirect("/");
    }
  });
});

// Exporting through router
module.exports = router;

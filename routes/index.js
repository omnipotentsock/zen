// Importing modules to set view routing for Express JS
var express = require("express");
var router = express.Router();

// Importing Schemas for MongoDB Database Collections
const User = require("../model/User");

// Function to encrypt strings
function plsEncrypt(str) {
  // variable "encoded" used to store the semi-encoded string by the end of the first loop
  let encoded = "";
  // Looping throught the string to manipulate its ASCII values and store them in "encoded"
  for (let i = 0; i < str.length; i++) {
    let cc = str[i].charCodeAt(0);
    let convValue = cc + i;
    // If the ASCII code crosses 255 (max value for ASCII code), continue from ASCII value 0
    if (convValue > 255) {
      convValue -= 256;
    }
    // Adding each modified character to new string
    encoded += String.fromCharCode(convValue);
  }

  // "newstr" is the encoded string reversed, which will be assigned to encoded again once the process is finished
  let newstr = "";
  // Simple string reverse algorithm
  for (let j = encoded.length - 1; j >= 0; j--) {
    let revChar = encoded.charAt(j);
    newstr += revChar;
  }
  encoded = newstr;
  // Calling this function while declaring or assigning value to a variable returns "encoded"
  return encoded;
}

// GET request to retrieve webpage on arrival
router.get("/", function (req, res) {
  res.render("index");
});

// POST request to authenticate user with credentials
router.post("/", (req, res) => {
  // Assigning the data in the input fields as
  const username = req.body.eID;
  const pass = plsEncrypt(req.body.password); // Password is stored in encrypted-form in the database

  // Retrieving the database collection
  User.find((err, data) => {
    if (err) res.send(err);
    else {
      // Defining the request body to `"loggedIn" : true`
      req.body = [{ requestName: "loggedIn", value: true }];
      for (var i = 0; i < data.length; i++) {
        // Retrieving the ObjectID of the login account as per current iteration
        let id = data[i]._id;

        // Checking if loginID and password match
        if (username == data[i].loginID && pass == data[i].password) {
          // Defining the request body as an object to allow both singular and multiple updates to avoid server errors
          const updateOp = {};
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

          // if no error encountered, redirect to homepage
          res.redirect("/home");
        }
      }
    }
  });
});

// Exporting through router
module.exports = router;

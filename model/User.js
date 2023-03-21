// Importing modules to set database collection schema
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const userSchema = new Schema({
  loginID: {
    type: String,
    trim: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  grades: {
    type: String,
    required: true,
  },

  loggedIn: {
    type: Boolean,
    required: true,
  },
});

module.exports = Mongoose.model("User", userSchema, "loginDetails");

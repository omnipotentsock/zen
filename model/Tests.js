// Importing modules to set database collection schema
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const testSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  results: {
    type: Array,
    required: true,
  },
});

module.exports = Mongoose.model("Tests", testSchema, "tests");

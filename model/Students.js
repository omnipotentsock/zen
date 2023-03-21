// Importing modules to set database collection schema
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  grade: {
    type: String,
    required: true,
  },

  subjects: {
    type: Array,
    required: true,
  },

  studentID: {
    type: String,
    required: true,
  },
});

module.exports = Mongoose.model("Students", studentSchema, "students");

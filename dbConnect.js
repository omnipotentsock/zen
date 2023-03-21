// Importing necessary modules
const mongoose = require('mongoose');
const config = require('config');

// Importing URI for MongoDB database
const mongoURI = config.get("mongoUri");

// Exporting through database
module.exports = mongoose.connect(
    mongoURI,
    {
        useNewUrlParser: true,
        useFindAndModify:false,
        useUnifiedTopology: true,
    },
    err => {
        if (err) throw err;

        // Logging message if connection successful
        console.log("DB connected!");
    }
);
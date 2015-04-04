// Server Setup
// ------------
//
// This is where we configure our Express server and connect it with MySQL database.

var express = require('express');
// TODO: connect to MySQL database
// var mongoose = require('mongoose');

// Create an Express server app.
var app = express();

// Get the correct MySQL connection depending on the environment. If the app is deployed to Heroku then we use the MySQL connection string stored in the environment variable to connect to the database. Otherwise, if the app is run locally then we connect to the locally running instance of MySQL. The local instance of MySQL must be started prior to starting the local server.

// TODO: Get MySQL database connection string for both production and local environments
// mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost:27017/glint';
// mongoose.connect(mongoURI);

// TODO: Check status of database connection after connecting
// Log the status of the database connection.
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log('MongoDB connection is open');
// });

// This connects the server with the routers defined in the middleware file.
require('./config/middleware.js')(app, express);

module.exports.app = app;
// module.exports.db = db;

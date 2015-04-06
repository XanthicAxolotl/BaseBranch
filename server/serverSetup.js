// Server Setup
// ------------
//
// This is where we configure our Express server and connect it with MySQL database.

var express = require('express');
var Sequelize = require('sequelize');

// Create an Express server app.
var app = express();

// Get the correct MySQL connection depending on the environment. If the app is deployed to Heroku then we use the MySQL connection string stored in the environment variable to connect to the database. Otherwise, if the app is run locally then we connect to the locally running instance of MySQL. The local instance of MySQL must be started prior to starting the local server.

var connectionString = process.env.CLEARDB_DATABASE_URL || 'mysql://admin:password@localhost:3306/basebranch';
var sequelize = new Sequelize(connectionString);

// Check the database connection status
sequelize.authenticate().complete(function (err) {
    if (err) {
        console.log('Sequelize connection error: ', err);
    } else {
      console.log('Sequelize connection has been created successfully');
    }
});

// This connects the server with the routers defined in the middleware file.
require('./config/middleware.js')(app, express);

module.exports.app = app;
// module.exports.db = db;

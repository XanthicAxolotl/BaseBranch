// Server Setup
// ------------
//
// This is where we configure our Express server and connect it with MySQL database.

var express = require('express');
var db = require('./config/db_models.js')();

// Create an Express server app.
var app = express();

// This connects the server with the routers defined in the middleware file.
require('./config/middleware.js')(app, express);

module.exports.app = app;

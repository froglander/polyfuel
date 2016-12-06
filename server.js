/* ************************************************************************ */
/*                             Server dependencies                          */
/* ************************************************************************ */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Require Mongo schemas
var Fillup = require('./models/Fillup');
var Vehicle = require('./models/Vehicle');
var User = require('./models/User');

// Set up Express
var app = express();
var PORT = process.env.PORT || 3000;

// Set up Morgan for logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Set up path to static directory for css/imgs/etc
app.use(express.static('./public'));

/* ************************************************************************ */
/*                                 Mongoose                                 */
/* ************************************************************************ */
mongoose.connect('mongodb://localhost/polyfuel1');

var db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose error: ", err);
});

db.once('open', function() {
    console.log("Mongoose connection successful");
});

/* ************************************************************************ */
/*                                  Routes                                  */
/* ************************************************************************ */
// Main route
app.get('/', function(req, res) {
    res.sendFile('./public/index.html');
});



// Set app to listen
app.listen(PORT, function() {
    console.log("App is listening on PORT: ", PORT);
});

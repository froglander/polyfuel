/* ************************************************************************ */
/*                             Server dependencies                          */
/* ************************************************************************ */
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');

// for authentication
// var passport = require('passport');
// var session = require('express-session');
// var cookieParser = require('cookie-parser');

// Require Mongo schemas
var Vehicle = require('./models/Vehicle');
var User = require('./models/User');
var Fillup = require('./models/Fillup').Fillup;

// Set up Express
var app = express();
var PORT = process.env.PORT || 3000;

// Set up Morgan for logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// app.use(cookieParser());

// required for passport
// app.use(session({ secret: 'puppyponypuppypony' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

// Set up path to static directory for css/imgs/etc
app.use(express.static('./public'));

/* ************************************************************************ */
/*                                 Mongoose                                 */
/* ************************************************************************ */
mongoose.connect('mongodb://localhost/polyfuel1');
// mongoose.connect('mongodb://heroku_sfwwbczq:3di5msecgg8bj3tq50lpg556k1@ds127988.mlab.com:27988/heroku_sfwwbczq');


var db = mongoose.connection;

db.on("error", function (err) {
    console.log("Mongoose error: ", err);
});

db.once('open', function () {
    console.log("Mongoose connection successful");
});

/* ************************************************************************ */
/*                                  Routes                                  */
/* ************************************************************************ */

// Sign up route
app.post('/signup', function (req, res) {
    //check req.body for username and pass, use them to login with mongoose/msql
    //     if (err) return res.json(err);
    // return res.json(user);
    console.log("Sign up route");

    var newUser = new User(req.body);

    console.log(req.body)

    var username = req.body.username;
    var password = req.body.password;

    newUser.save(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            // Return mongoose id of documente saved
            res.send(doc._id);
        }
    });
});


// Sign in route
// app.post('/login', function(req, res){
//     //check req.body for username and pass, use them to login with mongoose/msql
//     //     if (err) return res.json(err);
//     // return res.json(user);
// });

// POST a fill-up to save
app.post('/api/save/fillup', function (req, res) {
    console.log("Post a fill-up to save");

    console.log(req.body);

    var newFillUp = new Fillup(req.body);

    newFillUp.save(function(err, doc) {
        if(err) {
            console.log("Error: ", err);
        } else {
            res.send(doc._id);
        }
    });
});

// POST a vehicle to save
app.post('/api/save/vehicle', function (req, res) {
    console.log("Post a vehicle to save");

    console.log(req.body);

    var newVehicle = new Vehicle(req.body);

    newVehicle.save(function(err, doc) {
        if(err) {
            console.log("Error: ", err);
        } else {
            res.send(doc._id);
        }
    });
});

// Retrieve all fillups
app.get('/api/saved', function(req, res) {
    Fillup.find({})
        .exec(function(err, doc) {
            if(err) {
                console.log("Error:", err);
            } else {
                res.send(doc);
            }
        })
});

// Main route
app.get('*', function (req, res) {
    // res.sendFile('./public/index.html');
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


// Set app to listen
app.listen(PORT, function () {
    console.log("App is listening on PORT: ", PORT);
});

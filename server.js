/* ************************************************************************ */
/*                             Server dependencies                          */
/* ************************************************************************ */
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');

var stormpath = require('express-stormpath');

// Require Mongo schemas
var Vehicle = require('./models/Vehicle');
var User = require('./models/User');
var Fillup = require('./models/Fillup').Fillup;

// Set up Express
var app = express();
var PORT = process.env.PORT || 3001;

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
// mongoose.connect('mongodb://heroku_sfwwbczq:3di5msecgg8bj3tq50lpg556k1@ds127988.mlab.com:27988/heroku_sfwwbczq');


var db = mongoose.connection;

db.on("error", function (err) {
    console.log("Mongoose error: ", err);
});

db.once('open', function () {
    console.log("Mongoose connection successful");
});


// Stormpath react tutorial
app.use(stormpath.init(app, {
    web: {
        produces: ['application/json']
    }
    // website: true
}));

/* ************************************************************************ */
/*                                  Routes                                  */
/* ************************************************************************ */

// Sign up route
// app.post('/api/signup', function (req, res) {
//     //check req.body for username and pass, use them to login with mongoose/msql
//     //     if (err) return res.json(err);
//     // return res.json(user);
//     console.log("Sign up route");
//
//     var newUser = new User(req.body);
//
//     console.log("req.body: ", req.body);
//
//     var username = req.body.username;
//     var password = req.body.password;
//
//     newUser.save(function (err, doc) {
//         if (err) {
//             console.log(err);
//         } else {
//             // Return mongoose id of documente saved
//             res.send(doc._id);
//         }
//     });
// });


// Sign in route
// app.post('/login', function(req, res){
//     //check req.body for username and pass, use them to login with mongoose/msql
//     //     if (err) return res.json(err);
//     // return res.json(user);
// });

//Stormpath user accounts
app.post('/me', bodyParser.json(), stormpath.loginRequired, function(req, res) {
    function writeError(message) {
        res.status(400);
        res.json({message: message, status: 400});
        res.end();
    }

    function saveAccount() {
        req.user.givenName = req.body.givenName;
        req.user.surname = req.body.surname;
        req.user.email = req.body.email;

        req.user.save(function(err) {
            if(err) {
                return writeError(err.userMessage || err.message);
            }
            res.end();
        });
    }

    if(req.body.password) {
        var application = req.app.get('stormpathApplication');

        application.authenticateAccount({
            username: req.user.username,
            password: req.body.existingPassword
        }, function (err) {
            if(err) {
                return writeError('The existing password that you entered was incorrect.');
            }

            req.user.password = req.body.password;

            saveAccount();
        });
    } else {
        saveAccount();
    }
});

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
app.get('/api/get/fillups', function(req, res) {
    Fillup.find({})
        .exec(function(err, doc) {
            if(err) {
                console.log("Error:", err);
            } else {
                res.send(doc);
            }
        })
});

// Retrieve all vehicles
app.get('/api/get/vehicle', function(req, res) {
    // console.log("req params: ", req._parsedUrl.query);
    // var queryTerm = req._parsedUrl.query.split("=");
    var queryString = req._parsedUrl.query;
    var queryTerm = queryString.substr(queryString.indexOf("=")+1);
    // console.log("queryTerm:", queryTerm);

    Vehicle.find({ user_id: queryTerm})
        .exec(function(err, doc) {
            if(err) {
                console.log("Error:", err);
            } else {
                console.log("doc:", doc);
                res.send(doc);
            }
        })
});

// Main route
app.get('*', function (req, res) {
    // res.sendFile('./public/index.html');
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


// Stormpath tutorial wrap .listen in app.on
app.on('stormpath.ready', function() {
    // Set app to listen
    app.listen(PORT, function (err) {
        if(err) {
            return console.error(err);
        }
        console.log("App is listening on PORT: ", PORT);
    });
});


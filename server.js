/* ************************************************************************ */
/*                             Server dependencies                          */
/* ************************************************************************ */
var path = require('path');

// var webpack = require('webpack');
// var config = require('./webpack.config');

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


var stormpath = require('express-stormpath');

// Require Mongo schema
var User = require('./models/User');

// Set up Express
var app = express();
var PORT = process.env.PORT || 3000;

// var compiler = webpack(config);
//
// app.use(require('webpack-dev-middleware')(compiler, {
//     noInfo: true,
//     publicPath: config.output.publicPath
// }));


// Set up Morgan for logging
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.text());
// app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Set up path to static directory for css/imgs/etc
app.use(express.static('./public'));

/* ************************************************************************ */
/*                                 Mongoose                                 */
/* ************************************************************************ */
// mongoose.connect('mongodb://localhost/polyfuel1');
mongoose.connect('mongodb://heroku_xk8qhdch:anshb4n4leta2jvccf75s4kupr@ds159988.mlab.com:59988/heroku_xk8qhdch');


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

// Add new user to collection
app.post('/api/adduser', bodyParser.json(), function (req, res) {
    //check req.body for username and pass, use them to login with mongoose/msql
    //     if (err) return res.json(err);
    // return res.json(user);
    console.log("Sign up route");
    console.log("req.body: ", req.body);
    var newUser = new User(req.body);


    var username = req.body.username;
    // var password = req.body.password;

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

/** ***********************************************************************
 * Stormpath user accounts
 * ************************************************************************ */
app.post('/me', bodyParser.json(), stormpath.loginRequired, function (req, res) {
    console.log("req.body: ", req.body);

    function writeError(message) {
        res.status(400);
        res.json({message: message, status: 400});
        res.end();
    }

    function saveAccount() {
        req.user.givenName = req.body.givenName;
        req.user.surname = req.body.surname;
        req.user.email = req.body.email;

        req.user.save(function (err) {
            if (err) {
                return writeError(err.userMessage || err.message);
            }
            res.end();
        });
    }

    if (req.body.password) {

        var application = req.app.get('stormpathApplication');

        application.authenticateAccount({
            username: req.user.username,
            password: req.body.existingPassword
        }, function (err) {
            if (err) {
                return writeError('The existing password that you entered was incorrect.');
            }

            req.user.password = req.body.password;

            saveAccount();
        });
    } else {
        saveAccount();
    }
});

/** ***********************************************************************
 *                          POST a fill-up to save
 * ************************************************************************ */
app.post('/api/save/fillup', bodyParser.json(), function (req, res) {
    console.log("Post a fill-up to save");

    User.findOneAndUpdate(
        {username: req.body.params.user_id, 'vehicles._id': req.body.params.fillup.vehicle_id},
        {$push: {'vehicles.$.fillups': req.body.params.fillup}},
        {upsert: true, new: true},
        function (err, doc) {
            if (err) {
                console.log("Looks like it didn't work: ", err);
            } else {
                res.send(doc);
            }
        }
    );
});

/** ***********************************************************************
 *                          POST lastVehicleAccessed
 * ************************************************************************ */
app.post('/api/update/currentVehicle', bodyParser.json(), function (req, res) {
    console.log("Post updated vehicle accessed");

    console.log("currentVehicle req.body:", req.body);

    User.update({
            username: req.body.username
        },
        {$set: {lastVehicleAccessed: req.body.vehicle_id}},
        function (err, doc) {
            if (err) console.log(err);
        });


});


/** ***********************************************************************
 *                          POST a vehicle to save
 * ************************************************************************ */
app.post('/api/save/vehicle', bodyParser.json(), function (req, res) {
    console.log("Post a vehicle to save");

    User.findOneAndUpdate(
        {username: req.body.params.user_id},
        {$push: {vehicles: req.body.params.vehicle}},
        {upsert: true, new: true},
        function (err, doc) {
            if (err) {
                console.log("Something went wrong!: ", err)
            } else {
                console.log("new vehicle: ", doc);
                res.send(doc);
            }
        }
    )
});

/** ***********************************************************************
 *              GET fillups for selected vehicle
 *  *********************************************************************** */
app.get('/api/get/fillups', bodyParser.json(), function (req, res) {
    console.log(req._parsedUrl);


    var queryString = req._parsedUrl.query;
    if (queryString) {
        var queryTerm = queryString.substr(queryString.indexOf("=") + 1);
    }

    console.log("queryString: ", queryString);

    User.find({username: queryTerm})
        .exec(function (err, doc) {
            if (err) {
                console.log("Error:", err);
            } else {
                console.log("get fillups:", doc);
                res.send(doc);
            }
        })
});

/** ***********************************************************************
 *              GET all vehicles for logged in user
 *  *********************************************************************** */
app.get('/api/get/vehicle', bodyParser.json(), function (req, res) {
    var queryString = req._parsedUrl.query;
    var queryTerm = queryString.substr(queryString.indexOf("=") + 1);

    User.find({username: queryTerm})
        .exec(function (err, doc) {
            if (err) {
                console.log("Error:", err);
            } else {
                res.send(doc);
            }
        })
});

/** ***********************************************************************
 *              GET user info
 *  *********************************************************************** */
app.get('/api/get/user', bodyParser.json(), function (req, res) {
    var queryString = req._parsedUrl.query;
    var queryTerm = queryString.substr(queryString.indexOf("=") + 1);

    User.find({username: queryTerm})
        .exec(function (err, doc) {
            if (err) {
                console.log("Error: ", err);
            } else {
                res.send(doc);
            }
        })
});

/** ***********************************************************************
 *              GET last vehicle accessed by user
 *  *********************************************************************** */
app.get('/api/get/lastVehicleAccessed', bodyParser.json(), function (req, res) {
    var queryString = req._parsedUrl.query;
    var queryTerm = queryString.substr(queryString.indexOf("=") + 1);

    User.find({username: queryTerm})
        .exec(function (err, doc) {
            if (err) {
                console.log("Error: ", err);
            } else {
                console.log("lastVehicleAccessed doc: ", doc);
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
app.on('stormpath.ready', function () {
    // Set app to listen
    app.listen(PORT, 'localhost', function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("App is listening on PORT: ", PORT);
    });
});


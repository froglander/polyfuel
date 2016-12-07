/* ************************************************************************ */
/*                             Server dependencies                          */
/* ************************************************************************ */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Require Mongo schemas
const Fillup = require('./models/Fillup');
const Vehicle = require('./models/Vehicle');
const User = require('./models/User');

// Set up Express
const app = express();
const PORT = process.env.PORT || 3000;

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
    // res.sendFile('./public/index.html');
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// POST a fill-up to save
app.post('/api/save', function(req, res){
    console.log("Post a fill-up to save");

    var newFillUp = new Fillup(req.body);

    console.log(req.body)

    // miles: fillMiles,
    //     gallons: fillGals,
    //     price: fillPrice,
    //     partial: fillPartial,
    //     vehicle_id: fillVehId


    // var miles = req.body.miles;
    // var gallons = req.body.date;
    // var price = req.body.url;
    // var partial =;
    // var vehicle_id = ;

    // newArticle.save(function(err, doc){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         // Return mongoose id of documente saved
    //         res.send(doc._id);
    //     }
    // });
});

// Set app to listen
app.listen(PORT, function() {
    console.log("App is listening on PORT: ", PORT);
});

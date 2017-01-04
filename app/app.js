// Include the Main React Dependencies
var React = require('react');
var ReactDOM = require('react-dom');

// import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
// import { Router, IndexRoute, Route, browserHistory } from 'react-router';

// Grab the property associated with the Router
// var Router = require('react-router').Router;
var IndexRoute = require('react-router').IndexRoute;
var Route = require('react-router').Route;

// For Stormpath
var ReactStormpath = require('react-stormpath');
var Router = ReactStormpath.Router;
var HomeRoute = ReactStormpath.HomeRoute;
var LoginRoute = ReactStormpath.LoginRoute;
var AuthenticatedRoute = ReactStormpath.AuthenticatedRoute;


var browserHistory = require('react-router').browserHistory;

// Grabs the Routes
var routes = require('./config/routes');


ReactStormpath.init();

// Renders the contents according to the route page.
ReactDOM.render(

    <Router history={browserHistory} routes={routes} />,
    document.getElementById('app')
)
;
// Include the Main React Dependencies
var React = require('react');
var ReactDOM = require('react-dom');

// Grab the property associated with the Router
var Router = require('react-router').Router;


import { browserHistory } from 'react-router'


// Grabs the Routes
var routes = require('./config/routes');

// Renders the contents according to the route page.
ReactDOM.render(


    <Router history={browserHistory} routes={routes} />,
    document.getElementById('app')
);
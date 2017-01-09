// Switching to ES6 (trying to) because so many examples are written that way
// Include the Main React Dependencies
// var React = require('react');
// var ReactDOM = require('react-dom');
import React from 'react';
import ReactDOM from 'react-dom';

// import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
// import { Router, IndexRoute, Route, browserHistory } from 'react-router';

// Grab the property associated with the Router
// var Router = require('react-router').Router;
// var IndexRoute = require('react-router').IndexRoute;
// var Route = require('react-router').Route;
import {IndexRoute, Route, browserHistory} from 'react-router';


// For Stormpath
// var ReactStormpath = require('react-stormpath');
// var Router = ReactStormpath.Router;
// var HomeRoute = ReactStormpath.HomeRoute;
// var LoginRoute = ReactStormpath.LoginRoute;
// var AuthenticatedRoute = ReactStormpath.AuthenticatedRoute;
import ReactStormpath, {Router, HomeRoute, LoginRoute, AuthenticatedRoute} from 'react-stormpath';

// var DisplayMpg = require('./components/DisplayMpg');


// var browserHistory = require('react-router').browserHistory;

// Grabs the Routes
// var routes = require('./config/routes');
//import routes from './config/routes';


import Main from './components/Main';
import IndexPage from './components/IndexPage';
import AddFillup from './components/AddFillup';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import DisplayMpg from './components/DisplayMpg';
import AddVehicle from './components/AddVehicle';

ReactStormpath.init();

// Renders the contents according to the route page.
ReactDOM.render(
    <Router history={browserHistory}>
        <HomeRoute path='/' component={Main}>
            {/*If user selects any other path... we get the IndexRoute*/}
            <IndexRoute component={IndexPage}/>
            <LoginRoute path='SignIn' component={SignIn}/>
            <Route path="SignUp" components={SignUp}/>
            <AuthenticatedRoute>
                {/* Once the user signs in display fill up info*/}
                <HomeRoute path='DisplayMpg' component={DisplayMpg}/>
                <Route path='AddFillup' component={AddFillup}/>
                <Route path='AddVehicle' component={AddVehicle}/>
            </AuthenticatedRoute>
        </HomeRoute>
    </Router>,
    document.getElementById('app')
)
;
// Inclue the React library
// Switching to ES6 (trying to) because so many examples are written that way
// var React = require('react');
import React from 'react';

// Include the Router
// var Router = require('react-router');
// var Route = Router.Route;
import { Router, Route, IndexRoute } from 'react-router';

//  Include the IndexRoute (catch-all route)
// var IndexRoute = Router.IndexRoute;

// Stormpath
// var ReactStormpath = require('react-stormpath');
// var HomeRoute = ReactStormpath.HomeRoute;
// var LoginRoute = ReactStormpath.LoginRoute;
// var AuthenticatedRoute = ReactStormpath.AuthenticatedRoute;
import { HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';


// Reference the high-level components
// var Main = require('../components/Main');
// var IndexPage = require('../components/IndexPage');
// var AddFillup = require('../components/AddFillup');
// var SignIn = require('../components/SignIn');
// var DisplayMpg = require('../components/DisplayMpg');
// var AddVehicle = require('../components/AddVehicle');
// var SignUp = require('../components/SignUp');
import Main from '../components/Main';
import IndexPage from '../components/IndexPage';
import AddFillup from '../components/AddFillup';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import DisplayMpg from '../components/DisplayMpg';
import AddVehicle from '../components/AddVehicle';


// Export the Routes
module.exports = (

    /*High level component is the Main component*/
    <HomeRoute path='/' component={Main}>
        {/*If user selects any other path... we get the IndexRoute*/}
        <IndexRoute component={IndexPage}/>
        <LoginRoute path='SignIn' component={SignIn}/>
        <Route path="SignUp" components={SignUp}/>
        <AuthenticatedRoute>
            {/* Once the user signs in display fill up info*/}
            <HomeRoute path='DisplayMpg' component={DisplayMpg} />
                <Route path='AddFillup' component={AddFillup}/>
                <Route path='AddVehicle' component={AddVehicle}/>
        </AuthenticatedRoute>
    </HomeRoute>
);
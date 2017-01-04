// Inclue the React library
var React = require('react');

// Include the Router
var Router = require('react-router');
var Route = Router.Route;

//  Include the IndexRoute (catch-all route)
var IndexRoute = Router.IndexRoute;

// Stormpath
var ReactStormpath = require('react-stormpath');
var HomeRoute = ReactStormpath.HomeRoute;
var LoginRoute = ReactStormpath.LoginRoute;
var AuthenticatedRoute = ReactStormpath.AuthenticatedRoute;

// Reference the high-level components
var Main = require('../components/Main');
var IndexPage = require('../components/IndexPage');
var AddFillup = require('../components/AddFillup');
var SignIn = require('../components/SignIn');
var DisplayMpg = require('../components/DisplayMpg');
var AddVehicle = require('../components/AddVehicle');
var SignUp = require('../components/SignUp');

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
                {/*<Route path='DisplayMpg' component={DisplayMpg}/>*/}
                <Route path='AddVehicle' component={AddVehicle}/>
            {/*</Route>*/}
        </AuthenticatedRoute>
    </HomeRoute>
);
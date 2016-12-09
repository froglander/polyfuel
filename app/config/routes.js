// Inclue the React library
var React = require('react');

// Include the Router
var Router = require('react-router');
var Route = Router.Route;

//  Include the IndexRoute (catch-all route)
var IndexRoute	= Router.IndexRoute;

// Reference the high-level components
var Main = require('../components/Main');
var AddFillup = require('../components/AddFillup');
var SignIn = require('../components/SignIn');
var DisplayMpg = require('../components/DisplayMpg');
var AddVehicle = require('../components/AddVehicle');


// Export the Routes
module.exports = (

    /*High level component is the Main component*/
    <Route path='/' component={Main}>

        {/* Once the user signs in display fill up info*/}
        <Route path='AddFillup' component={AddFillup} />
        <Route path='DisplayMpg' component={DisplayMpg} />
        <Route path='AddVehicle' component={AddVehicle} />


        {/*If user selects any other path... we get the Info Route*/}
        {/*<IndexRoute component={AddFillup} />*/}
        <IndexRoute component={SignIn} />

    </Route>


);
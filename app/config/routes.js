// Inclue the React library
var React = require('react');

// Include the Router
var Router = require('react-router');
var Route = Router.Route;

//  Include the IndexRoute (catch-all route)
var IndexRoute = Router.IndexRoute;

// Reference the high-level components
var Main = require('../components/Main');
var AddFillup = require('../components/AddFillup');
var SignIn = require('../components/SignIn');
var DisplayMpg = require('../components/DisplayMpg');
var AddVehicle = require('../components/AddVehicle');
var SignUp = require('../components/SignUp');

var EnsureLoggedInContainer = require('../components/EnsureLoggedInContainer');

// Export the Routes
module.exports = (

    /*High level component is the Main component*/
    <Route path='/' component={Main}>

        {/*If user selects any other path... we get the IndexRoute*/}
        <IndexRoute component={SignIn}/>

        <Route path="SignUp" components={SignUp}/>

        {/*<Route component={EnsureLoggedInContainer}>*/}
            {/* Once the user signs in display fill up info*/}
            <Route path='AddFillup' component={AddFillup}/>
            <Route path='DisplayMpg' component={DisplayMpg}/>
            <Route path='AddVehicle' component={AddVehicle}/>
        {/*</Route>*/}


    </Route>

//
//     <Router history={new HashHistory()}>
//     <Route component={App}>
//     <Route
//          path="SignUp"
//          component={SignUp}
//          signup={this.signUp}
//     />
// <IndexRoute component={SignIn} login={this.login}/>
// </Route>
// </Router>



);
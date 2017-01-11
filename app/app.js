// Switching to ES6 (trying to) because so many examples are written that way
// Include the Main React Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

import {IndexRoute, Route, browserHistory} from 'react-router';

// For Stormpath
import ReactStormpath, {Router, HomeRoute, LoginRoute, AuthenticatedRoute} from 'react-stormpath';

import Main from './components/Main';
import IndexPage from './components/IndexPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import DisplayMpg from './components/DisplayMpg';
import AddFillup from './components/AddFillup';
import AddVehicle from './components/AddVehicle';


ReactStormpath.init();

// Renders the contents according to the route page.
ReactDOM.render(
    <Router history={browserHistory}>
        <HomeRoute path='/' component={Main}>
            {/*If user selects any other path... we get the IndexRoute*/}
            <IndexRoute component={IndexPage}/>
            <LoginRoute path='/SignIn' component={SignIn}/>
            <Route path='/SignUp' components={SignUp}/>
            <AuthenticatedRoute>
                {/* Once the user signs in display fill up info*/}
                <HomeRoute path='DisplayMpg' component={DisplayMpg}/>
                <Route path='AddFillup' component={AddFillup}/>
                <Route path='AddVehicle' component={AddVehicle}/>
            </AuthenticatedRoute>
        </HomeRoute>
    </Router>,
    document.getElementById('app')
);
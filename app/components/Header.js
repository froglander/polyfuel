// Include React
var React = require('react');
var axios = require('axios');

// Included all of the React Router dependencies
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;

// For stormpath
var ReactStormpath = require('react-stormpath');
var LoginLink = ReactStormpath.LoginLink;
var LogoutLink = ReactStormpath.LogoutLink;
var Authenticated = ReactStormpath.Authenticated;
var NotAuthenticated = ReactStormpath.NotAuthenticated;


// Include all sub-components
var AddFillup = require('./AddFillup');
var SignIn = require('./SignIn');
var SignUp = require('./SignUp');

var Header = React.createClass({ contextTypes: {
        authenticated: React.PropTypes.bool,
        user: React.PropTypes.object
    },
    render: function () {
        console.log("header test: ", this.context.authenticated);
        return (

            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#poly-nav-collapse" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <Link className="navbar-brand" to="/">Polyfuel</Link></button>
                    </div>

                    <div className="collapse navbar-collapse" id="poly-nav-collapse">

                        <ul className="nav navbar-nav">
                            <Authenticated>
                                <li>
                                    <Link to="/DisplayMpg" data-toggle="collapse" data-target=".navbar-collapse.in">
                                        View Details</Link>
                                </li>
                            </Authenticated>
                            <Authenticated>
                                <li>
                                    <Link to="/AddFillup" data-toggle="collapse" data-target=".navbar-collapse.in">
                                        Add Fill-Up</Link>
                                </li>
                            </Authenticated>
                            <Authenticated>
                                <li>
                                    <Link to="/AddVehicle" data-toggle="collapse" data-target=".navbar-collapse.in">
                                        Add Vehicles</Link>
                                </li>
                            </Authenticated>
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            <NotAuthenticated>
                                <li>
                                    <LoginLink/>
                                </li>
                            </NotAuthenticated>

                            <NotAuthenticated>
                                <li>
                                    <Link to="/SignUp">Sign Up</Link>
                                </li>
                            </NotAuthenticated>
                            <Authenticated>
                                <li>
                                    <LogoutLink/>
                                </li>
                            </Authenticated>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

});

// Export the component back for use in other files
module.exports = Header;


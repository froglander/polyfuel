// Include React
var React = require('react');
var axios = require('axios');

// Included all of the React Router dependencies
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;

// Include all sub-components
// var Search = require('./Search');
var AddFillup = require('./AddFillup');
var SignIn = require('./SignIn');


var Main = React.createClass({
    // Set initial state
    getInitialState: function () {
        return {
            miles: "",
            gallons: "",
            price: "",
            partial: false,
            vehicle_id: ""
        }
    },
    // Set the state for the search terms
    setFillup: function (fillMiles, fillGals, fillPrice, fillPartial, fillVehId) {
        console.log("set fill up");
        this.setState({
            miles: fillMiles,
            gallons: fillGals,
            price: fillPrice,
            partial: fillPartial,
            vehicle_id: fillVehId
        }, function () {
            console.log("main miles:", this.state.miles);
            console.log("main gallons:", this.state.gallons);
            console.log("main price:", this.state.price);
        });


        return false;
    },
    // Here we render the component
    render: function () {
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#poly-nav-collapse" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            {/*<a className="navbar-brand" href="#">Polyfuel</a>*/}
                            <Link to="/">Polyfuel</Link>
                        </div>
                        <div className="collapse navbar-collapse" id="poly-nav-collapse">
                            <ul className="nav navbar-nav">
                                <li><Link to="/DisplayMpg" data-toggle="collapse" data-target=".navbar-collapse.in">View Details</Link></li>
                                <li><Link to="/AddFillup" data-toggle="collapse" data-target=".navbar-collapse.in">Add Fill-Up</Link></li>
                                <li><Link to="/AddVehicle" data-toggle="collapse" data-target=".navbar-collapse.in">View Vehicles</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="row">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

// Export the component back for use in other files
module.exports = Main;
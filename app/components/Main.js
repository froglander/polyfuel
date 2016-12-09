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
                <div className="row">
                    <div className="col-md-1">col-md-1</div>
                    <div className="col-md-1">col-md-1</div>
                    <div className="col-md-1">col-md-1</div>
                    <div className="col-md-1">col-md-1</div>
                    <div className="col-md-1">col-md-1</div>
                    <div className="col-md-1">col-md-1</div>
                    <div className="col-md-1">col-md-1</div>
                    <div className="col-md-1">col-md-1</div>
                    <div className="col-md-1">col-md-1</div>
                    <div className="col-md-1">col-md-1</div>
                    <div className="col-md-1">col-md-1</div>
                    <div className="col-md-1">col-md-1</div>
                </div>
                <div className="row">
                    <div className="col-md-8">col-md-8</div>
                    <div className="col-md-4">col-md-4</div>
                </div>
                <div className="row">
                    <div className="col-md-4">col-md-4</div>
                    <div className="col-md-4">col-md-4</div>
                    <div className="col-md-4">col-md-4</div>
                </div>
                <div className="row">
                    <div className="col-md-4">col-md-6</div>
                    <div className="col-md-4">col-md-6</div>
                </div>


            </div>
        )
    }
});

// Export the component back for use in other files
module.exports = Main;
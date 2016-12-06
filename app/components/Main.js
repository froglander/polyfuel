// Include React
var React = require('react');

// Included all of the React Router dependencies
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

// Include all sub-components
// var Search = require('./Search');


var Main = React.createClass({

    // Here we render the component
    render: function () {
        return (
            <div className="container">
                <div className="row">

                    <div className="jumbotron text-center" id="nytheader">
                        <h1>polyfuel</h1>
                    </div>

                    {/* This will dump the correct child component */}
                    {this.props.children}


                </div>
            </div>
        )

    }
});

// Export the component back for use in other files
module.exports = Main;
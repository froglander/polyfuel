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
    signup: function (thisItem, event) {
        // axios({
        //     method: 'POST',
        //     data: {
        //         username: this.state.username,
        //         password: this.state.password
        //     }
        // }).then(function(user) {
        //     // If all good, save to database
        //     var newUser = {username: this.stat}
        // }, function (error) {
        //     // If a problem, let me know!
        // });



        // handleClick: function(thisItem, event) {
            // console.log("Click to save article");
            // console.log(thisItem);

            var newUser = {username: thisItem.username, date: thisItem.password };
            // console.log("click article:", newArticle);
            return axios.post('/api/signup', newUser)
                .then(function(results) {
                    console.log("mongoose id:", results.data);
                    return results.data;
                }.bind(this));

        // },




    },
    login: function () {
        axios({
            method: 'POST',
            data: {/* user info */}
        }).then(function (user) {
            //all good redirect to home/dashboard
        }, function (error) {
            //tell them there was an error
        });
    },

    /* ********************************* */

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
                                <li><Link to="/SignUp" data-toggle="collapse" data-target=".navbar-collapse.in">Sign
                                    Up</Link></li>

                                <li><Link to="/DisplayMpg" data-toggle="collapse" data-target=".navbar-collapse.in">View
                                    Details</Link></li>
                                <li><Link to="/AddFillup" data-toggle="collapse" data-target=".navbar-collapse.in">Add
                                    Fill-Up</Link></li>
                                <li><Link to="/AddVehicle" data-toggle="collapse" data-target=".navbar-collapse.in">View
                                    Vehicles</Link></li>
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
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

var DocumentTitle = require('react-document-title');

// Include all sub-components
var AddFillup = require('./AddFillup');
var SignIn = require('./SignIn');
var SignUp = require('./SignUp');

var Header = require('./Header');


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
    SignUp: function (thisItem, event) {
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

        var newUser = {username: thisItem.username, date: thisItem.password};
        // console.log("click article:", newArticle);
        return axios.post('/api/signup', newUser)
            .then(function (results) {
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

    contextTypes: {
        authenticated: React.PropTypes.bool,
        user: React.PropTypes.object
    },
//
//     if (!this.context.authenticated) {
//     return (
//         <div>
//             You need to <LoginLink />.
//         </div>
//     );
// }
//
// return (
//     <div>
//         Welcome {this.context.user.username}!
//     </div>
// );
    /* ********************************* */

    // Set the state for the search terms
    // setFillup: function (fillMiles, fillGals, fillPrice, fillPartial, fillVehId) {
    //     console.log("set fill up");
    //     this.setState({
    //         miles: fillMiles,
    //         gallons: fillGals,
    //         price: fillPrice,
    //         partial: fillPartial,
    //         vehicle_id: fillVehId
    //     }, function () {
    //         console.log("main miles:", this.state.miles);
    //         console.log("main gallons:", this.state.gallons);
    //         console.log("main price:", this.state.price);
    //     });
    //
    //
    //     return false;
    // },





    // Here we render the component
    render: function () {
        // if (!this.context.authenticated) {
        //     return (
        //         <div>
        //             You need to <LoginLink/>.
        //         </div>
        //     );
        // }

            console.log("main test: ", this.context.authenticated);
            return (
                <DocumentTitle title='polyfuel'>

                    <div className="container-fluid">
                        <Header/>

                        <div className="row">
                            {this.props.children}
                        </div>
                    </div>
                </DocumentTitle>
            )
        }
});

// Export the component back for use in other files
module.exports = Main;
var React = require('react');
var Link = require('react-router').Link;
var LoginLink = require('react-stormpath').LoginLink;

var IndexPage = React.createClass({
    contextTypes: {
        authenticated: React.PropTypes.bool,
        user: React.PropTypes.object
    },
    // Here we render the component which can differ depending if user is logged in
    render: function () {
        if (!this.context.authenticated) {
            return (
                <div className="container">
                    <h2 className="text-center">Welcome!</h2>
                    <hr />
                    <div className="jumbotron">
                        <p>
                            <strong>To Polyfuel</strong>
                            <br/>
                            Say a bunch of stuff about app here
                        </p>

                    </div>
                </div>
            );
        }
        return (
            <div className="container">
                <h2 className="text-center">Welcome!</h2>
                <hr />
                <div className="jumbotron">
                    <p>
                        Welcome to Polyfuel, {this.context.user.username}!
                        <br/>
                        Thanks for using our app!
                    </p>

                </div>
            </div>
        );
    }
});
// Export the component back for use in other files
module.exports = IndexPage;
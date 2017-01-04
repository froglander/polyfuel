var React = require('react');
var Link = require('react-router').Link;
var LoginLink = require('react-stormpath').LoginLink;


var IndexPage = React.createClass({
    // Here we render the component
    render: function () {
        return (
            <div className="container">
                <h2 className="text-center">Welcome!</h2>
                <hr />
                <div className="jumbotron">
                    <p>
                        <strong>To Polyfuel</strong>
                    </p>

                </div>
            </div>
        );
    }
});
// Export the component back for use in other files
module.exports = IndexPage;
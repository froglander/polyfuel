var React = require('react');
var axios = require('axios');

var DocumentTitle = require('react-document-title');
var LoginForm = require('react-stormpath').LoginForm;

var SignIn = React.createClass({
    onFormSubmit: function(e, next) {
        var data = e.data;
        console.log("data: ", data);
        // Force usernames to be in lowercase
        data.email = data.username.toLowerCase();
        next(null, data);
    },

    render: function () {
        return (
            <DocumentTitle title={`Login`}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h3>Login</h3>
                            <hr />
                        </div>
                    </div>
                    <LoginForm onSubmit={this.onFormSubmit}/>

                </div>
            </DocumentTitle>
        )
    }
});

// Export the component back for use in other files
module.exports = SignIn;
// Include React
var React = require('react');
var axios = require('axios');

var DocumentTitle = require('react-document-title');
var RegistrationForm = require('react-stormpath').RegistrationForm;

var SignUp = React.createClass({
    onFormSubmit: function(e, next) {
        var data = e.data;

        // Force usernames to be in lowercase
        data.email = data.email.toLowerCase();

        // Create user in User collection
        var newUser = {username: data.email };
        console.log("click signup:", newUser);
        // return axios.post('/api/signup', newUser)
        //     .then(function(results) {
        //         console.log("mongoose id:", results.data);
        //         return results.data;
        //     }
        //     .bind(this));
        axios.post('/api/signup', newUser)
            .then(function(results) {
                console.log("mongoose id:", results.data);
                return results.data;
            });


        next(null, data);
    },
    // Here we render the component
    render: function () {
        return (
            <DocumentTitle title={`New User`}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h3>New User</h3>
                            <hr />
                        </div>
                    </div>
                    <RegistrationForm onSubmit={this.onFormSubmit} />
                </div>
            </DocumentTitle>
        )
    }
});

// Export the component back for use in other files
module.exports = SignUp;
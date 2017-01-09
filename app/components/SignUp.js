// Include React
// Switching to ES6 (trying to) because so many examples are written that way
// var React = require('react');
// var axios = require('axios');
import React from 'react';
import axios from 'axios';

// var DocumentTitle = require('react-document-title');
// var RegistrationForm = require('react-stormpath').RegistrationForm;
import DocumentTitle from 'react-document-title';
import RegistrationForm from 'react-stormpath';

// var SignUp = React.createClass({
export default class SignUp extends React.Component {
    // Set initial state
    // getInitialState: function () {
    //     return {
    //         user_id: "",
    //     }
    //
    // },
    onFormSubmit (e, next) {
        var data = e.data;

        // Force usernames to be in lowercase
        data.email = data.email.toLowerCase();

        // Create user in User collection
        var newUser = {username: data.email};



        axios.post('/api/signup', newUser)
            .then(function (results) {
                console.log("gimme mongoose id:", results.data);
                return results.data;
            // })
            // .then(function(userData) {
            //     console.log("userData:", userData);
            //     this.setState({user_id: userData});
            }.bind(this));
        next(null, data);
    }
    // Here we render the component
    render () {
        console.log("user:", this.user_id);
        return (
            <DocumentTitle title={`New User`}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h3>New User</h3>
                            <hr />
                        </div>
                    </div>
                    <RegistrationForm onSubmit={this.onFormSubmit}/>
                </div>
            </DocumentTitle>
        )
    }
}

// Export the component back for use in other files
// module.exports = SignUp;
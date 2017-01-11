// Include React
// Switching to ES6 (trying to) because so many examples are written that way
// var React = require('react');
// var axios = require('axios');
import React from 'react';
import axios from 'axios';

import DocumentTitle from 'react-document-title';
import { RegistrationForm } from 'react-stormpath';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: ""
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit (e, next) {
        var data = e.data;

        // Force usernames to be in lowercase
        data.email = data.email.toLowerCase();

        // Create user in User collection
        var newUser = {username: data.email};

        console.log("newUser: ", newUser);


        axios.post('/api/adduser', newUser)
            .then(function (results) {
                console.log("gimme mongoose id:", results.data);
                return results.data;
            }.bind(this));
        next(null, data);
    }

    // Here we render the component
    render () {
        // console.log("user:", this.user_id);
        // console.log("Sign up");
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
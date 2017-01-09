// Switching to ES6 (trying to) because so many examples are written that way
// var React = require('react');
// var axios = require('axios');
import React from 'react';

// var DocumentTitle = require('react-document-title');
// var LoginForm = require('react-stormpath').LoginForm;
import DocumentTitle from 'react-document-title';
import LoginForm from 'react-stormpath';

// var SignIn = React.createClass({
export default class SignIn extends React.Component {
    onFormSubmit(e, next) {

        var data = e.data;
        console.log("data: ", data);
        // Force usernames to be in lowercase
        data.email = data.username.toLowerCase();
        next(null, data);
    }

    render () {
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
}

// Export the component back for use in other files
// module.exports = SignIn;
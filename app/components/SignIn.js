// Switching to ES6 (trying to) because so many examples are written that way
import React from 'react';
import DocumentTitle from 'react-document-title';
import { LoginForm } from 'react-stormpath';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(e, next) {

        var data = e.data;
        console.log("data: ", data);
        // Force usernames to be in lowercase
        data.email = data.username.toLowerCase();
        next(null, data);
    }

    render () {
        console.log("Render sign in componennt");
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
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import { LoginLink } from 'react-stormpath';

export default class IndexPage extends React.Component {
    render() {
        // console.log("Render IndexPage, is user authenticated?", this.context.authenticated);
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
}

IndexPage.contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
};
import {Link} from 'react-router';
import React, {PropTypes} from 'react';
import {LoginLink} from 'react-stormpath';

export default class IndexPage extends React.Component {
    render() {
        // console.log("Render IndexPage, is user authenticated?", this.context.authenticated);
        if (!this.context.authenticated) {
            return (
                <div className="container">
                    <h2 className="text-center">PolyFuel</h2>
                    <hr />
                    <div className="jumbotron">
                        <p>
                            Welcome to PolyFuel, the one stop app for tracking fuel efficiency across all your cars.
                        </p>

                    </div>
                </div>
            );
        }
        return (
            <div className="container">
                <h2 className="text-center">PolyFuel</h2>
                <hr />
                <div className="jumbotron">
                    <p>
                        Thanks for using PolyFuel, {this.context.user.username}.
                        <br />
                        <br/>
                        If you have questions or concerns please email us at&nbsp;
                        <Link to="mailto:polyfuel@dukworld.net">polyfuel@dukworld.net</Link>.
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
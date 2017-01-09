// Include React
// Switching to ES6 (trying to) because so many examples are written that way
import React from 'react';
import axios from 'axios';

import {Router, Route, IndexRoute, Link} from 'react-router';

// For stormpath
import {LoginLink, LogoutLink, Authenticated, NotAuthenticated} from 'react-stormpath';

import DocumentTitle from 'react-document-title';

// Include all sub-components
import AddFillup from './AddFillup';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './Header';


export default class Main extends React.Component {
    render() {
        return (
            <DocumentTitle title='polyfuel'>
                <div className="container-fluid">
                    <Header/>
                    <div className="row">
                        {this.props.children}
                    </div>

                </div>
            </DocumentTitle>
        )
    }
}
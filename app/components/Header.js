// Include React
// Switching to ES6 (trying to) because so many examples are written that way
import React from 'react';

import {Link} from 'react-router';

// For stormpath
import {LoginLink, LogoutLink, Authenticated, NotAuthenticated} from 'react-stormpath';

export default class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#poly-nav-collapse" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">Polyfuel</Link>
                    </div>

                    <div className="collapse navbar-collapse" id="poly-nav-collapse">

                        <ul className="nav navbar-nav">
                            <Authenticated>
                                <li>
                                    <Link to="/DisplayMpg" data-toggle="collapse" data-target=".navbar-collapse.in">
                                        View Details</Link>
                                </li>
                            </Authenticated>
                            <Authenticated>
                                <li>
                                    <Link to="/AddFillup" data-toggle="collapse" data-target=".navbar-collapse.in">
                                        Add Fill-Up</Link>
                                </li>
                            </Authenticated>
                            <Authenticated>
                                <li>
                                    <Link to="/AddVehicle" data-toggle="collapse" data-target=".navbar-collapse.in">
                                        Add Vehicles</Link>
                                </li>
                            </Authenticated>
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            <NotAuthenticated>
                                <li>
                                    <LoginLink/>
                                </li>
                            </NotAuthenticated>

                            {/*<NotAuthenticated>*/}
                                {/*<li>*/}
                                    {/*<Link to="/SignUp">Sign Up</Link>*/}
                                {/*</li>*/}
                            {/*</NotAuthenticated>*/}
                            <Authenticated>
                                <li>
                                    <LogoutLink/>
                                </li>
                            </Authenticated>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}


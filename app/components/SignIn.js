// Include React
var React = require('react');
var axios = require('axios');


var SignIn = React.createClass({

    // Set initial state
    getInitialState: function () {
        return {
            username: "",
        }
    },
    handleChange: function(e) {
        console.log("input field changed");
        var changedState = {};
        changedState[e.target.id] = e.target.value;
        this.setState(changedState);
    },
    handleSubmit: function() {
        console.log("Submit clicked");

        this.props.newSignIn(this.state.username);

        console.log("new sign in username:", this.state.username);

        return false;
    },
    // Here we render the component
    render: function () {
        console.log("Render sign in component");

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Sign In</h3>
                            </div>
                            <div className="panel-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label htmlFor="username" className="col-sm-2 control-label">Username </label>
                                        <div className="col-sm-10">
                                            <input type="text" value={this.state.username} className="form-control"
                                                   id="username" onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="col-sm-2 control-label">Password</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control"
                                                   id="password" onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg btn-block"
                                            onClick={this.handleSubmit}>
                                        Sign In
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

// Export the component back for use in other files
module.exports = SignIn;
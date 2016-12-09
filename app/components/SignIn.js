// Include React
var React = require('react');
var axios = require('axios');

var LabeledField = require('./LabeledField');


var SignIn = React.createClass({

    // Set initial state
    getInitialState: function () {
        return {
            username: "",
        }
    },
    handleChange: function (e) {
        console.log("input field changed");
        var changedState = {};
        changedState[e.target.id] = e.target.value;
        this.setState(changedState);
    },
    handleSubmit: function () {
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
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Sign In</h3>
                            </div>
                            <div className="panel-body">
                                <form className="form-horizontal">

                                    <LabeledField handleChange={this.handleChange} val={this.state.username}
                                                  title="Username" labelId="username" inputType="text"/>

                                    <LabeledField handleChange={this.handleChange} val={this.state.password}
                                                  title="Password" labelId="password" inputType="text"/>

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
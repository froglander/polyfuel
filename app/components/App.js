var React = require('react');

var App = React.createElement({
    getInitialState: function() {
        return {
            miles: "",
            gallons: "",
            price: "",
            partial: false,
            vehicle_id: ""
        };
    },
    signUp: function() {},
    login: function(){},
    render: function() {

        return (
            <Router history={new HashHistory()}>
                <Route component={App}>
                    <Route
                        path="SignUp"
                        component={SignUp}
                        signup={this.signUp}
                    />
                    <IndexRoute component={SignIn} login={this.login}/>
                </Route>
            </Router>
        );
    }
})
//https://medium.com/the-many/adding-login-and-authentication-sections-to-your-react-or-react-native-app-7767fd251bd1#.iihztz9th

var React = require('react');

var browserHistory = require('react-router').browserHistory;

var EnsureLoggedInContainer = React.createClass({
    componentDidMount: function() {
        var dispatch = this.props.dispatch;
        var currentURL = this.props.dispatch;

        if(!isLoggedIn) {
            dispatch(setRedirectUrl(currentURL));
            browserHistory.replace("/SignIn");
        }
    },

    render() {
        if(isLoggedIn) {
            return this.props.children;
        } else {
            return null;
        }
    }
});

function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.loggedIn,
        currentURL: ownProps.location.pathname,
    }
}

// export default connect(mapStateToProps)(EnsureLoggedInContainer)
module.exports = EnsureLoggedInContainer;
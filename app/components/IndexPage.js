var React = require('react');
var Link = require('react-router').Link;
var LoginLink = require('react-stormpath').LoginLink;


// class ContextExample extends React.Component {
//     static contextTypes = {
//         authenticated: React.PropTypes.bool,
//         user: React.PropTypes.object
//     };
//
//     render() {
//         if (!this.context.authenticated) {
//             return (
//                 <div>
//                     You need to <LoginLink />.
//                 </div>
//             );
//         }
//
//         return (
//             <div>
//                 Welcome {this.context.user.username}!
//             </div>
//         );
//     }
// }



var IndexPage = React.createClass({

    // childContextTypes: {
    //     foo: React.PropTypes.string.isRequired
    // },

    contextTypes : {
        authenticated: React.PropTypes.bool,
        user: React.PropTypes.object
    },


    // Here we render the component
    render: function () {
        // console.log("Test:", this.context.user.username);
        return (
            <div className="container">
                <h2 className="text-center">Welcome!</h2>
                <hr />
                <div className="jumbotron">
                    <p>
                        {/*Welcome {this.context.user.username}!*/}
                        <strong>To Polyfuel</strong>
                    </p>

                </div>
            </div>
        );
    }
});
// Export the component back for use in other files
module.exports = IndexPage;
// Include React
var React = require('react');
var axios = require('axios');

var DocumentTitle = require('react-document-title');

var DisplayMPG = React.createClass({

    getInitialState: function () {
        return {
            savedFillUps: "",
        }
    },

    componentDidMount: function () {
        console.log("Does this show?");

        return axios.get('/api/get/fillups')
            .then(function (results) {
                console.log("axios results", results);
                return results;
            })
            .then(function (mpgData) {
                this.setState({
                    savedFillUps: mpgData.data
                });
                console.log("saved stuff");
            }.bind(this))
    },
    contextTypes: {
        authenticated: React.PropTypes.bool,
        user: React.PropTypes.object
    },
    // Here we render the component
    render: function () {
        console.log("does this show", this.state.savedFillUps);
        if (this.state.savedFillUps == "") {
            return (
                <li className="list-group-item">
                    <h3>
                        No data saved :(
                    </h3>
                </li>
            )
        }
        else {
            var fillups = this.state.savedFillUps.map(function (fillup, index) {
                return (
                    <div key={index}>
                        <li className="list-group-item">
                            <h4>Miles: {fillup.miles}</h4>
                            <h4>Gallons: {fillup.gallons}</h4>
                            <h4>Price: ${ (fillup.price).toFixed(3)}</h4>
                            <h4>MPG: { (fillup.miles / fillup.gallons).toFixed(3)}</h4>
                        </li>
                    </div>
                )
            }.bind(this))
        }

        return (
            <DocumentTitle title={`Vehicle MPG`}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Fill-Up Data</h3>
                                    <h4>User: {this.context.user.username}</h4>
                                </div>
                                <div className="panel-body">

                                    {fillups}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        )
    }
});

// Export the component back for use in other files
module.exports = DisplayMPG;
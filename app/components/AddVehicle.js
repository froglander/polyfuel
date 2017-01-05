// Include React
var React = require('react');
var axios = require('axios');

var LabeledField = require('./LabeledField');


var AddVehicle = React.createClass({

    // Set initial state
    getInitialState: function () {
        return {
            make: "",
            model: "",
            year: "",
            trim: "",
            cityMPG: "",
            hwyMPG: "",
            user_id: "",
        }

    },
    handleChange: function (e) {
        console.log("input field changed");
        var changedState = {};
        changedState[e.target.id] = e.target.value;
        this.setState(changedState);
    },
    handleSubmit: function () {
        // console.log("Submit button clicked");
        // console.log("year:", this.state.year);
        // console.log("make:", this.state.make);
        // console.log("model:", this.state.model);
        // console.log("trim:", this.state.trim);
        // console.log("user_id:", this.context.user.username);

        var newVehicle = {
            year: this.state.year,
            make: this.state.make,
            model: this.state.model,
            trim: this.state.trim,
            user_id: this.context.user.username,
        };
        // console.log("click add vehicle:", newVehicle);

        return axios.post('/api/save/vehicle', newVehicle)
            .then(function (results) {
                // console.log("mongoose id:", results.data);
                return results.data;
            }.bind(this));

        // return false;
    },
    contextTypes: {
        authenticated: React.PropTypes.bool,
        user: React.PropTypes.object
    },
    // Here we render the component
    render: function () {
        // console.log("Render add vehicle component");

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Add New Vehicle</h3>
                            </div>
                            <div className="panel-body">
                                <form className="form-horizontal">

                                    <LabeledField handleChange={this.handleChange} val={this.state.year}
                                                  title="Year" labelId="year" inputType="text"/>

                                    <LabeledField handleChange={this.handleChange} val={this.state.make}
                                                  title="Make" labelId="make" inputType="text"/>

                                    <LabeledField handleChange={this.handleChange} val={this.state.model}
                                                  title="Model" labelId="model" inputType="text"/>

                                    <LabeledField handleChange={this.handleChange} val={this.state.trim}
                                                  title="Trim" labelId="trim" inputType="text"/>

                                    <button type="submit" className="btn btn-primary btn-lg btn-block"
                                            onClick={this.handleSubmit}>Save Vehicle
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
module.exports = AddVehicle;
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
        // this.props.newFillUp(this.state.miles, this.state.gallons, this.state.price, this.state.partial, this.state.vehicle_id);
        //
        // console.log("add fillup: miles:", this.state.miles);
        // console.log("gallons:", this.state.gallons);
        // console.log("price:", this.state.price);

        return false;
    },
    // Here we render the component
    render: function () {
        console.log("Render add vehicle component");

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
                                                  title="trim" labelId="trim" inputType="text"/>

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
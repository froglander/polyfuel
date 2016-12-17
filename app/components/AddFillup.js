// Include React
var React = require('react');
var axios = require('axios');

// For form fields
var LabeledField = require('./LabeledField');

var VehicleSelector = React.createClass({
    getInitialState: function () {
        return {
            selectValue: "",
            savedVehicles: [],
        };
    },
    handleChange: function (e) {
        this.setState({selectValue: e.target.value});
    },
    componentDidMount: function () {
        return axios.get('/api/get/vehicle')
            .then(function (results) {
                // console.log("axios vehicle results", results);
                return results;
            })
            .then(function (vehicleData) {
                this.setState({
                    savedVehicles: vehicleData.data
                });
                // console.log("retrieve vehicle info");
            }.bind(this))
    },
    render: function () {
        // console.log("Render dropdown select box", this.state.savedVehicles);
        // console.log("true/false", this.state.savedVehicles == "");
        // console.log("is it an array", Array.isArray(this.state.savedVehicles));

        var message = 'You selected ' + this.state.selectValue;

        if (this.state.savedVehicles == "") {
            // var message = 'You selected ' + this.state.selectValue;
            return (
                <div>
                    <select
                        value={this.state.selectValue}
                        onChange={this.handleChange}
                    >
                        <option value="New">No Vehicles Saved</option>
                    </select>
                    <p>{message}</p>
                </div>
            )
        } else {
            console.log(this.state.savedVehicles);
            var vehicles = this.state.savedVehicles.map(function (vehicle, index) {

                return (
                    <option key={index} value={vehicle._id}>
                        {vehicle.make} {vehicle.model}
                    </option>
                )
            }.bind(this));
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <select
                            value={this.state.selectValue}
                            onChange={this.handleChange}
                        >
                            {vehicles}
                        </select>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        );


    }
});

/* ***************************************************************** */
var AddFillup = React.createClass({

    // Set initial state
    getInitialState: function () {
        return {
            miles: "",
            gallons: "",
            price: "",
            partial: false,
            vehicle_id: "",
            // selectedVehicle: "",
        }

    },
    handleChange: function (e) {
        console.log("input field changed");
        var changedState = {};
        changedState[e.target.id] = e.target.value;
        this.setState(changedState);
    },
    handleSubmit: function () {
        console.log("Submit button clicked");
        console.log("add fillup: miles:", this.state.miles);
        console.log("gallons:", this.state.gallons);
        console.log("price:", this.state.price);
        console.log("vehicle:", this.state.vehicle_id);

        var newFillUp = {
            miles: this.state.miles,
            gallons: this.state.gallons,
            price: this.state.price,
            vehicle_id: this.state.vehicle_id,
        };
        console.log("click fill-up:", newFillUp);

        return axios.post('/api/save/fillup', newFillUp)
            .then(function (results) {
                console.log("mongoose id:", results.data);
                return results.data;
            }.bind(this));


        // return false;
    },
    // Here we render the component
    render: function () {
        console.log("Render add fill up component");

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">New Fill-Up</h3>
                            </div>
                            <div className="panel-body">
                                <form className="form-horizontal">

                                    <LabeledField handleChange={this.handleChange} val={this.state.miles}
                                                  title="Miles" labelId="miles" inputType="text"/>

                                    <LabeledField handleChange={this.handleChange} val={this.state.gallons}
                                                  title="Gallons" labelId="gallons" inputType="text"/>

                                    <LabeledField handleChange={this.handleChange} val={this.state.price}
                                                  title="Price" labelId="price" inputType="text"/>

                                    <LabeledField handleChange={this.handleChange} val={this.state.partial}
                                                  title="Partial Fill-Up" labelId="partial" inputType="checkbox"/>

                                    <LabeledField handleChange={this.handleChange} val={this.state.vehicle_id}
                                    title="Vehicle" labelId="vehicle_id" inputType="text"/>

                                    <VehicleSelector />

                                    <button type="submit" className="btn btn-primary btn-lg btn-block"
                                            onClick={this.handleSubmit}>Add Fill-Up
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
module.exports = AddFillup;
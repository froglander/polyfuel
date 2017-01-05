// Include React
var React = require('react');
var axios = require('axios');

// For form fields
var LabeledField = require('./LabeledField');
var VehicleSelector = require('./VehicleSelector');


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
        // console.log("Submit button clicked");
        // console.log("add fillup: miles:", this.state.miles);
        // console.log("gallons:", this.state.gallons);
        // console.log("price:", this.state.price);
        // console.log("vehicle:", this.state.vehicle_id);

        var newFillUp = {
            miles: this.state.miles,
            gallons: this.state.gallons,
            price: this.state.price,
            vehicle_id: this.state.vehicle_id,
        };
        // console.log("click fill-up:", newFillUp);

        return axios.post('/api/save/fillup', newFillUp)
            .then(function (results) {
                console.log("mongoose id:", results.data);
                return results.data;
            }.bind(this));


        // return false;
    },
    onVehicleChange: function (vehicle_id) {
        console.log("vehicle_id: ", vehicle_id);
        this.setState({vehicle_id: vehicle_id});
    },

    // Here we render the component
    render: function () {
        // console.log("Render add fill up component");

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

                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Select Vehicle</label>
                                        <div className="col-sm-9">
                                            <VehicleSelector vehicleChange={this.onVehicleChange}/>
                                        </div>
                                    </div>

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
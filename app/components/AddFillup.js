// Include React
// Switching to ES6 (trying to) because so many examples are written that way
// var React = require('react');
// var axios = require('axios');

import React from 'react';
import axios from 'axios';

// For form fields
// var LabeledField = require('./LabeledField');
// var VehicleSelector = require('./VehicleSelector');
import LabeledField from './LabeledField';
import VehicleSelector from './VehicleSelector';

/* ***************************************************************** */
// var AddFillup = React.createClass({
export default class AddFillup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            miles: props.miles,
            gallons: props.gallons,
            price: props.price,
            partial: props.partial,
            vehicle_id: props.vehicle_id
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onVehicleChange = this.onVehicleChange.bind(this);
    }

    handleChange(e) {
        console.log("input field changed");
        let changedState = {};
        changedState[e.target.id] = e.target.value;
        this.setState(changedState);
    }

    handleSubmit() {
        let user_id = this.context.user.username;
        let newFillUp = {
            miles: this.state.miles,
            gallons: this.state.gallons,
            price: this.state.price,
            vehicle_id: this.state.vehicle_id,
        };
        let newCurrentVehicle = {
            username: this.context.user.username,
            vehicle_id: this.state.vehicle_id,
        };

        function postFillup(newFillUp) {
            return axios.post('/api/save/fillup', {params: {user_id: user_id, fillup: newFillUp}});
        }

        function updateLatestVehicle(newCurrentVehicle) {
            return axios.post('api/update/currentVehicle', newCurrentVehicle)
        }

        axios.all([postFillup(newFillUp), updateLatestVehicle(newCurrentVehicle)])
            .then(axios.spread(function (acct, perms) {
                // According to documentation, both requests should now be complete
            }));
    }

    onVehicleChange(vehicle_id) {
        console.log("Add fill-up vehicle_id: ", vehicle_id);
        this.setState({vehicle_id: vehicle_id});
    }

    // Here we render the component
    render() {
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
}

AddFillup.contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
};

// Export the component back for use in other files
// module.exports = AddFillup;
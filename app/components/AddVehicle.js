// Include React
// Switching to ES6 (trying to) because so many examples are written that way
// var React = require('react');
// var axios = require('axios');

import React from 'react';
import axios from 'axios';

// var LabeledField = require('./LabeledField');
import LabeledField from './LabeledField';

// var AddVehicle = React.createClass({
export default class AddVehicle extends React.Component {
    // Set initial state
    // getInitialState () {
    //     return {
    //         make: "",
    //         model: "",
    //         year: "",
    //         trim: "",
    //         cityMPG: "",
    //         hwyMPG: "",
    //         user_id: "",
    //     }
    // }

    constructor(props) {
        super(props);
        this.state = {
            make: "",
            model: "",
            year: "",
            trim: "",
            user_id: "",
        };
    }

    handleChange (e) {
        console.log("input field changed");
        var changedState = {};
        changedState[e.target.id] = e.target.value;
        this.setState(changedState);
    }
    handleSubmit () {
        // When you click submit to add a new vehicle, it will update the currently logged in
        // User by adding vehicle data to the array


        // First get the ID value for the current username
        // axios.get('/api/get/user', {params: {user_id: this.context.user.username}})
        //     .then(function(results) {
        //         return results.data;
        //     }.bind(this));
        var newVehicle = {
            year: this.state.year,
            make: this.state.make,
            model: this.state.model,
            trim: this.state.trim,

        };
        // console.log("click add vehicle:", newVehicle);

        return axios.post('/api/save/vehicle', {params: {user_id: this.context.user.username, vehicle: newVehicle }})
            .then(function (results) {
                console.log("mongoose id:", results.data);
                return results.data;
            }.bind(this));

        // return false;
    }

    // static contextTypes = {
    //     authenticated: React.PropTypes.bool,
    //     user: React.PropTypes.object
    // };

    // Here we render the component
    render () {
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
}

// AddVehicle.contextTypes = {
//     authenticated: React.PropTypes.bool,
//     user: React.PropTypes.object
// };

// Export the component back for use in other files
// module.exports = AddVehicle;
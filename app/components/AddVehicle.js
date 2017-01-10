// Include React
// Switching to ES6 (trying to) because so many examples are written that way

import React from 'react';
import axios from 'axios';
import DocumentTitle from 'react-document-title';
import LabeledField from './LabeledField';

export default class AddVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            make: "",
            model: "",
            year: "",
            trim: "",
            user_id: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        // console.log("input field changed");
        var changedState = {};
        changedState[e.target.id] = e.target.value;
        this.setState(changedState);
    }

    handleSubmit() {
        // When you click submit to add a new vehicle, it will update the currently logged in
        // User by adding vehicle data
        var newVehicle = {
            year: this.state.year,
            make: this.state.make,
            model: this.state.model,
            trim: this.state.trim,
        };

        return axios.post('/api/save/vehicle', {params: {user_id: this.context.user.username, vehicle: newVehicle}})
            .then(function (results) {
                console.log("mongoose id:", results.data);
                return results.data;
            }.bind(this));
    }

    // Here we render the component
    render() {
        // console.log("Render add vehicle component");

        return (
            <DocumentTitle title={`Add New Vehicle`}>
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
            </DocumentTitle>
        )
    }
}

AddVehicle.contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
};
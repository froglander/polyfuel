// Switching to ES6 (trying to) because so many examples are written that way
import React from 'react';
import axios from 'axios';

export default class VehicleSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedVehicle: "",
            savedVehicles: [],
        };
    }
    handleChange (e) {
        // Update the selectedVehicle value when the user selects a different
        // vehicle from the dropdown
        this.setState({selectedVehicle: e.target.value});
        this.state.vehicleChange(e.target.value);
    }
    componentDidMount () {
        // Get the current User object from the mongodb and store it in "results" so that
        // we have access to the lastVehicleAccessed as well as the list of vehicles for
        // that user
        return axios.get('/api/get/vehicle', {params: {user_id: this.context.user.username}})
            .then(function (results) {
                console.log("VehicleSelector vehicle results: ", results.data);

                // condition ? true : false
                let curVehicle = results.data[0].lastVehicleAccessed ? results.data[0].lastVehicleAccessed : results.data[0].vehicles[0]._id;

                this.setState({
                    savedVehicles: results.data[0].vehicles,
                    selectedVehicle: curVehicle
                });
                this.props.vehicleChange(this.state.selectedVehicle);
            }.bind(this));
    }

    render () {
        console.log('You selected1 ' + this.state.selectedVehicle);

        console.log("Render VehicleSelector component");

        if (this.state.savedVehicles.length === 0) {
            return (
                <div>
                    <select
                        value="New"
                        onChange={this.handleChange}
                    >
                        <option value="New">No Vehicles Saved</option>
                    </select>
                    {/*<p>{message}</p>*/}
                </div>
            )
        } else {
            var vehicles = this.state.savedVehicles.map(function (vehicle, index) {

                return (
                    <option key={index} value={vehicle._id}>
                        {vehicle.make} {vehicle.model}
                    </option>
                )
            }.bind(this));

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <select
                                value={this.state.selectedVehicle}
                                onChange={this.handleChange}
                            >
                                {vehicles}
                            </select>
                            {/*<p>{message}</p>*/}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

VehicleSelector.contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
};
// module.exports = VehicleSelector;
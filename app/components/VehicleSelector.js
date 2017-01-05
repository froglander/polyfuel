var React = require('react');
var axios = require('axios');


var VehicleSelector = React.createClass({
    getInitialState: function () {
        return {
            selectValue: "",
            savedVehicles: [],
        };
    },
    handleChange: function (e) {
        this.setState({selectValue: e.target.value});
        console.log("handleChange this:", this);
        this.props.vehicleChange(e.target.value);
    },
    componentDidMount: function () {
        return axios.get('/api/get/vehicle', {params: {user_id: this.context.user.username}})
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
    contextTypes: {
        authenticated: React.PropTypes.bool,
        user: React.PropTypes.object
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

module.exports = VehicleSelector;
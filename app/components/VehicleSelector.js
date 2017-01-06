var React = require('react');
var axios = require('axios');


var VehicleSelector = React.createClass({
    getInitialState: function () {
        return {
            selectedVehicle: "",
            savedVehicles: [],
        };
    },
    handleChange: function (e) {
        console.log("vehicleSelector handleChange: ", e);

        this.setState({selectedVehicle: e.target.value});
        console.log("handleChange this:", this);
        this.props.vehicleChange(e.target.value);
    },
    componentDidMount: function () {

        // function getVehicles() {
        //     return axios.get('/api/get/vehicle', {params: {user_id: this.context.user.username}});
        // }
        //
        // function getLatestVehicle() {
        //     return axios.get('api/get/currentVehicle', {params: {user_id: this.context.user.username}});
        // }
        // axios.all([getVehicles(), getLatestVehicle()])
        //     .then(axios.spread(function(acct, perms) {
        //         // According to documentation, both requests should now be complete
        //         console.log("acct", acct);
        //         console.log("perms", perms);
        //     }));
        //
        //         this.setState({
        //             savedVehicles: ['cmax'],
        //             selectedVehicle: '58508d41dfb077a8ec355481'
        //         });
        var currentUser = this.context.user.username;

        return axios.get('/api/get/vehicle', {params: {user_id: currentUser}})
            .then(function (results) {
                // console.log("axios vehicle results", results);
                return results;
            })
            // .then(function (userVehicle) {
            //     return axios.get('/api/get/lastVehicleAccessed', {params: {user_id: currentUser}});
            // })
            .then(function (vehicleData) {
                // console.log("vehicleData:", vehicleData.data[0]);
                this.setState({
                    savedVehicles: vehicleData.data,
                    selectedVehicle: vehicleData.data[0]._id
                });
                // console.log("retrieve vehicle info");
                this.props.vehicleChange(this.state.selectedVehicle);
            }.bind(this));

        return axios.get('/api/get/lastVehicleAccessed', {params: {user_id: this.context.user.username }})
            .then(function(results) {
                console.log("lastVA results: ", results);
            });

    },
    contextTypes: {
        authenticated: React.PropTypes.bool,
        user: React.PropTypes.object
    },
    render: function () {
        var message = 'You selected ' + this.state.selectedVehicle;

        if (this.state.savedVehicles === "") {
            // var message = 'You selected ' + this.state.selectValue;
            return (
                <div>
                    <select
                        value={this.state.selectedVehicle}
                        onChange={this.handleChange}
                    >
                        <option value="New">No Vehicles Saved</option>
                    </select>
                    <p>{message}</p>
                </div>
            )
        } else {
            // console.log("this.state.savedVehicles:", this.state.savedVehicles);
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
                            value={this.state.selectedVehicle}
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
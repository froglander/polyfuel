import React from 'react';
import axios from 'axios';
import DocumentTitle from 'react-document-title';

/** ****************************************************************** */
class FillUpDetails extends React.Component {
    render() {
        return (
            <tr>
                <td className="panel-body">
                    <h4>Miles: {this.props.miles}</h4>
                    <h4>Gallons: {this.props.gallons}</h4>
                    <h4>Price: ${this.props.price}</h4>
                    <h4>MPG: {(this.props.miles / this.props.gallons).toFixed(3)}</h4>
                </td>
            </tr>
        );
    }
}

/** ****************************************************************** */
class FillUpTable extends React.Component {
    render() {
        let rows = [];
        let vehicles = this.props.vehicles;

        for (var i = 0; i < vehicles.length; i++) {
            if (vehicles[i]._id === this.props.selectedVehicle) {
                vehicles[i].fillups.forEach(function (fillup) {
                    rows.push(
                        <FillUpDetails key={fillup._id}
                                       miles={fillup.miles}
                                       gallons={fillup.gallons}
                                       price={fillup.price}
                        />
                    );
                });
            }
        }

        return (
            <table>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
}

/** ****************************************************************** */
class VehicleSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        // Update the selectedVehicle value when the user selects a different
        // vehicle from the dropdown
        this.props.onUserChange(
            this.vehicleSelectInput.value
        );
    }

    render() {
        return (
            <select
                value={this.props.selectedVehicle}
                ref={(input) => this.vehicleSelectInput = input }
                onChange={this.handleChange}
            >
                <option value="58706eaf7f9fcd74e20c11eb">Cmax</option>
                <option value="58706ec07f9fcd74e20c11ec">Aura</option>
                <option value="5873a885661e6804145b4a2d">Versa</option>
            </select>
        );
    }
}
/** ****************************************************************** */
class VehicleFillUpTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedVehicle: ""
        };

        this.handleUserChange = this.handleUserChange.bind(this);
    }

    handleUserChange(selectedVehicle) {
        this.setState({
            selectedVehicle: selectedVehicle,
        });
    }

    componentWillMount() {
        this.setState({
            selectedVehicle: this.props.curVehicle
        })
    }

    render() {
        if(!this.props.curVehicle) {
            return (<div>State not yet assigned!</div>)
        }
        return (
            <div>
                <VehicleSelector
                    selectedVehicle={this.state.selectedVehicle}
                    onUserChange={this.handleUserChange}
                />
                <FillUpTable
                    vehicles={this.props.vehicles}
                    selectedVehicle={this.state.selectedVehicle}
                />
            </div>
        )
    }
}

/** ****************************************************************** */
export default class DisplayMPG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userVehicles: [],
            lastVehicleAccessed: "",
        };
    }

    componentWillMount() {
        // Retrieve user/vehicle data from database
        return axios.get('/api/get/fillups', {params: {user_id: this.context.user.username}})
            .then(function (results) {
                this.setState({
                    userVehicles: results.data[0].vehicles,
                    lastVehicleAccessed: results.data[0].lastVehicleAccessed
                })
            }.bind(this));
    }


    render() {
        if(!this.state.lastVehicleAccessed) {
            return (<div>Database call not finished!</div>)
        }
        return (
            <DocumentTitle title={`Display MPG`}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Fill-Up Details</h3>
                                </div>
                                <div className="panel-body">
                                    <VehicleFillUpTable
                                        vehicles={this.state.userVehicles}
                                        curVehicle={this.state.lastVehicleAccessed}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        )
    }
}

DisplayMPG.contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
};
import React from 'react';
import axios from 'axios';
import DocumentTitle from 'react-document-title';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import moment from 'moment';

// Code examples from http://recharts.org/#/en-US/examples/CustomizedLabelLineChart
/** ****************************************************************** */
class CustomizedLabel extends React.Component {
    render() {
        const {x, y, stroke, payload} = this.props;

        return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{payload.value}</text>
    }
}

/** ****************************************************************** */
class CustomizedAxisTick extends React.Component {
    render() {
        const {x, y, stroke, payload} = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
            </g>
        );
    }
}

/** ****************************************************************** */
class SimpleLineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mpgDataArray: []
        };
    }

    componentWillMount() {
        // Needs to be an array of objects with a dataKey and mpg
        let data = [];
        let vehicles = this.props.vehicles;

        console.log("vehicles1: ", vehicles);

        for (var i = 0; i < vehicles.length; i++) {
            if (vehicles[i]._id === this.props.selectedVehicle) {
                vehicles[i].fillups.forEach(function (fillup) {
                    data.push({
                        fillupDate: moment(fillup.fillupDate).format("YYYY-MM-DD"),
                        mpg: parseFloat((fillup.miles / fillup.gallons).toFixed(3))
                    })
                })
            }
        }

        console.log("data: ", data);

        this.setState({
            mpgDataArray: data
        })
    }

    render() {
        return (
            <LineChart width={600} height={300} data={this.state.mpgDataArray}
                       margin={{top: 20, right: 30, left: 20, bottom: 10}}>
                <XAxis dataKey="fillupDate" height={60} tick={<CustomizedAxisTick/>}/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Line type="monotone" dataKey="mpg" stroke="#8884d8" label={<CustomizedLabel />}/>
            </LineChart>

        );
    }
}

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
        // console.log("vehicles: ", this.props.vehicles);

        if (this.props.vehicles.length === 0) {
            return (
                <div>
                    <select
                        value="New"
                        onChange={this.handleChange}
                    >
                        <option value="New">No Vehicles Saved</option>
                    </select>
                </div>
            )
        } else {
            let vehicles = this.props.vehicles.map(function (vehicle, index) {
                return (
                    <option key={index} value={vehicle._id}>
                        {vehicle.make} {vehicle.model}
                    </option>
                )
            }.bind(this));

            return (
                <select
                    value={this.props.selectedVehicle}
                    ref={(input) => this.vehicleSelectInput = input }
                    onChange={this.handleChange}
                >
                    {vehicles}
                </select>
            )
        }
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
        if (!this.props.curVehicle) {
            return (<div>State not yet assigned!</div>)
        }
        return (
            <div>
                <VehicleSelector
                    vehicles={this.props.vehicles}
                    selectedVehicle={this.state.selectedVehicle}
                    onUserChange={this.handleUserChange}
                />

                <SimpleLineChart
                    vehicles={this.props.vehicles}
                    selectedVehicle={this.state.selectedVehicle}
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
        if (!this.state.lastVehicleAccessed) {
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
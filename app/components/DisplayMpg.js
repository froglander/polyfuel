// Include React
// Switching to ES6 (trying to) because so many examples are written that way

import React from 'react';
import axios from 'axios';
import DocumentTitle from 'react-document-title';

import VehicleSelector from './VehicleSelector';

export class FillUpDetails extends React.Component {
    render () {
        console.log("Render FillUpDetails: ", this.props.miles);

        return (
            <tr>
                <td>
                    <div className="panel-body">
                        <h4>Miles: {this.props.miles}</h4>
                        <h4>Gallons: {this.props.gallons}</h4>
                        <h4>Price: { this.props.price}</h4>
                        <h4>MPG: { (this.props.miles / this.props.gallons).toFixed(3)}</h4>
                    </div>
                </td>
            </tr>
        );
    }
}

export class FillUpTable extends React.Component {
    render () {
        console.log("Render FillUpTable");

        var rows = [];
        this.props.fillups.forEach(function (fillup) {
            console.log("forEach fillup:", fillup);
            rows.push(<FillUpDetails key={fillup.miles} miles={fillup.miles} gallons={fillup.gallons}
                                     price={fillup.price} mpg={(fillup.miles / fillup.gallons).toFixed(3)}/>);
        });
        console.log("Rows:", rows);

        return (
            <table>
                <thead>
                <tr>
                    <td>Fill-Up Details</td>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
}

// Include VehicleSelector?
// export class VehicleSelector2 extends React.Component {
//     render () {
//         console.log("Render VehicleSelector");
//
//         return (
//             <select>
//                 <option>Car1</option>
//                 <option>Car2</option>
//             </select>
//         )
//     }
// }


// var VehicleFillupTable = React.createClass({
export class VehicleFillupTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            miles: "",
            gallons: "",
            price: "",
            partial: "",
            vehicle_id: ""
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.onVehicleChange = this.onVehicleChange.bind(this);
    }

    onVehicleChange(vehicle_id) {
        console.log("Add fill-up vehicle_id: ", vehicle_id);
        this.setState({vehicle_id: vehicle_id});
    }
    
    render () {
        console.log("Render VehicleFillupTable");

        console.log("fillups props: ", this.props.fillups);
        
        console.log("this:", this.onVehicleChange);


        return (
            <div>
                <h1>Display some text!</h1>
                {/*<VehicleSelector2 />*/}
                <VehicleSelector vehicleChange={this.onVehicleChange}/>
                <FillUpTable fillups={this.props.fillups}/>
            </div>
        )
    }
}


var FILLUPS = [
    {miles: 231, gallons: 8, price: '$2.099'},
    {miles: 345, gallons: 9, price: '$2.199'},
    {miles: 437, gallons: 10, price: '$2.299'},
    {miles: 320, gallons: 8.9, price: '$2.159'},
    {miles: 421, gallons: 10, price: '$2.359'},
];

export default class DisplayMPG extends React.Component {



    render () {
        console.log("Render DisplayMPG");
        return (
            <VehicleFillupTable fillups={FILLUPS}/>
        )
    }
}

// Export the component back for use in other files
// module.exports = DisplayMPG;
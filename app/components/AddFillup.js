// Include React
var React = require('react');
var axios = require('axios');

var LabeledField = require('./LabeledField');


var AddFillup = React.createClass({

    // Set initial state
    getInitialState: function () {
        return {
            miles: "",
            gallons: "",
            price: "",
            partial: false,
            vehicle_id: ""
        }

    },
    handleChange: function (e) {
        console.log("input field changed");
        var changedState = {};
        changedState[e.target.id] = e.target.value;
        this.setState(changedState);
    },
    handleSubmit: function () {
        console.log("Submit button clicked");
        console.log("add fillup: miles:", this.state.miles);
        console.log("gallons:", this.state.gallons);
        console.log("price:", this.state.price);

        var newFillUp = {
            miles: this.state.miles,
            gallons: this.state.gallons,
            price: this.state.price
        };
        console.log("click fill-up:", newFillUp);

        return axios.post('/api/save/fillup', newFillUp)
            .then(function(results) {
                console.log("mongoose id:", results.data);
                return results.data;
            }.bind(this));


        // return false;
    },
    // Here we render the component
    render: function () {
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

                                    <LabeledField handleChange={this.handleChange} val={this.state.vehicle_id}
                                                  title="Vehicle" labelId="vehicle_id" inputType="text"/>

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
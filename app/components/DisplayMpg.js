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
        console.log("Submit clicked");
        this.props.newFillUp(this.state.miles, this.state.gallons, this.state.price, this.state.partial, this.state.vehicle_id);

        console.log("add fillup: miles:", this.state.miles);
        console.log("gallons:", this.state.gallons);
        console.log("price:", this.state.price);

        // var newFillUp = {miles: thisItem.headline.main, date: thisItem.pub_date, url: thisItem.web_url };
        // // console.log("click article:", newArticle);
        // return axios.post('/api/saved', newArticle)
        //     .then(function(results) {
        //         console.log("mongoose id:", results.data);
        //         return results.data;
        //     }.bind(this))


        return false;
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
                                <h3 className="panel-title">Details</h3>
                            </div>
                            <div className="panel-body">
                                <p>this is where I will display the average mpg, a graph, and buttons to add fill-ups for
                                other vehicles</p>

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
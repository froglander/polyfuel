// Include React
var React = require('react');
var axios = require('axios');


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
    handleChange: function(e) {
        console.log("input field changed");
        var changedState = {};
        changedState[e.target.id] = e.target.value;
        this.setState(changedState);
    },
    handleSubmit: function() {
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
                    <div className="col-sm-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">New Fill-Up</h3>
                            </div>
                            <div className="panel-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label htmlFor="miles" className="col-sm-2 control-label">Miles </label>
                                        <div className="col-sm-10">
                                            <input type="text" value={this.state.miles} className="form-control"
                                                   id="miles" onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="gallons" className="col-sm-2 control-label">Gallons</label>
                                        <div className="col-sm-10">
                                            <input type="text" value={this.state.gallons} className="form-control"
                                                   id="gallons" onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price" className="col-sm-2 control-label">Price</label>
                                        <div className="col-sm-10">
                                            <input type="text" value={this.state.price} className="form-control"
                                                   id="price" onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-offset-2 col-sm-10">
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" value={this.state.partial}
                                                           id="partial" onChange={this.handleChange}/> Partial Fill-Up
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="vehicle_id" className="col-sm-2 control-label">Vehicle</label>
                                        <div className="col-sm-10">
                                            <input type="text" value={this.state.vehicle_id}
                                                   className="form-control"
                                                   id="vehicle_id" onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg btn-block"
                                            onClick={this.handleSubmit}>
                                        Add Fill-Up
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
// Include React
var React = require('react');
var axios = require('axios');


var AddFillup = React.createClass({

    // Set initial state
    getInitialState: function() {
        return {
            miles: "",
            gallons: "",
            price: " ",
            vehicle_id: ""
        }

    },

    // Here we render the component
    render: function () {
        console.log("Render component");

        return (
            <div className="container">
                Display some stuff
            </div>
        )
    }
});

// Export the component back for use in other files
module.exports = AddFillup;
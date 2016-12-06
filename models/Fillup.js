/**
 * Mongoose schema for Fillups
 */

// require Mongoose
var mongoose = require('mongoose');

// Create schema class
var Schema = mongoose.Schema;

// Fillup schema
var FillupSchema = new Schema({
    // How many miles you went, might need to figure out a way to
    // give the option of odometer readings, but for now will use
    // miles (use your tripodometer!)
    miles: {
        type: Number,
        required: true
    },
    // Gallons for the fill up
    gallons: {
        type: Number,
        required: true
    },
    // Price per gallon, is optional
    price: {
        type: Number,
        required: false
    },
    // Flag to set if it was a partial fillup
    partial: {
        type: Boolean,
        default: false
    },
    // Each fill up belongs to a specific vehicle
    vehicle_id : {
        type: Schema.Types.ObjectId, ref: 'Vehicle'
    }
});

// Create the Fillup model with the FillupSchema
var Fillup = mongoose.model('Fillup', FillupSchema);

// Export the model
module.exports = Fillup;
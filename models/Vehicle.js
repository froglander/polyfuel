/**
 * Mongoose schema for Vehicles
 */

// require Mongoose
var mongoose = require('mongoose');

// Create schema class
var Schema = mongoose.Schema;

// Vehicle schema
var VehicleSchema = new Schema({
    // Make of vehicle
    make: {
        type: String,
        required: true
    },
    // Model of vehicle
    model: {
        type: String,
        required: true
    },
    // Year of vehicle
    year: {
        type: Number,
        required: false
    },
    // Trim level of vehicle
    trim: {
        type: String
    },
    // This will be populated from Edmunds API
    cityMPG: {
        type: Number
    },
    // This will be populated from Edmunds API
    hwyMGP: {
        type: Number
    },
    // Each vehicle belongs to a single user
    user_id : {
        type: Schema.Types.ObjectId, ref: 'User'
    }
});

// Create the Vehicle model with the VehicleSchema
var Vehicle = mongoose.model('Vehicle', VehicleSchema);

// Export the model
module.exports = Vehicle;
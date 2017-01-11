/**
 * Mongoose schema for Users which will contain an array of vehicles that belong to the user
 * and each vehicle will contain an array of fill-ups for that vehicle
 */

// require Mongoose
var mongoose = require('mongoose');

// Create schema class
var Schema = mongoose.Schema;

// User schema
var UserSchema = new Schema({
        // Only storing the email as username, password, etc is stored in Stormpath
        username: {
            type: String,
            required: true,
            unique: true,
        },
        // So the app knows which vehicle's data to default to
        // This value is updated each time a user accesses a different vehicle
        lastVehicleAccessed: {
            type: String
        },
        // Each user will have an array of one or many vehicles
        vehicles: [{
            year: {type: Number, min: 1900},
            make: {type: String},
            model: {type: String},
            trim: {type: String},
            // Each vehicle will have an array of fill-ups
            fillups: [{
                fillupDate: {type: String},
                miles: {type: Number},
                gallons: {type: Number},
                price: {type: Number},
            }],
        }],

    },
    {
        timestamps: true
    });

// Create the User model with the UserSchema
var User = mongoose.model('User', UserSchema);

// Export the model
module.exports = User;

// exports.User = mongoose.model('User', UserSchema);
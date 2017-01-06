/**
 * Mongoose schema for Users
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
        // type: Schema.Types.ObjectId,
        // ref: 'Vehicle'
        type: String
    }
});

// Create the User model with the UserSchema
var User = mongoose.model('User', UserSchema);

// Export the model
module.exports = User;
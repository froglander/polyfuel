/**
 * Mongoose schema for Users
 */

// require Mongoose
var mongoose = require('mongoose');

// Create schema class
var Schema = mongoose.Schema;

// User schema
var UserSchema = new Schema({
    // Username
    username: {
        type: String,
        required: true
    },
    // Password
    password: {
        type: String,
        required: true
    },
    // Zip code to know approximate area of country
    zip: {
        type: String,
        required: false
    }
});

// Create the User model with the UserSchema
var User = mongoose.model('User', UserSchema);

// Export the model
module.exports = User;
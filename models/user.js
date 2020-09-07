const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, 'please tell us your First Name'],
    },
    lastName: {
        type: String,
        required: [true, 'please tell us your Last Name'],
    },
    username: {
        type: String,
        default: 'user-xxx-name'
    },
    phoneNumber: {
        type: String,
        // required: [true, 'please provide a phone number'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an Email'],
        unique: true,
        lowercase: true,
        // Using the validator installed
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: String,
        enum: ['user', 'moderator', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Please provide a password with minimum length of 8'],
        // Make the password never show up for any get request
        // select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
    },
    campaign: {
        type: mongoose.Schema.ObjectId,
        ref: 'Campaign',
        // required: [true, 'A campaign is unique to a User']
    }
}, {
    timestamps: true
}
);


// define the User Model
const User = mongoose.model('User', userSchema);

module.exports = User;


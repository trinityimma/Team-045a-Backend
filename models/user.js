const mongoose = require("mongoose");

const userRoles = Object.freeze({
    Admin: 'admin',
    Caimpaigner: 'campainer',
    Normal: 'normal',
  });

 const userSchema = new mongoose.Schema({
    username:{
        type: String
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        enum: Object.values(userRoles),
    },
    phoneNumber: {
        type: String
    },
    dateJoined: {
        type: Date, 
        default: new Date()
    },
});

Object.assign(userSchema.statics, {
    userRoles,
});

module.exports = mongoose.model("User", userSchema);
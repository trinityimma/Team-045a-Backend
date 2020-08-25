var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local");

var userSchema = new mongoose.Schema({  
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    userType: String
    
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",  userSchema);
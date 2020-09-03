const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
	first_name: {type: String, required: true, unique: true},
	last_name: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
    password: {type: Password, required: true},
    payment_info: {
    	account_number: {type: Number},
    	bank_name: {type: String},
                },
	campaign: {type: Schema.Types.ObjectId, ref: 'Campaign'}
});

//get the user's unique url
userSchema.get(function(){
	return '/user/' + this._id;
})

const User = mongoose.model('User', userSchema);

module.exports = User;
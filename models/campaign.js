const mongoose = require('mongoose');
const schema = mongoose.Schema;

const campaignSchema = new schema({
	campaign_name: {type: String},
	funds_needed: {type: Number},
	campaign_story: {type: String},
	payment_info:{ type: Schema.Types.ObjectId, ref:'User'}
})

//Get the campaign's url
campaignSchema.virtual('url')
.get(function(){
	return '/campaigns/' + this._id;
});


const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
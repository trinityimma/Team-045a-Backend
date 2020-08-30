const mongoose = require('mongoose');
const slugify = require('slugify');

// Creating campaign model
const campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A campaign must have a title'],
        unique: true,
        trim: true,
        maxlength: [20, 'A campaign name must have less or equal 20 characters'],
        minlength: [5, 'A campaign name must have more or equal 5 characters']
    },
    description: {
        type: String,
        required: [true, 'A campaign must have a description'],
        unique: true,
        trim: true,
    },
    image: {
        type: String,
        required: [true, 'A campaign must have an Image'],
        unique: true,
        trim: true,
    },
    documents: {
        type: [String],
        required: [true, 'A campaign must have a Document for reference'],
    },
    amountToRaise: {
        type: Number,
        required: [true, 'A campaign must have an amount']
    },
    slug: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A campaign must belong to a user']
    }
},
    {
        timestamps: true,
    }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
campaignSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

// Define the Campaign Model
const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
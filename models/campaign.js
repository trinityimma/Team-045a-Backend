var mongoose = require("mongoose"),
 marked = require("marked"),
 slugify = require("slugify"),
 createDomPurify = require("dompurify"),
 { JSDOM } = require("jsdom"),
 dompurify = createDomPurify(new JSDOM().window);

const campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    imageId: {
        type: String
    },
    caption: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    },
    organizer: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }    
});

campaignSchema.pre("validate", function(next){
    if(this.title){
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    if(this.caption){
        this.sanitizedCaption = dompurify.sanitize(marked(this.caption));
    }

    if(this.description){
        this.sanitizedHtml = dompurify.sanitize(marked(this.content));
    }
    next();
});

module.exports = mongoose.model("Article", articleSchema);
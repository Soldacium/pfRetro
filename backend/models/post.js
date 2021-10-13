const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name: {type: String, required: true},
    tags: [String],
    description: {type: String, required: true},
    link: {type: String, required: true},
    imageUrl: {type: String, required: true},
    type: {type: String, required: true},
    reactions: {type: {
        like: Number,
        love: Number,
        dislike: Number,
        hate: Number
    }, required: true},
    comments: {type: [{
        userId: {type: String, required: true},
        comment: {type: String, required: true},
        username: {type: String, required: true},
        date: {type: String, required: true},
        responses: {type: [{
            userId: String,
            comment: String,
            username: String,
            date: String,
        }], required: true}        
    }], required: true}
});

module.exports = mongoose.model('Post', postSchema);
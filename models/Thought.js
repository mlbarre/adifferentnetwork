const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'please enter 1 to 128 characters.',
            minlength: 1,
            maxlength: 128
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.replies.length;
});

const Thoughts = model('Thoughts', ThoughtSchema);

module.exports = Thoughts;
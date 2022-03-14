const {Schema, model} = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            required: 'please enter a username.'
        },
        email: {
            type: String,
            unique: true,
            required: 'please enter an email address',
            validate: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [ThoughtSchema],
        friends: [UserSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
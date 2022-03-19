const { User, Thoughts } = require('../models');

const ThoughtController = {
    //add thought to user
    addThought({ params, body }, res) {
        console.log(body);
        Thoughts
        .create(body)
        .then(({ _id }) => {
            // console.log(_id)
            return User.findOneAndUpdate(
                { _id: params.pizzaId },
                { $push: { thoughts: _id }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id! ¯\_(ツ)_/¯'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    //add reaction
    addReaction({ params, body }, res) {
        Thoughts
        .findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
        })
          .catch(err => res.json(err));
    },

    //remove thought
    removeThought({ params }, res) {
        Thoughts
        .findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'no thought with this id!! ¯\_(ツ)_/¯'});
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no userrrrr found with this id! ¯\_(ツ)_/¯'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // remove reaction
    removeReaction({ params }, res) {
        Thoughts
        .findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = ThoughtController;
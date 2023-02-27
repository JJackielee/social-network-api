const { User, Thought } = require('../models');

module.exports = {
    // using the thought model we get all the thoughts in the data base and display json data
    getThought(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // using the thought model we get a single thought by using the passed in parameter ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thoughts with that ID' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    // using the thought model we create a thought by using the passed in data in the body of the request
    // then we used the user model to find the user that has matching username and add thought ID  into the user data
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughts) => {
                return User.findOneAndUpdate(
                    { username: thoughts.username },
                    { $addToSet: { thoughts: thoughts._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thought created, but found no user with that ID',
                    })
                    : res.json('Created the Thought')
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // using the thought model we find a thought using the id passed in the parameter and delete that thought
    // also using the user model we use delete the thought id in user's thoughts array. we are able to find the user related to this thought
    // by using the username that we got from the thought's data
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : User.findOneAndUpdate(
                        { username: thoughts.username },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { runValidators: true, new: true }
                    )
                        .then((user) =>
                            !user
                                ? res.status(404).json({ message: 'No user found with that username :(' })
                                : res.json(user)
                        )
            )
            .catch((err) => res.status(500).json(err));
    },
    //using the thought model we  update a thought data by searching for the thought with the passed in ID in the parameter
    // then we set the thought using the data passed in the body of the request
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    // using the thought model we find a thought by using the id passed in the parameter then using the data that was passed in the body
    // to add the reaction to the thought data 
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .then((thoughts) =>
            !thoughts
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
    // using the thought model we find a thought by using the id passed in the parameter then using the id that was passed in the 2nd parameter
    // we find the reaction with the same ID and remove that from the array of reactions in our thought data 

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId, 'reactions.reactionId': req.params.reactionId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thoughts) =>
            !thoughts
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },

};

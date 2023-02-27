const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getThought(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Get a user
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
    // Create a User
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
    // Delete a User
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
    //Update a thought
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thoughts) =>
          !thoughts
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },

    //   addFriend(req, res) {
    //     User.findOneAndUpdate(
    //       { _id: req.params.userId },
    //       { $addToSet: { friends: req.params.friendId } },
    //       { runValidators: true, new: true }
    //     )
    //       .then((user) =>
    //         !user
    //           ? res
    //               .status(404)
    //               .json({ message: 'No student found with that ID :(' })
    //           : res.json(user)
    //       )
    //       .catch((err) => res.status(500).json(err));
    //   },
    //   removeFriend(req, res) {
    //     User.findOneAndUpdate(
    //       { _id: req.params.userId },
    //       { $pull: { friends: req.params.friendId } },
    //       { runValidators: true, new: true }
    //     )
    //     .then((user) =>
    //         !user
    //             ? res
    //                 .status(404)
    //                 .json({ message: 'No user found with that ID :(' })
    //             : res.json(user)
    //     )
    //     .catch((err) => res.status(500).json(err));
    //   },

  };
  
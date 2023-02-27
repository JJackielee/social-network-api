const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    // addFriend,
    // removeFriend
} = require('../../controllers/thoughtController');

router.route('/').get(getThought).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

//router.route('/:userId/friends/:friendId').put(addFriend).delete(removeFriend);

module.exports = router;
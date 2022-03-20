const router = require('express').Router();

const { get } = require('express/lib/response');
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
} = require('../../controllers/users-controller.js');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUserById).put(updateUser).delete(removeUser);

router.route('/:id/friends/:friendsId').get(getUserById).post(addFriend).delete(removeFriend)

module.exports = router;

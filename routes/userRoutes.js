const express = require('express');
const { getUsers, createUser, deleteUser,updateUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.put('/:id',updateUser);

module.exports = router;

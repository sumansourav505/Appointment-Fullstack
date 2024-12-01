const User = require('../models/User');

// Get All Users
exports.getUsers = (req, res) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(error => res.status(500).json({ error: 'Failed to retrieve users' }));
};

// Create User
exports.createUser = (req, res) => {
  const { username, email, phone } = req.body;
  User.create({ username, email, phone })
    .then(newUser => res.status(201).json(newUser))
    .catch(error => res.status(400).json({ error: 'Failed to create user' }));
};
//Edit User
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { username, email, phone } = req.body;
  
    User.update({ username, email, phone }, { where: { id } })
      .then(() => res.json({ message: 'User updated successfully' }))
      .catch(error => res.status(500).json({ error: 'Failed to update user' }));
};

// Delete User
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  User.destroy({ where: { id } })
    .then(() => res.json({ message: 'User deleted successfully' }))
    .catch(error => res.status(500).json({ error: 'Failed to delete user' }));
};

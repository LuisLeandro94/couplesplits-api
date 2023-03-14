const router = require('express-promise-router')();
const userController = require('../controllers/users.controller');
const authenticate = require('../middleware/index');

// CRUD Routes
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);

module.exports = router;

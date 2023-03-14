const router = require('express-promise-router')();
const groupsController = require('../controllers/groups.controller');
const authenticate = require('../middleware/index');

// CRUD Routes
router.post('/groups', groupsController.createGroup);
router.get('/groups', groupsController.getAllGroups);
router.get('/groups/:id', groupsController.getGroupById);

module.exports = router;

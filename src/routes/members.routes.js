const router = require('express-promise-router')();
const membersController = require('../controllers/members.controller');
const authenticate = require('../middleware/index');

// CRUD Routes
router.post('/members', membersController.MakeUserMember);
router.get('/members', membersController.GetUserGroups);
router.get('/members/:id', membersController.GetGroupMembers);
router.delete('/members/:id', membersController.LeaveGroup);

module.exports = router;

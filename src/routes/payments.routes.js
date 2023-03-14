const router = require('express-promise-router')();
const paymentsController = require('../controllers/payments.controller');
const authenticate = require('../middleware/index');

// CRUD Routes
router.post('/payments', paymentsController.MakePayment);
router.get('/payments', paymentsController.ListUserPayments);
router.get('/payments/:id', paymentsController.ListExpensePayments);

module.exports = router;

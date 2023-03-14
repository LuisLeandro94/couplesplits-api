const router = require('express-promise-router')();
const expensesController = require('../controllers/expenses.controller');
const authenticate = require('../middleware/index');

// CRUD Routes
router.post('/expenses', expensesController.NewExpense);
router.get('/expense', expensesController.ListAllGroupExpenses);
router.delete('/expenses/:id', expensesController.DeleteExpense);

module.exports = router;

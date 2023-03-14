const express = require('express');
const cors = require('cors');

const app = express();

// Routes
const index = require('./routes/index');
const usersRoutes = require('./routes/users.routes');
const membersRoutes = require('./routes/members.routes');
const groupsRoutes = require('./routes/groups.routes');
const expensesRoutes = require('./routes/expenses.routes');
const paymentsRoutes = require('./routes/payments.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', [
	usersRoutes,
	membersRoutes,
	groupsRoutes,
	expensesRoutes,
	paymentsRoutes,
]);

module.exports = app;

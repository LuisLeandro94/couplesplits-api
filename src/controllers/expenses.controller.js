const db = require('../config/database');

// Create new expense
exports.NewExpense = async (req, res) => {
	const { title, description, amount } = req.body;
	const groupId = req.params.id;
	const creationDate = new Date();

	const { rows } = await db.query(
		'INSERT INTO expenses (title, description, amount, date, groupid) VALUES ($1, $2, $3, $4, $5)',
		[title, description, amount, creationDate, groupId]
	);

	res.status(201).send({
		message: 'Expense successfuly created!',
		body: {
			expense: { title, description, amount, creationDate, groupId },
		},
	});
};

// List all expenses in a group
exports.ListAllGroupExpenses = async (req, res) => {
	const groupId = req.params.id;
	const response = await db.query('SELECT * FROM expenses WHERE groupid = $1', [
		groupId,
	]);
	res.status(200).send(response.rows);
};

// Delete an expense
exports.DeleteExpense = async (req, res) => {
	const expenseId = req.params.id;
	const response = await db.query('DELETE FROM expenses WHERE expenseid = $1', [
		expenseId,
	]);

	res.status(204);
};

// List all individual expenses
exports.GetIndividualExpense = async (req, res) => {
	const groupid = req.params.id;
	const groupMembers = await db.query(
		'SELECT COUNT(*) FROM members WHERE groupid = $1',
		[groupid]
	);
	const expenses = await db.query('SELECT * FROM expenses WHERE groupid = $1', [
		groupid,
	]);
	expenses.rows.forEach((element) => {
		element.individualValue = element.amount / groupMembers;
	});

	res.status(200).send(expenses.rows);
};

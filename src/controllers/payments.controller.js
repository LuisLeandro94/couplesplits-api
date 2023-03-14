const db = require('../config/database');

// Make a payment
exports.MakePayment = async (req, res) => {
	const { amount, uid } = req.body;
	const expenseid = req.params.id;

	const { rows } = db.query(
		'INSERT INTO payments (amountpaid, expenseid, paidby) VALUES ($1, $2, $3)',
		[amount, expenseid, uid]
	);

	res.status(201).send({
		message: 'Payment has been made!',
		body: {
			payment: { amountPaid: amount, expense: expenseid, paidBy: uid },
		},
	});
};

// List all payments made by user
exports.ListUserPayments = async (req, res) => {
	const { uid } = req.body;

	const { rows } = db.query('SELECT * FROM payments WHERE paidby = $1', [uid]);

	res.status(200).send(rows);
};

// List all payments made for an expense
exports.ListExpensePayments = async (req, res) => {
	const expenseid = req.params.id;

	const { rows } = db.query('SELECT * FROM payments WHERE expenseid = $1', [
		expenseid,
	]);

	res.status(200).send(rows);
};

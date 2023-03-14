const db = require('../config/database');

// Create user
exports.createUser = async (req, res) => {
	const { name, email } = req.body;
	const exists = await db.query('SELECT * FROM users WHERE email = $1', [
		email,
	]);

	if (exists.rowCount !== 0) {
		res.status(409).send({ message: 'Email already exists!' });
	} else {
		const { rows } = await db.query(
			'INSERT INTO users (name, email) VALUES ($1, $2)',
			[name, email]
		);
	}

	res.status(201).send({
		message: 'User added successfully!',
		body: {
			user: { name, email },
		},
	});
};

// Retrieve all users
exports.getAllUsers = async (req, res) => {
	const response = await db.query('SELECT * FROM users');
	res.status(200).send(response.rows);
};

// Get user by user ID
exports.getUserById = async (req, res) => {
	const userID = parseInt(req.params.id);
	const response = await db.query('SELECT * FROM users WHERE userid = $1', [
		userID,
	]);
	if (response.rowCount === 0) {
		res.status(404).send({ message: 'User not found!' });
	}
	res.status(200).send(response.rows);
};

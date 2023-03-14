const db = require('../config/database');

// Create group
exports.createGroup = async (req, res) => {
	const { name, uid } = req.body;
	const exists = await db.query(
		'SELECT * FROM groups WHERE name = $1 AND createdby = $2',
		[name, uid]
	);

	if (exists.rowCount !== 0) {
		res
			.status(409)
			.send({ message: 'User already has created a group with that name!' });
	} else {
		const { rows } = await db.query(
			'INSERT INTO groups (name, createdby) VALUES ($1, $2)',
			[name, uid]
		);
	}

	res.status(201).send({
		message: 'Group created successfully!',
		body: {
			user: { name, uid },
		},
	});
};

// Retrieve all groups
exports.getAllGroups = async (req, res) => {
	const response = await db.query('SELECT * FROM groups');
	res.status(200).send(response.rows);
};

// Get group by group ID
exports.getGroupById = async (req, res) => {
	const groupID = parseInt(req.params.id);
	const response = await db.query('SELECT * FROM groups WHERE groupid = $1', [
		groupID,
	]);
	if (response.rowCount === 0) {
		res.status(404).send({ message: 'Group not found!' });
	}
	res.status(200).send(response.rows);
};

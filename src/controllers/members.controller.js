const db = require('../config/database');

// Tornar user membro de grupo
exports.MakeUserMember = async (req, res) => {
	const { uid, groupId } = req.body;
	const isMember = await db.query(
		'SELECT * FROM members WHERE userid = $1 AND groupid = $2',
		[uid, groupId]
	);

	if (isMember.rowCount !== 0) {
		res.status(409).send({ message: 'User already member of this group!' });
	} else {
		const { rows } = await db.query(
			'INSERT INTO members (userid, groupid) VALUES ($1, $2)',
			[uid, groupId]
		);
	}

	res.status(201).send({
		message: 'User is now a part of the group!',
		body: {
			member: { uid, groupId },
		},
	});
};

// Listar todos os grupos de um user
exports.GetUserGroups = async (req, res) => {
	const { uid } = req.body;
	const { rows } = await db.query('SELECT * FROM members WHERE userid = $1', [
		uid,
	]);

	res.status(200).send(response.rows);
};

// Listar todos os elementos de um grupo
exports.GetGroupMembers = async (req, res) => {
	const groupId = parseInt(req.params.id);
	const { rows } = await db.query('SELECT * FROM members WHERE groupid = $1', [
		groupId,
	]);

	res.status(200).send(response.rows);
};

// Tirar user de um grupo
exports.LeaveGroup = async (req, res) => {
	const { uid } = req.body;
	const groupId = parseInt(req.params.id);
	const { rowCount } = await db.query(
		'SELECT * FROM members WHERE userid = $1 AND groupid = $2',
		[uid, groupId]
	);

	if (rowCount === 0) {
		res.status(404).send({ message: 'User not in the group!' });
	} else {
		const { rows } = await db.query(
			'DELETE FROM members WHERE userid = $1 AND groupid = $2',
			[uid, groupId]
		);
	}

	res.status(204);
};

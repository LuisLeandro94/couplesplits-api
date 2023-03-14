const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Database connection
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
	console.log('Database successfuly connected!');
});

module.exports = {
	query: (text, params) => pool.query(text, params),
};

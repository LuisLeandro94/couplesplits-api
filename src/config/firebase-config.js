var admin = require('firebase-admin');

var serviceAccount = require('./ServiceAccount.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

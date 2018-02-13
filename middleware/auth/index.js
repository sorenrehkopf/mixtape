const jwtSimple = require('jwt-simple');
const { restrictedRoutes } = require('./routes.js');
const { User } = require('../../models/index.js');

const authenticate = async(req, res, next) => {
	const { headers: { authtoken}, path } = req;

	if (!isRestricted(path)) {
		next();
		return;
	}

	if (!authtoken) {
		res.status(403).send('You are not authorized to access that resource');
		return;
	};

	try {
		const { id } = jwtSimple.decode(authtoken, process.env.AUTH_TOKEN_SECRET);
		const user = await User.findById(id);

		req.user = user.dataValues;

		next();
	} catch(error) {
		console.log('Error: Could not get user from headers.');
		res.status(403).send('You are not authorized to access that resource');
	}
};

const isRestricted = path => {
	const route = restrictedRoutes.find(({ controller }) => path === `/api/${controller}`);
	
	if (route) {
		return !route.exceptions || !route.exceptions.some(exception => path.endsWith(exception));
	}

	return false;
};

module.exports = authenticate;
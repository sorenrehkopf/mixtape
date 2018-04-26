const { Tag } = require('../models/index.js');
const { Op } = require('sequelize');

class QueryBuilder {
	static build({ params: { include, exclude }, user }) {
		console.log('the params!!', include.tags, exclude.tags);
		const includeTags = {
			[Op.or]: {}
		};
		for (let tag in include.tags) {
			includeTags[Op.or][tag] = {
				// [Op.or]: ['true', '6', '7', '8', '9', '10']
			};
		};

		// for (let tag in exclude.tags) {
		// 	includeTags[Op.not][tag] = {
		// 		[Op.or]: ['true', '6', '7', '8', '9', '10']
		// 	};
		// };

		return {
			where: {
				userId: user.id,
				tags: {
					[Op.not]: {
						[Op.contains]: Object.keys(exclude.tags)
					}
				}
			}
		}
	}
};

module.exports = QueryBuilder;
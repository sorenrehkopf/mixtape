const { Tag } = require('../models/index.js');
const { Op } = require('sequelize');

class QueryBuilder {
	static get defaultTypes() {
		return [
			'albumName',
			'artistName',
			'danceability',
			'energy',
			'key',
			'loudness',
			'name',
			'tempo',
			'valence'
		];
	}

	static build({ params: { include, exclude }, user }) {
		const tagsOperator = include.tagsExclusive ? Op.and : Op.or;
		const tags = {
			[tagsOperator]: {}
		};

		for (let tag in include.tags) {
			tags[tagsOperator][tag] = {
				[Op.or]: ['true', '6', '7', '8', '9', '10']
			};
		};

		return {
			where: {
				userId: user.id,
				tags
			}
		}
	}
};

module.exports = QueryBuilder;
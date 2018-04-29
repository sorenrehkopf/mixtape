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

	static get operators() {
		return {
			strict_equivalence_text: {
				operator: Op.eq,
				numOfArgs: 1
			},
			loose_equivalence: {
				operator: Op.ilike,
				numOfArgs: 1
			},
			between: {
				operator: Op.between,
				numOfArgs: 2
			},
			greater_than: {
				operator: Op.gt,
				numOfArgs: 1
			},
			less_than: {
				operator: Op.lt,
				numOfArgs: 1
			},
			strict_equivalence_numeric: {
				operator: Op.eq,
				numOfArgs: 1
			}
		}
	}

	// takes the given parameters and creates a sequelize
	// query object to return results based on those params
	static build({ params: { include, exclude }, user }) {
		const { defaultTypes, operators } = this;
		const tagsOperator = include.tagsExclusive ? Op.and : Op.or;
		const includeParamsOperator = include.paramsExclusive ? Op.and : Op.or;
		const excludeParamsOperator = exclude.paramsExclusive ? Op.and : Op.or;
		
		const tagsQuery = {
			[tagsOperator]: {}
		};

		const includeParamsQuery = {
			[includeParamsOperator]: {
				tags: {}
			}
		};

		const excludeParamsQuery = {
			[Op.not]: {
				[excludeParamsOperator]: {

				}
			}
		};

		for (let param in include.params) {
			console.log(param, include.params[param]);
			const { type, value0, value1 } = include.params[param];
			const defaultValue = defaultTypes.find(type => {
				return new RegExp(param, 'i').test(type);
			});

			const { operator, numOfArgs } = operators[type];
			const formattedParam = {
				[operator]: numOfArgs > 1 ? [value0, value1] : value0 
			};

			if (defaultValue) {
				includeParamsQuery[includeParamsOperator][defaultValue] = formattedParam;
			} else{
				includeParamsQuery[includeParamsOperator].tags[param] = formattedParam;
			}
		}

		console.log(includeParamsQuery);

		for (let tag in include.tags) {
			tagsQuery[tagsOperator][tag] = {
				[Op.or]: ['true', '6', '7', '8', '9', '10']
			};
		};

		return {
			where: {
				userId: user.id,
				...includeParamsQuery,
				...excludeParamsOperator,
				tags: tagsQuery
			}
		}
	}
};

module.exports = QueryBuilder;
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

	static deriveValuesFromRange({value0, value1, inclusive, step = 0.1}) {
		const values = inclusive ? [value0, value1] : [];
		for (let i = value0; i < value1; i+=step) {
			values.push(i);
		}
		return values;
	}

	static get operators() {
		const { deriveValuesFromRange } = this;
		return {
			loose_equivalence: {
				operator: Op.iLike,
				getValue: value0 => `%${value0}%`
			},
			between: {
				operator: Op.between,
				getValue: (value0, value1)=> ([value0, value1])
			},
			greater_than: {
				operator: Op.gt,
				getValue: value0 => value0
			},
			less_than: {
				operator: Op.lt,
				getValue: value0 => value0
			},
			strict_equivalence_numeric: {
				operator: Op.eq,
				getValue: value0 => value0
			}
		}
	}

	// takes the given parameters and creates a sequelize
	// query object to return results based on those params
	static build({ params: { include, exclude }, user }) {
		const { defaultTypes, operators } = this;
		const includeTagsOperator = include.tagsExclusive ? Op.and : Op.or;
		const includeParamsOperator = include.paramsExclusive ? Op.and : Op.or;
		const excludeTagsOperator = exclude.tagsExclusive ? Op.and : Op.or;
		const excludeParamsOperator = exclude.paramsExclusive ? Op.and : Op.or;
		
		const includeQuery = {};
		const excludeQuery = {};

		if (Object.keys(include.params).length) {
			includeQuery[includeParamsOperator] = {
				tags: {
					[includeParamsOperator]: {}
				}
			}
		};

		if (Object.keys(include.tags).length && !includeQuery[includeTagsOperator]){
			includeQuery[includeTagsOperator] = {
				tags: {
					[includeTagsOperator]: {}
				}
			};
		};

		// if (Object.keys(exclude.tags).length || Object.keys(exclude.params).length) {
		// 	excludeQuery = {};
		// }

		if (Object.keys(exclude.params).length) {
			excludeQuery[excludeParamsOperator] = {
				tags: {
					[excludeParamsOperator]: {}
				}
			}
		};

		if (Object.keys(exclude.tags).length && !excludeQuery[excludeTagsOperator]){
			excludeQuery[excludeTagsOperator] = {
				tags: {
					[excludeTagsOperator]: {}
				}
			};
		};

		for (let param in include.params) {
			const { type, value0, value1 } = include.params[param];
			const defaultValue = defaultTypes.find(type => {
				return new RegExp(`^${param}$`, 'i').test(type);
			});

			const { operator, getValue } = operators[type];

			if (defaultValue) {
				includeQuery[includeParamsOperator][defaultValue] = {
					[operator]: getValue(value0, value1)
				};
			} else{
				includeQuery[includeParamsOperator].tags[includeParamsOperator][param] = {
					numericValue: {
						[operator]: getValue(value0, value1)
					}
				};
			}
		}

		for (let tag in include.tags) {
			includeQuery[includeTagsOperator].tags[includeTagsOperator][tag] = {
				boolValue: true
			};
		};

		for (let param in exclude.params) {
			console.log('the param!', param, exclude.params[param]);
			const { type, value0, value1 } = exclude.params[param];
			const defaultValue = defaultTypes.find(type => {
				return new RegExp(`^${param}$`, 'i').test(type);
			});

			const { operator, getValue } = operators[type];

			if (defaultValue) {
				excludeQuery[excludeParamsOperator][defaultValue] = {
					[operator]: getValue(value0, value1)
				};
			} else{
				excludeQuery[excludeParamsOperator].tags[excludeParamsOperator][param] = {
					numericValue: {
						[operator]: getValue(value0, value1)
					}
				};
			}
		}

		for (let tag in exclude.tags) {
			excludeQuery[excludeTagsOperator].tags[excludeTagsOperator][tag] = {
				boolValue: true
			};
		};

		const query = {
			[Op.and]: {
				userId: user.id,
				...includeQuery
			}
		};
		console.log('the exclude!!', excludeQuery);
		if (Object.keys(exclude.tags).length || Object.keys(exclude.params).length) {
			QueryBuilder[Op.not] = excludeQuery;
		};

		console.log(query);

		return {
			where: query,	
			raw: true
		}
	}
};

module.exports = QueryBuilder;
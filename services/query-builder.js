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
			strict_equivalence_text: {
				operator: Op.eq,
				getValue: value0 => value0
			},
			loose_equivalence: {
				operator: Op.ilike,
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
		const tagsOperator = include.tagsExclusive ? Op.and : Op.or;
		const includeParamsOperator = include.paramsExclusive ? Op.and : Op.or;
		const excludeParamsOperator = exclude.paramsExclusive ? Op.and : Op.or;
		
		const tagsQuery = {
			[tagsOperator]: {}
		};

		const includeParamsQuery = {
			[includeParamsOperator]: {
				tags: {
					[includeParamsOperator]: {}
				}
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

			const { operator, getValue } = operators[type];

			if (defaultValue) {
				includeParamsQuery[includeParamsOperator][defaultValue] = {
					[operator]: getValue(value0, value1)
				};
			} else{
				includeParamsQuery[includeParamsOperator].tags[includeParamsOperator][param] = {
					numericValue: {
						[operator]: getValue(value0, value1)
					}
				};
			}
		}

		console.log('the query obj', includeParamsQuery);

		for (let tag in include.tags) {
			tagsQuery[tagsOperator][tag] = {
				[Op.contains]: {
					boolValue: true
				}
			};
		};

		return {
			where: {
				userId: user.id,
				...includeParamsQuery,
				...excludeParamsOperator,
				tags: tagsQuery
			},
			raw: true
		}
	}
};

module.exports = QueryBuilder;
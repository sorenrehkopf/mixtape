const { Tag } = require('../models/index.js');
const { Op } = require('sequelize');

class QueryBuilder {
	static get defaultTypes() {
		return [
			'acousticness',
			'albumName',
			'artistName',
			'danceability',
			'energy',
			'instrumentalness',
			'key',
			'loudness',
			'name',
			'spotifyId',
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
			strict_equivalence: {
				operator: Op.eq,
				getValue: value0 => value0
			},
			loose_equivalence: {
				operator: Op.iLike,
				getValue: value0 => `%${value0}%`
			},
			loose_inequivalence: {
				operator: Op.notILike,
				getValue: value0 => `%${value0}%`
			},
			not_between: {
				operator: Op.notBetween,
				getValue: (value0, value1)=> ([value0, value1])
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
		const includeTagsAndParamsOperator = Op.and;
		
		const includeQuery = {
			[includeTagsAndParamsOperator]: {}
		};

		if (!Object.keys(include.params).length && !Object.keys(include.tags).length && !Object.keys(exclude.tags).length) {
			return;
		}

		if (Object.keys(include.params).length) {
			includeQuery[includeTagsAndParamsOperator][includeParamsOperator] = {}
		};

		if (Object.keys(include.tags).length){
			includeQuery[includeTagsAndParamsOperator].tags = {
				[includeTagsOperator]: {}
			};
		};

		for (let param in include.params) {
			const { type, value0, value1 } = include.params[param];
			const defaultValue = defaultTypes.find(type => new RegExp(`^${param}$`, 'i').test(type));

			const { operator, getValue } = operators[type];

			if (defaultValue) {
				includeQuery[includeTagsAndParamsOperator][includeParamsOperator][defaultValue] = {
					[operator]: getValue(value0, value1)
				};
			} else{
				if (!includeQuery[includeTagsAndParamsOperator].tags) {
					includeQuery[includeTagsAndParamsOperator].tags = {
						[includeParamsOperator]: {}
					}
				}
				includeQuery[includeTagsAndParamsOperator].tags[includeParamsOperator][param] = {
					numericValue: {
						[operator]: getValue(value0, value1)
					}
				};
			}
		}

		for (let tag in include.tags) {
			includeQuery[includeTagsAndParamsOperator].tags[includeTagsOperator][tag] = {
				boolValue: true
			};
		};

		const query = {
			[Op.and]: {
				userId: user.id,
				...includeQuery
			}
		};

		return query;
	}
};

module.exports = QueryBuilder;
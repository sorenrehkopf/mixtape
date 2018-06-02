const { Tag } = require('../models/index.js');
const { Op } = require('sequelize');

class QueryBuilder {
	static get defaultTypes() {
		return [
			{
				tagName: 'ACOUSTICNESS',
				dbName: 'acousticness',
			},
			{
				tagName: 'ALBUM NAME',
				dbName: 'albumName',
			},
			{
				tagName: 'ARTIST NAME',
				dbName: 'artistName',
			},
			{
				tagName: 'ADDED',
				dbName: 'createdAt',
			},
			{
				tagName: 'DANCEABILITY',
				dbName: 'danceability',
			},
			{
				tagName: 'ENERGY',
				dbName: 'energy',
			},
			{
				tagName: 'INSTRUMENTALNESS',
				dbName: 'instrumentalness',
			},
			{
				tagName: 'KEY',
				dbName: 'key',
			},
			{
				tagName: 'LOUDNESS',
				dbName: 'loudness',
			},
			{
				tagName: 'NAME',
				dbName: 'name',
			},
			{
				tagName: 'SPOTIFYID',
				dbName: 'spotifyId',
			},
			{
				tagName: 'TEMPO',
				dbName: 'tempo',
			},
			{
				tagName: 'VALENCE',
				dbName: 'valence',
			},
		];
	}

	static get friendlyText() {
		return {
			loose_equivalence:{
				displayValue: 'is like (text)',
				inputTypes: ['text']
			},
			loose_inequivalence:{
				displayValue: 'is not like (text)',
				inputTypes: ['text']
			},
			between:{
				displayValue: 'is between',
				inputTypes: ['number', 'number']
			},
			not_between:{
				displayValue: 'is not between',
				inputTypes: ['number', 'number']
			},
			greater_than:{
				displayValue: 'is greater than',
				inputTypes: ['number']
			},
			after: {
				displayValue: 'since',
				inputTypes: ['date']
			},
			before: {
				displayValue: 'before',
				inputTypes: ['date']
			},
			in_time_range: {
				displayValue: 'in time range',
				inputTypes: ['date', 'date']
			},
			less_than:{
				displayValue: 'is less than',
				inputTypes: ['number']
			},
			strict_equivalence_numeric:{
				displayValue: 'is exactly (numeric)',
				inputTypes: ['number']
			}
		};
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
			after: {
				operator: Op.gt,
				getValue: value0 => value0
			},
			before: {
				operator: Op.lt,
				getValue: value0 => value0
			},
			in_time_range: {
				operator: Op.between,
				getValue: (value0, value1)=> ([value0, value1])
			},
			strict_equivalence_numeric: {
				operator: Op.eq,
				getValue: value0 => value0
			}
		}
	}

	static getQueryDescription(query) {
		const { friendlyText } = this;
		const includeTagNames = Object.keys(query.include.tags).join(', ');
		const includeParamDescriptions = Object.keys(query.include.params).map(name => {
			const param = query.include.params[name];
			return `${name} ${friendlyText[param.type].displayValue} ${param.value0}${param.value1 ? ` and ${param.value1}` : ''}`;
		}).join(', ');
		const excludeTagNames = Object.keys(query.exclude.tags).join(', ');

		return `${includeTagNames ? `${includeTagNames}. ` : ''}${includeParamDescriptions ? `${includeParamDescriptions}. ` : ''}${excludeTagNames? `Not ${excludeTagNames}.`: ''}`;
	}

	static deriveValuesFromRange({value0, value1, inclusive, step = 0.1}) {
		const values = inclusive ? [value0, value1] : [];
		for (let i = value0; i < value1; i+=step) {
			values.push(i);
		}
		return values;
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
			return {
				userId: user.id
			};
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
			const defaultValue = defaultTypes.find(type => new RegExp(`^${param}$`, 'i').test(type.tagName));

			const { operator, getValue } = operators[type];
			if (defaultValue) {
				includeQuery[includeTagsAndParamsOperator][includeParamsOperator][defaultValue.dbName] = {
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
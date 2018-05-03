export const defaultQueryFields = [
	{
		name: 'ALBUMNAME'
	},
	{
		name: 'ARTISTNAME'
	},
	{
		name: 'DANCEABILITY'
	},
	{
		name: 'ENERGY'
	},
	{
		name: 'KEY'
	},
	{
		name: 'LOUDNESS'
	},
	{
		name: 'NAME'
	},
	{
		name: 'TEMPO'
	},
	{
		name: 'VALENCE'
	}
];

export const paramTypes = {
	loose_equivalence:{
		displayValue: 'is roughly (text)',
		inputTypes: ['text']
	},
	between:{
		displayValue: 'is between',
		inputTypes: ['number', 'number']
	},
	greater_than:{
		displayValue: 'is greater than',
		inputTypes: ['number']
	},
	less_than:{
		displayValue: 'is less than',
		inputTypes: ['number']
	},
	strict_equivalence_numeric:{
		displayValue: 'is exactly (numeric)',
		inputTypes: ['number']
	}
}
export const defaultQueryFields = {
	
};

export const paramTypes = {
	strict_equivalence_text:{
		displayValue: 'is',
		inputTypes: ['text']
	},
	loose_equivalence:{
		displayValue: 'is similar to',
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
		displayValue: 'is exactly',
		inputTypes: ['number']
	}
}
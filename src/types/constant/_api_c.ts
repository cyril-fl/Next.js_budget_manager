export const API_TABLE_LABEL = [
	'auth',
	// 'expenses',
	// 'incomes',
	'months',
	'transactions',
	'years',
	'yearlyResume',
] as const;

export const API_OPTIONS_KEYS = [
	'filter',
	'maxRecords',
	'pageSize',
	'offset',
	'sort',
];

export const API_FORMULA_FILTER = ['AND', 'OR'] as const;

export const API_FORMULA_TRANSFORMATION = [
	// 'FIND',
	// 'LEFT',
	// 'LOWER',
	// 'REGEX_EXTRACT',
] as const;

export const API_FORMULA_ARRAY = [
	'GROUP_BY',
	// 'ARRAYJOIN',
] as const;

export const API_FORMULA_NAME = [
	...API_FORMULA_FILTER,
	...API_FORMULA_TRANSFORMATION,
	...API_FORMULA_ARRAY,
];

export const API_FORMULA_OPERATOR_NAME = [
	'eq',
	'ne',
	'sne',
	'gt',
	'lt',
	'gte',
	'lte',
] as const;

export const API_FORMULA_OPERATOR_SYMBOL = [
	'=',
	'!=',
	'>',
	'<',
	'>=',
	'<=',
] as const;

export const ComparisonSymbol = {
	eq: '=',
	ne: '!=',
	sne: '!==',
	gt: '>',
	lt: '<',
	gte: '>=',
	lte: '<=',
} as const;

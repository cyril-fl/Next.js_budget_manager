export const API_TABLE = [
	'auth',
	'expenses',
	'flux',
	'incomes',
	'months',
	'years',
] as const;

export const API_OPTIONS_KEYS = [
	'filter',
	'maxRecords',
	'pageSize',
	'offset',
	'sort',
];

export const API_FORMULA_FILTER = [
	'AND',
	'ARRAYJOIN',
	'FIND',
	'LEFT',
	'LOWER',
	'OR',
	'REGEX_EXTRACT',
] as const;

export const API_FORMULA_OPERATOR = [
	'eq',
	'ne',
	'sne',
	'gt',
	'lt',
	'gte',
	'lte',
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

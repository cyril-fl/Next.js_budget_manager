export const METHODS_BY_CATEGORY = {
	filter: ['AND', 'OR'],
	transform: [],
	array: [],
} as const;
export const METHODS = [
	...METHODS_BY_CATEGORY.filter,
	...METHODS_BY_CATEGORY.transform,
	...METHODS_BY_CATEGORY.array,
] as const;

export const OPERATOR_NAME = [
	'eq',
	'seq',
	'ne',
	'sne',
	'gt',
	'lt',
	'gte',
	'lte',
] as const;
export const OPERATOR_SYMBOL = [
	'=',
	'==',
	'!=',
	'!==',
	'>',
	'<',
	'>=',
	'<=',
] as const;

export const OPERATOR_SYMBOL_COMPARISON = {
	'=': 'eq',
	'==': 'seq',
	'!=': 'ne',
	'!==': 'sne',
	'>': 'gt',
	'<': 'lt',
	'>=': 'gte',
	'<=': 'lte',
} as const;

export const OPTIONS_KEYS = [
	'filter',
	'sort',
	'fields',
	'limit',
	'offset',
	'pageSize',
] as const;

export const PRIVATE_LABELS = [] as const;

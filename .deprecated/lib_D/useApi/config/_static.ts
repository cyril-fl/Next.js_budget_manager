const OPERATOR = {
	name: ['eq', 'seq', 'ne', 'sne', 'gt', 'lt', 'gte', 'lte'] as const,
	symbol: ['=', '==', '!=', '!==', '>', '<', '>=', '<='] as const,
} as const;
export const OPTIONS_KEYS = [
	'filter',
	'maxRecords',
	'pageSize',
	'offset',
	'sort',
] as const;

export const staticConfig = {
	operator: {
		name: OPERATOR.name,
		symbol: OPERATOR.symbol,
		comparisonSymbol: {
			eq: '=',
			seq: '==',
			ne: '!=',
			sne: '!==',
			gt: '>',
			lt: '<',
			gte: '>=',
			lte: '<=',
		},
	},
	options: OPTIONS_KEYS,
} as const;

export type StaticConfig = typeof staticConfig;

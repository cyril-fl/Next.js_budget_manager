const availableMethod = {
	filter: ['AND', 'OR'],
	transform: [
		// 'FIND', 'LEFT', 'LOWER', 'REGEX_EXTRACT'
	],
	array: [
		'GROUP_BY',
		// 'ARRAYJOIN'
	],
} as const;

export const defaultConfig = {
	url: 'http://localhost:3000/api',
	path: {
		labels: [
			'auth',
			'calendar',
			'months',
			'monthlySummary',
			'transactions',
			'transactionSummary',
			'years',
			'yearlySummary',
		],
		routes: {
			auth: 'auth',
			calendar: 'calendar',
			months: 'months',
			monthlySummary: 'months/summary',
			transactions: 'transactions',
			transactionSummary: 'transactions/summary',
			years: 'years',
			yearlySummary: 'years/summary',
		},
	},
	formula: {
		filter: availableMethod.filter,
		transform: availableMethod.transform,
		array: availableMethod.array,
		name: [
			availableMethod.filter,
			availableMethod.transform,
			availableMethod.array,
		].flat(),
	},
} as const;

export type Config = typeof defaultConfig;
// export type LooseConfig = Omit<typeof defaultConfig, 'url' | 'pathLabel'> & {
// 	url: string;
// 	pathLabel: string[];
// };

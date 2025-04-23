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
			'transactions',
			'years',
			'yearlyResume',
		],
		routes: {
			auth: 'auth',
			calendar: 'calendar',
			months: 'months',
			transactions: 'transactions',
			years: 'years',
			yearlyResume: 'years/resume',
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

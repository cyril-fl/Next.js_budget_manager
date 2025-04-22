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
	pathLabel: ['auth', 'months', 'transactions', 'years', 'yearlyResume'],
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

// Imports
import { ApiDecodedParams } from '@/server/utilsApi';

// Define

// Utils
export function utilsPipeline(
	params: ApiDecodedParams,
	customOperators: Record<string, (value: any) => object> = {},
	order?: string[]
) {
	const operatorMap: Record<string, (value: any) => object> = {
		limit: (v) => ({ $limit: v }),
		offset: (v) => ({ $skip: v }),
		fields: (v) => ({ $project: v }),
		filter: (v) => ({ $match: v }),
		sort: (v) => ({ $sort: v }),
		...customOperators,
	};

	const temp = { ...params, ...customOperators };
	const keys = order ?? Object.keys(temp);

	return keys.reduce<object[]>((acc, key) => {
		const val = temp[key as keyof typeof temp];
		const fn = operatorMap[key];
		if (val !== undefined && fn) acc.push(fn(val));
		return acc;
	}, []);
}

// Imports
// Define

import { ApiDecodedParams } from '@/server/utilsApi';

// export function utilsPipeline(params: ApiDecodedParams) {
// 	console.log('utilsPipeline', params);
// 	const operatorMap: Record<string, (value: any) => object> = {
// 		limit: (value) => ({ $limit: value }),
// 		offset: (value) => ({ $skip: value }),
// 		fields: (value) => ({
// 			$project: Object.fromEntries(
// 				Object.entries(value).map(([field, include]) => [field, include])
// 			),
// 		}),
// 		filter: (value) => ({ $match: value }),
// 		sort: (value) => ({ $sort: value }),
// 	};
//
// 	return Object.entries(params).reduce<object[]>((pipeline, [key, value]) => {
// 		const operatorFn = operatorMap[key];
// 		if (operatorFn) pipeline.push(operatorFn(value));
// 		return pipeline;
// 	}, []);
// }

// export function utilsPipeline(
// 	params: ApiDecodedParams,
// 	customOperators: Record<string, (value: any) => object> = {},
// 	order?: string[]
// ) {
// 	const operatorMap: Record<string, (value: any) => object> = {
// 		limit: (v) => ({ $limit: v }),
// 		offset: (v) => ({ $skip: v }),
// 		fields: (v) => ({ $project: v }),
// 		filter: (v) => ({ $match: v }),
// 		sort: (v) => ({ $sort: v }),
// 		...Object.entries(customOperators).reduce(
// 			(acc, [key, fn]) => ({
// 				...acc,
// 				[key]: fn,
// 			}),
// 			{}
// 		),
// 	};
//
// 	console.log({ ...params, ...customOperators });
//
// 	const keys = order ?? Object.keys({ ...params, ...customOperators });
//
// 	return keys.reduce<object[]>((acc, key) => {
// 		const val = { ...params, ...customOperators }[
// 			key as keyof ApiDecodedParams
// 		];
// 		const fn = operatorMap[key];
// 		console.log('key', key, 'val', val, 'fn', fn);
// 		if (val !== undefined && fn) acc.push(fn(val));
// 		return acc;
// 	}, []);
// }

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
		...customOperators, // On ajoute les opérateurs personnalisés
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

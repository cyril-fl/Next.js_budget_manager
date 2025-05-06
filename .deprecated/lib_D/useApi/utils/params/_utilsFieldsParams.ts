// // Imports
// import { ApiParam } from '../../types';
//
// // Define
//
// export function utilsFieldsParams() {
// 	// Data
//
// 	// Methods
// 	function encodeFieldsParams() {}
//
// 	function decodeFieldsParams(params: ApiParam) {
// 		const fields = params.fields;
// 		if (!fields) return [];
//
// 		const fieldsArray = decodeURIComponent(fields).split(',');
// 		if (!fieldsArray.length) return [];
//
// 		return fieldsArray;
// 	}
//
// 	function decodeFieldsParamsNew(params: ApiParam) {
// 		const fields = params.fields;
// 		if (!fields) return {};
//
// 		const fieldsArray = decodeURIComponent(fields).split(',');
// 		if (!fieldsArray.length) return {};
//
// 		const projection: { [key: string]: 1 } = {};
// 		fieldsArray.forEach((field) => {
// 			projection[field] = 1;
// 		});
//
// 		return Object.keys(projection).reduce(
// 			(acc, key) => {
// 				acc[key] = `$$record.${key}`;
// 				return acc;
// 			},
// 			{} as Record<string, string>
// 		);
// 	}
//
// 	function applyFieldsParams<T extends object>(
// 		data: T[],
// 		fields: string[]
// 	): Partial<T>[] {
// 		if (!fields.length) return data;
//
// 		if (!data.every((item) => fields.every((field) => field in item))) {
// 			return [];
// 		}
//
// 		return data.map(
// 			(item) =>
// 				Object.fromEntries(
// 					Object.entries(item).filter(([key]) => fields.includes(key))
// 				) as Partial<T>
// 		);
// 	}
//
// 	// Return
// 	return {
// 		encodeFields: encodeFieldsParams,
// 		decodeFields: decodeFieldsParams,
// 		decodeFieldsNew: decodeFieldsParamsNew,
// 		applyFields: applyFieldsParams,
// 	};
// }

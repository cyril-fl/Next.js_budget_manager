// // Imports
// import { ApiParam } from '../../types';
//
// // Define
//
// export function utilsMaxRecordsParams() {
// 	// Data
// 	const defaultValue = 100;
//
// 	// Methods
// 	function encodeMaxRecordsParams() {}
//
// 	function decodeMaxRecordsParams(params: ApiParam) {
// 		const maxRecords = params.maxRecords;
// 		if (!maxRecords) return defaultValue;
//
// 		const maxRecordsParam = parseInt(maxRecords, 10);
// 		if (isNaN(maxRecordsParam)) return defaultValue;
//
// 		return maxRecordsParam;
// 	}
//
// 	function applyMaxRecordsParams<T extends object>(
// 		data: T[],
// 		maxRecordsParam: number | undefined
// 	) {
// 		return data.slice(0, maxRecordsParam || data.length);
// 	}
//
// 	// Return
// 	return {
// 		encodeMaxRecords: encodeMaxRecordsParams,
// 		decodeMaxRecords: decodeMaxRecordsParams,
// 		applyMaxRecords: applyMaxRecordsParams,
// 	};
// }

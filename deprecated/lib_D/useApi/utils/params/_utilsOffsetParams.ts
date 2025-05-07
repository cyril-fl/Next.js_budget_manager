// // Imports
// import { ApiParam } from '../../types';
//
// // Define
//
// export function utilsOffsetParams() {
// 	// Data
// 	const defaultValue = 0;
//
// 	// Methods
// 	function encodeOffsetParams() {}
//
// 	function decodeOffsetParams(params: ApiParam) {
// 		const offset = params.offset;
// 		if (!offset) return defaultValue;
//
// 		const offsetParam = parseInt(offset, 10);
// 		if (isNaN(offsetParam)) return defaultValue;
//
// 		return offsetParam;
// 	}
//
// 	/*	function applyOffsetParams<T extends object>(
// 		data: T[],
// 		offsetParam: number | undefined
// 	) {
// 		return data.slice(0, offsetParam || data.length);
// 	}*/
//
// 	// Return
// 	return {
// 		encodeOffset: encodeOffsetParams,
// 		decodeOffset: decodeOffsetParams,
// 		// applyOffset: applyOffsetParams,
// 	};
// }

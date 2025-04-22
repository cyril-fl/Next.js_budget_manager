// Imports
import { ApiParam } from '../../types';

// Define

export function utilsMaxRecordsParams() {
	// Data

	// Methods
	function encodeMaxRecordsParams() {}

	function decodeMaxRecordsParams(params: ApiParam) {
		const maxRecords = params.maxRecords;
		if (!maxRecords) return;

		const maxRecordsParam = parseInt(maxRecords, 10);
		if (isNaN(maxRecordsParam)) return;

		return maxRecordsParam;
	}

	function applyMaxRecordsParams<T extends object>(
		data: T[],
		maxRecordsParam: number | undefined
	) {
		return data.slice(0, maxRecordsParam || data.length);
	}

	// Return
	return {
		encodeMaxRecords: encodeMaxRecordsParams,
		decodeMaxRecords: decodeMaxRecordsParams,
		applyMaxRecords: applyMaxRecordsParams,
	};
}

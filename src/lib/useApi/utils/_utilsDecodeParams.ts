// Imports
import { utilsOffsetParams } from '@/lib/useApi/utils/params/_utilsOffsetParams';
import { ApiParam } from '..//types';
import {
	utilsFieldsParams,
	utilsFilterParams,
	utilsMaxRecordsParams,
	utilsSortParams,
} from './params/';

// Define

export function utilsRefineData<T extends object = object>(
	data: T[],
	params: ApiParam
) {
	// Data
	const { applyFilter, decodeFilter } = utilsFilterParams();
	const { applySort, decodeSort } = utilsSortParams();
	const { applyFields, decodeFields } = utilsFieldsParams();
	const { applyMaxRecords, decodeMaxRecords } = utilsMaxRecordsParams();

	// Transformation
	const filterParams = decodeFilter(params);
	const sortParams = decodeSort(params);
	const fieldsParams = decodeFields(params);
	const maxRecordsParam = decodeMaxRecords(params);

	// const filteredData = applyFilter(data, filterParams);
	const sortedData = applySort(data, sortParams);
	const extractedFields = applyFields(sortedData, fieldsParams);
	const maxedData = applyMaxRecords(extractedFields, maxRecordsParam);

	return maxedData;
}

export function utilsDecodeParams<T extends object = object>(params: ApiParam) {
	// Data
	const { decodeFilterNew } = utilsFilterParams();
	const { decodeSortNew } = utilsSortParams();
	const { decodeFieldsNew } = utilsFieldsParams();
	const { decodeMaxRecords } = utilsMaxRecordsParams();
	const { decodeOffset } = utilsOffsetParams();

	return {
		filterParams: decodeFilterNew(params),
		sortParams: decodeSortNew(params),
		fieldsParams: decodeFieldsNew(params),
		maxRecordsParam: decodeMaxRecords(params),
		offsetParam: decodeOffset(params),
	};
}

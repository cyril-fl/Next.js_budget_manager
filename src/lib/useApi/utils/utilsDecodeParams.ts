// Imports
import { utilsFieldsParams } from '@/lib/useApi/utils/params/utilsFieldsParams';
import { utilsFilterParams } from '@/lib/useApi/utils/params/utilsFilterParams';
import { utilsMaxRecordsParams } from '@/lib/useApi/utils/params/utilsMaxRecordsParams';
import { utilsSortParams } from '@/lib/useApi/utils/params/utilsSortParams';
import { Param } from '@types';

// Define

export function utilsRefineData<T extends object = object>(
	data: T[],
	params: Param
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

	const filteredData = applyFilter(data, filterParams);
	const sortedData = applySort(filteredData, sortParams);
	const extractedFields = applyFields(sortedData, fieldsParams);
	const maxedData = applyMaxRecords(extractedFields, maxRecordsParam);

	return maxedData;
}

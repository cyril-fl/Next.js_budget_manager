// Imports
import { utilsOffsetParams } from '@/lib_D/useApi/utils/params/_utilsOffsetParams';
import { Document } from 'mongodb';
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

export function utilsDecodeParams<T extends object = object>(
	params: ApiParam
): Document[] {
	// Data
	const { decodeFilterNew } = utilsFilterParams();
	const { decodeSortNew } = utilsSortParams();
	const { decodeFieldsNew } = utilsFieldsParams();
	const { decodeMaxRecords } = utilsMaxRecordsParams();
	const { decodeOffset } = utilsOffsetParams();

	const filterParams = decodeFilterNew(params);
	const sortParams = decodeSortNew(params);
	const fieldsParams = decodeFieldsNew(params);
	const maxRecordsParam = decodeMaxRecords(params);
	const offsetParam = decodeOffset(params);

	return [
		filterParams ? { $match: filterParams } : undefined,
		offsetParam ? { $skip: offsetParam } : undefined,
		maxRecordsParam ? { $limit: maxRecordsParam } : undefined,
		// sortParams ? { $sort: sortParams } : undefined,
		{
			$group: {
				_id: { year: '$year', month: '$month' },
				records: { $push: '$$ROOT' },
			},
		},
		fieldsParams
			? {
					$project: {
						_id: 1,
						records: {
							$map: {
								input: '$records',
								as: 'record',
								in: fieldsParams,
							},
						},
					},
				}
			: undefined,
	].filter(Boolean) as Document[];
}

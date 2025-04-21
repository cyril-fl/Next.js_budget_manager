// Imports
import { utilsDecodeParams } from '@api/utils/utilsDecode';
import { utilsFormula } from '@api/utils/utilsFormula';
import { utilsPrimitiveType } from '@api/utils/utilsPrimitiveType';
import { ApiSortParam, Param } from '@types';

// Define

export function apiDecodeParams() {
	// Data
	const { decodeFields, decodeFilter, decodeMaxRecords, decodeSort } =
		utilsDecodeParams();
	// const { evaluateFormula, transformFormula } = utilsFormulaEvaluator();
	const { applyFormula: handleFilterData } = utilsFormula();
	const { getComparableValue } = utilsPrimitiveType();

	// Methods

	function handleSortData<T extends object>(
		data: T[],
		sortParams: ApiSortParam[]
	): T[] {
		if (data.some((item) => sortParams.some(({ field }) => !(field in item)))) {
			return [];
		}
		return [...data].sort((a, b) => {
			for (const { field, direction } of sortParams) {
				const rawA = a[field as keyof T];
				const rawB = b[field as keyof T];

				const valA = getComparableValue(rawA);
				const valB = getComparableValue(rawB);

				if (valA == null && valB == null) continue;
				if (valA == null) return direction === 'asc' ? 1 : -1;
				if (valB == null) return direction === 'asc' ? -1 : 1;

				if (valA === valB) continue;

				const order = direction === 'asc' ? 1 : -1;
				return valA < valB ? -1 * order : 1 * order;
			}

			return 0;
		});
	}

	function handleExtractFieldsData<T extends object>(
		data: T[],
		fields: string[]
	): Partial<T>[] {
		if (!fields.length) return data;

		if (!data.every((item) => fields.every((field) => field in item))) {
			return [];
		}

		return data.map(
			(item) =>
				Object.fromEntries(
					Object.entries(item).filter(([key]) => fields.includes(key))
				) as Partial<T>
		);
	}

	function handleRefineData<T extends object>(data: T[], params: Param) {
		const filterParams = decodeFilter(params);
		const sortParams = decodeSort(params);
		const fieldsParams = decodeFields(params);
		const maxRecordsParam = decodeMaxRecords(params);

		console.log('filterParams', filterParams);

		const filteredData = handleFilterData(data, filterParams);
		const sortedData = handleSortData(filteredData, sortParams);
		const extractedFields = handleExtractFieldsData(sortedData, fieldsParams);
		const maxedData = extractedFields.slice(
			0,
			maxRecordsParam || extractedFields.length
		);

		return maxedData;
	}
	return {
		refineData: handleRefineData,
	};
}

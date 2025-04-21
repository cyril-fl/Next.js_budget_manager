// Import
import { utilsFormulaArray } from '@api/utils/utilsFormulaArray';
import { utilsFormulaFilter } from '@api/utils/utilsFormulaFilter';
import { utilsFormulaTransform } from '@api/utils/utilsFormulaTransform';
import {
	ApiConvertedFormula,
	ApiFormulaFilter,
	ApiFormulaTransform,
	API_FORMULA_ARRAY as fnArray,
	API_FORMULA_FILTER as fnFilter,
	API_FORMULA_TRANSFORMATION as fnTransform,
} from '@types';

// Define
export function utilsFormula() {
	// Data
	const { handleFormula: filterFormula } = utilsFormulaFilter();
	const { handleFormula: transformFormula } = utilsFormulaTransform();
	const { handleFormula: transformArray } = utilsFormulaArray();

	// Methods
	function applyFormula<T extends object>(
		data: T,
		filterParams?: ApiConvertedFormula
	) {
		if (!filterParams) return data;
		const normalizeData = Array.isArray(data) ? data : [data];

		const fn = filterParams.fn;
		const isFnFilter = fnFilter.includes(fn as ApiFormulaFilter);
		const isFnTransform = fnTransform.includes(fn as ApiFormulaTransform);
		const isFnArray = fnArray.includes(fn as ApiFormulaTransform);

		if (isFnFilter)
			return normalizeData.filter((item) => filterFormula(filterParams, item));
		if (isFnTransform)
			return normalizeData.map((item) => transformFormula(filterParams, item));
		if (isFnArray) return transformArray(filterParams, normalizeData);
		return data;
	}

	return {
		applyFormula,
	};
}

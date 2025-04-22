// Imports
import { utilsFormulaArray } from '@/lib/useApi/utils/utils/formula/utilsFormulaArray';
import { utilsFormulaFilter } from '@/lib/useApi/utils/utils/formula/utilsFormulaFilter';
import { utilsFormulaTransform } from '@/lib/useApi/utils/utils/formula/utilsFormulaTransform';
import {
	ApiConvertedFormula,
	ApiFormulaArray,
	ApiFormulaFilter,
	ApiFormulaTransform,
	API_FORMULA_ARRAY as fnArray,
	API_FORMULA_FILTER as fnFilter,
	API_FORMULA_TRANSFORMATION as fnTransform,
} from '@types';

// Define
export type FnRedirection = (
	formula: ApiConvertedFormula,
	item: object | object[]
) => boolean | object;

export function utilsRedirection() {
	// Data
	const { handleFormula: filterFormula } =
		utilsFormulaFilter(handleRedirection);
	const { handleFormula: transformFormula } =
		utilsFormulaTransform(handleRedirection);
	const { handleFormula: arrayFormula } = utilsFormulaArray(handleRedirection);

	// Methods
	function handleRedirection<T extends object>(
		formula: ApiConvertedFormula,
		item: T | T[]
	) {
		const fn = formula.fn;
		const isFnFilter = fnFilter.includes(fn as ApiFormulaFilter);
		const isFnTransform = fnTransform.includes(fn as ApiFormulaTransform);
		const isFnArray = fnArray.includes(fn as ApiFormulaArray);

		if (isFnFilter) return filterFormula(formula, item);
		if (isFnTransform) return transformFormula(formula, item);
		if (isFnArray && Array.isArray(item)) return arrayFormula(formula, item);

		return item;
	}

	return { handleRedirection };
}

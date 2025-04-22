// Imports
import {
	ApiConvertedFormula,
	ApiFormulaArray,
	ApiFormulaFilter,
	ApiFormulaTransform,
	fnArray,
	fnFilter,
	fnTransform,
} from '../../../types';
import {
	utilsFormulaArray,
	utilsFormulaFilter,
	utilsFormulaTransform,
} from '../formula';

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

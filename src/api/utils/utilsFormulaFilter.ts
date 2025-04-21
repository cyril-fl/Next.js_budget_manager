// Imports
import { utilsFormulaArray } from '@api/utils/utilsFormulaArray';
import { utilsFormulaOperator } from '@api/utils/utilsFormulaOperator';
import { utilsFormulaTransform } from '@api/utils/utilsFormulaTransform';
import {
	ApiConvertedArgument,
	ApiConvertedFormula,
	ApiFormulaFilter,
	ApiFormulaTransform,
	API_FORMULA_ARRAY as fnArray,
	API_FORMULA_FILTER as fnFilter,
	API_FORMULA_TRANSFORMATION as fnTransform,
} from '@types';

// Define

export function utilsFormulaFilter() {
	// Data
	const { handleFormula: transformFormula } = utilsFormulaTransform();
	const { handleFormula: transformArray } = utilsFormulaArray();

	const { evaluateOperator } = utilsFormulaOperator();

	const FunctionMap = {
		AND: fnAnd,
		OR: fnOr,
	} as const;

	// Methods
	function handleArguments<T extends object>(
		item: T,
		arg: ApiConvertedArgument
	): boolean | object {
		if (Array.isArray(arg)) {
			return arg.every((a) => handleArguments(item, a));
		}

		if ('fn' in arg) {
			return handleRedirection(arg, item);
		}

		const { l, r: right, symbol } = arg;
		const left =
			typeof l === 'string' ? item[l as keyof T] : handleRedirection(l, item);

		return evaluateOperator(symbol, left, right);
	}

	function handleRedirection<T extends object>(
		formula: ApiConvertedFormula,
		item: T
	) {
		const fn = formula.fn;
		const isFnFilter = fnFilter.includes(fn as ApiFormulaFilter);
		const isFnTransform = fnTransform.includes(fn as ApiFormulaTransform);
		const isFnArray = fnArray.includes(fn as ApiFormulaTransform);

		if (isFnFilter) return handleFormula(formula, item);
		if (isFnTransform) return transformFormula(formula, item);
		if (isFnArray) return transformArray(formula, item);

		return item;
	}

	function handleFormula<T extends object>(
		formula: ApiConvertedFormula,
		item: T
	): boolean {
		const { fn, args } = formula;
		const normalizedArgs = Array.isArray(args) ? args : [args];

		const logicFn = FunctionMap[fn as keyof typeof FunctionMap] as
			| ((args: ApiConvertedArgument[], item: T) => boolean)
			| undefined;

		return logicFn ? logicFn(normalizedArgs, item) : false;
	}

	// --- function ---
	function fnAnd<T extends object>(
		list: ApiConvertedArgument[],
		item: T
	): boolean {
		return list.every((arg) => handleArguments(item, arg));
	}

	function fnOr<T extends object>(
		list: ApiConvertedArgument[],
		item: T
	): boolean {
		return list.some((arg) => handleArguments(item, arg));
	}

	return { handleFormula };
}

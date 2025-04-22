// Imports
import { ApiConvertedArgument, ApiConvertedFormula } from '../../../types';

// Define

export function utilsFormulaTransform(redirect: any) {
	// Data
	const FunctionMap = {
		VOID: fnVoid,
	};

	// Methods

	function handleFormula<T extends object>(
		formula: ApiConvertedFormula,
		item: T
	): T | object {
		console.log('transformFormula', formula, item);
		const { fn, args } = formula;
		const normalizedArgs = Array.isArray(args) ? args : [args];

		const logicFn = FunctionMap[fn as keyof typeof FunctionMap] as
			| ((args: ApiConvertedArgument[], item: T) => T)
			| undefined;

		return logicFn ? logicFn(normalizedArgs, item) : item;
	}

	// --- function ---
	function fnVoid<T extends object>(list: ApiConvertedArgument[], item: T) {
		return item;
	}

	return { handleFormula };
}

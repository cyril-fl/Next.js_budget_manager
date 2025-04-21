// Imports
// Define

import { ApiConvertedArgument, ApiConvertedFormula } from '@types';

export function utilsFormulaArray() {
	// Data
	const FunctionMap = {
		GROUP_BY: fnGroupBy,
	};

	// Methods

	function handleFormula<T extends object>(
		formula: ApiConvertedFormula,
		item: T
	): T[] | object[] {
		console.log('transformFormula', formula, item);
		const { fn, args } = formula;
		const normalizedArgs = Array.isArray(args) ? args : [args];
		const normalizedItem = Array.isArray(item) ? item : [item];

		const logicFn = FunctionMap[fn as keyof typeof FunctionMap] as
			| ((args: ApiConvertedArgument[], item: T[]) => T[])
			| undefined;

		return logicFn ? logicFn(normalizedArgs, normalizedItem) : normalizedItem;
	}

	// --- function ---
	function fnGroupBy<T extends object>(
		list: ApiConvertedArgument[],
		item: T[]
	) {
		console.log('GroupBy list', list);
		// console.log('GroupBy item', item);

		return item;
	}
	return {
		handleFormula,
	};
}

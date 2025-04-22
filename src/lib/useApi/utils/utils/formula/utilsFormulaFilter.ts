// Imports
import { utilsOperator } from '@/lib/useApi/utils/utils/formula/utilsOperator';
import { ApiConvertedArgument, ApiConvertedFormula } from '@types';

// Define

export function utilsFormulaFilter(redirect: any) {
	// Data
	const FunctionMap = {
		AND: fnAnd,
		OR: fnOr,
	} as const;
	const { evaluateOperator } = utilsOperator();

	// Methods
	function handleArguments<T extends object>(
		item: T,
		arg: ApiConvertedArgument
	): boolean | object {
		if (Array.isArray(arg)) {
			return arg.every((a) => handleArguments(item, a));
		}

		if ('fn' in arg) {
			return redirect(arg, item);
		}

		const { l, r: right, symbol } = arg;
		const left = typeof l === 'string' ? item[l as keyof T] : redirect(l, item);

		return evaluateOperator(symbol, left, right);
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
		conditions: ApiConvertedArgument[],
		item: T
	): boolean {
		return conditions.every((arg) => handleArguments(item, arg));
	}

	function fnOr<T extends object>(
		condition: ApiConvertedArgument[],
		item: T
	): boolean {
		return condition.some((arg) => handleArguments(item, arg));
	}

	return { handleFormula };
}

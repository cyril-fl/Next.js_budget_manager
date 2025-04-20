// Import
import {
	ApiConvertedArgument,
	ApiConvertedFormula,
	ApiSymbolOperator,
} from '@types';

// Define

export function utilsFormulaEvaluator() {
	// Data
	const operatorMap = {
		AND: fnAnd,
		OR: fnOr,
	} as const;

	// Methods
	function fnAnd<T extends object>(
		list: ApiConvertedArgument[],
		item: T
	): boolean {
		return list.every((arg) => evaluateArgs(item, arg));
	}

	function fnOr<T extends object>(
		list: ApiConvertedArgument[],
		item: T
	): boolean {
		return list.some((arg) => evaluateArgs(item, arg));
	}

	// Evaluate
	function evaluateOperator(
		symbol: ApiSymbolOperator,
		left: unknown,
		right: unknown
	): boolean {
		switch (symbol) {
			case '=':
				return left == right;
			case '!=':
				return left != right;
			case '>':
				return Number(left) > Number(right);
			case '<':
				return Number(left) < Number(right);
			case '>=':
				return Number(left) >= Number(right);
			case '<=':
				return Number(left) <= Number(right);
			default:
				return false;
		}
	}

	function evaluateArgs<T extends object>(
		item: T,
		arg: ApiConvertedArgument
	): boolean {
		if (Array.isArray(arg)) {
			return arg.every((a) => evaluateArgs(item, a));
		}

		if ('fn' in arg) {
			return evaluateFormula(arg, item);
		}

		const { l, r, symbol } = arg;
		const left =
			typeof l === 'string' ? item[l as keyof T] : evaluateFormula(l, item);

		return evaluateOperator(symbol!, left, r);
	}

	// function evaluateFormulaD<T extends object>(
	// 	formula: ApiConvertedFormula,
	// 	item: T
	// ): boolean {
	// 	const { fn, args } = formula;
	// 	const list = Array.isArray(args) ? args : [args];
	//
	// 	switch (fn) {
	// 		case 'AND':
	// 			return fnAnd(list, item);
	// 		case 'OR':
	// 			return fnOr(list, item);
	// 		default:
	// 			return false;
	// 	}
	// }

	function evaluateFormula<T extends object>(
		formula: ApiConvertedFormula,
		item: T
	): boolean {
		const { fn, args } = formula;
		const normalizedArgs = Array.isArray(args) ? args : [args];

		const logicFn = operatorMap[fn as keyof typeof operatorMap] as
			| ((args: ApiConvertedArgument[], item: T) => boolean)
			| undefined;

		return logicFn ? logicFn(normalizedArgs, item) : false;
	}

	return {
		evaluateFormula,
	};
}

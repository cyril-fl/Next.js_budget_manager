// Import
import {
	ApiComparisonOperatorSymbol,
	ApiFormula,
	ApiFormulaArgument,
} from '@types';

// Define

export function utilsFormulaEvaluator() {
	function evaluateComparisonOperator(
		symbol: ApiComparisonOperatorSymbol,
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
		arg: ApiFormulaArgument
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
		return evaluateComparisonOperator(symbol!, left, r);
	}

	function evaluateFormula<T extends object>(
		formula: ApiFormula,
		item: T
	): boolean {
		const { fn, args } = formula;
		const list = Array.isArray(args) ? args : [args];

		switch (fn) {
			case 'AND':
				return list.every((arg) => evaluateArgs(item, arg));
			case 'OR':
				return list.some((arg) => evaluateArgs(item, arg));
			default:
				return false;
		}
	}

	return {
		evaluateFormula,
	};
}

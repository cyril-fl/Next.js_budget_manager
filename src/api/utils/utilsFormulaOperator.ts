// Imports
// Define

import { ApiSymbolOperator } from '@types';

export function utilsFormulaOperator() {
	const operatorFunctions: Record<
		ApiSymbolOperator,
		(a: any, b: any) => boolean
	> = {
		'=': (a, b) => a == b,
		'!=': (a, b) => a != b,
		'>': (a, b) => a > b,
		'<': (a, b) => a < b,
		'>=': (a, b) => a >= b,
		'<=': (a, b) => a <= b,
	};

	function handleComparison<T>(
		symbol: ApiSymbolOperator | undefined,
		left: T,
		right: T
	): boolean {
		if (!symbol) return false;
		const fn = operatorFunctions[symbol];
		return fn ? fn(left, right) : false;
	}

	function evaluateOperator(
		symbol: ApiSymbolOperator | undefined,
		left: unknown,
		right: unknown
	): boolean {
		if (right === undefined && left !== undefined) return true;

		switch (typeof left) {
			case 'number': {
				const leftNum = Number(left);
				const rightNum = Number(right);
				if (isNaN(leftNum) || isNaN(rightNum)) return false;
				return handleComparison(symbol, leftNum, rightNum);
			}
			case 'string':
				return handleComparison(symbol, String(left), String(right));
			case 'boolean': {
				const rightBool =
					typeof right === 'string' ? right.toLowerCase() === 'true' : !!right;
				return handleComparison(symbol, left, rightBool);
			}
			default:
				return false;
		}
	}

	return { evaluateOperator };
}

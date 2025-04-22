// DEPRECATED
// // Import
// import {
// 	ApiConvertedArgument,
// 	ApiConvertedFormula,
// 	ApiSymbolOperator,
// } from '@types';
//
// // Define
// export function utilsFormulaEvaluator() {
// 	// Data
// 	const evaluateFunctionMap = {
// 		AND: fnAnd,
// 		OR: fnOr,
// 	} as const;
//
// 	const transformFunctionMap = {
// 		GROUP_BY: fnGroupBy,
// 	};
//
// 	const operatorFunctions: Record<
// 		ApiSymbolOperator,
// 		(a: any, b: any) => boolean
// 	> = {
// 		'=': (a, b) => a == b,
// 		'!=': (a, b) => a != b,
// 		'>': (a, b) => a > b,
// 		'<': (a, b) => a < b,
// 		'>=': (a, b) => a >= b,
// 		'<=': (a, b) => a <= b,
// 	};
//
// 	// Methods
// 	// ---  functions ---
// 	function fnAnd<T extends object>(
// 		list: ApiConvertedArgument[],
// 		item: T
// 	): boolean {
// 		return list.every((arg) => evaluateArgs(item, arg));
// 	}
//
// 	function fnOr<T extends object>(
// 		list: ApiConvertedArgument[],
// 		item: T
// 	): boolean {
// 		return list.some((arg) => evaluateArgs(item, arg));
// 	}
//
// 	function fnGroupBy<T extends object>(list: ApiConvertedArgument[], item: T) {
// 		return item;
// 	}
//
// 	function handleComparison<T>(
// 		symbol: ApiSymbolOperator | undefined,
// 		left: T,
// 		right: T
// 	): boolean {
// 		if (!symbol) return false;
// 		const fn = operatorFunctions[symbol];
// 		return fn ? fn(left, right) : false;
// 	}
//
// 	// --- Evaluators ---
// 	function evaluateOperator(
// 		symbol: ApiSymbolOperator | undefined,
// 		left: unknown,
// 		right: unknown
// 	): boolean {
// 		if (right === undefined && left !== undefined) return true;
//
// 		switch (typeof left) {
// 			case 'number': {
// 				const leftNum = Number(left);
// 				const rightNum = Number(right);
// 				if (isNaN(leftNum) || isNaN(rightNum)) return false;
// 				return handleComparison(symbol, leftNum, rightNum);
// 			}
// 			case 'string':
// 				return handleComparison(symbol, String(left), String(right));
// 			case 'boolean': {
// 				const rightBool =
// 					typeof right === 'string' ? right.toLowerCase() === 'true' : !!right;
// 				return handleComparison(symbol, left, rightBool);
// 			}
// 			default:
// 				return false;
// 		}
// 	}
//
// 	function evaluateArgs<T extends object>(
// 		item: T,
// 		arg: ApiConvertedArgument
// 	): boolean {
// 		if (Array.isArray(arg)) {
// 			return arg.every((a) => evaluateArgs(item, a));
// 		}
//
// 		if ('fn' in arg) {
// 			return evaluateFormula(arg, item);
// 		}
//
// 		const { l, r: right, symbol } = arg;
// 		const left =
// 			typeof l === 'string' ? item[l as keyof T] : evaluateFormula(l, item);
//
// 		return evaluateOperator(symbol, left, right);
// 	}
//
// 	function evaluateFormula<T extends object>(
// 		formula: ApiConvertedFormula,
// 		item: T
// 	): unknown {
// 		console.log('evaluateFormula', formula, item);
// 		const { fn, args } = formula;
// 		const normalizedArgs = Array.isArray(args) ? args : [args];
//
// 		const logicFn = evaluateFunctionMap[
// 			fn as keyof typeof evaluateFunctionMap
// 		] as ((args: ApiConvertedArgument[], item: T) => boolean) | undefined;
//
// 		return logicFn ? logicFn(normalizedArgs, item) : false;
// 	}
//
// 	function transformFormula<T extends object>(
// 		formula: ApiConvertedFormula,
// 		item: T
// 	): T | object {
// 		console.log('transformFormula', formula, item);
// 		const { fn, args } = formula;
// 		const normalizedArgs = Array.isArray(args) ? args : [args];
//
// 		const logicFn = transformFunctionMap[
// 			fn as keyof typeof transformFunctionMap
// 		] as ((args: ApiConvertedArgument[], item: T) => T) | undefined;
//
// 		return logicFn ? logicFn(normalizedArgs, item) : item;
// 	}
//
// 	return {
// 		evaluateFormula,
// 		transformFormula,
// 	};
// }

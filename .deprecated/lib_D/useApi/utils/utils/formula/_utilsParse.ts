// Imports
import {
	ApiComparisonSymbol,
	ApiConvertedComparison,
	ApiConvertedFormula,
	ApiFormulaName,
	ApiSymbolOperator,
	fnName,
} from '../../../types';

// Define
// type ConvertedArgument = Array<ApiConvertedComparison | ApiConvertedFormula>;
type MangoCondition = {
	[field: string | number | symbol]: {
		[operator: string]: string | number | boolean | undefined;
	};
};

type MangoQuery = {
	[logical: string]: Array<MangoCondition | MangoQuery>;
};

export function utilsParseFormula() {
	//  Data
	const regexIsFormula = /^(\w+)\((.+)\)$/;
	const { parse: parseClause } = utilsParseClause();

	// Methods
	function isFormula(value: string): boolean {
		return fnName.some((fn) => value.startsWith(fn + '('));
	}

	function handleSmartSplit(value: string): string[] {
		const parts: string[] = [];
		let buffer = '';
		let depth = 0;

		for (let i = 0; i < value.length; i++) {
			const char = value[i];

			if (char === '(') depth++;
			if (char === ')') depth--;
			if (char === ',' && depth === 0) {
				parts.push(buffer.trim());
				buffer = '';
				continue;
			}
			buffer += char;
		}

		if (buffer.trim()) parts.push(buffer.trim());

		return parts;
	}

	function handleParse(value: string): ApiConvertedFormula | undefined {
		const match = value.match(regexIsFormula);
		if (!match) return;

		const fn = match[1] as ApiFormulaName;
		const argsRaw = handleSmartSplit(match[2]);

		const args = argsRaw.map((arg) => {
			const trimmed = arg.trim();
			if (isFormula(trimmed)) {
				return handleParse(trimmed)!;
			}
			return parseClause(trimmed)!;
		});

		return { fn, args };
	}

	// Return
	return { parse: handleParse, smartSplit: handleSmartSplit, isFormula };
}

export function utilsParseClause() {
	// Data
	const regexIsOperator = /(\{.+?})\s*(=|!=|>|<|>=|<=)?\s*'(.+?)'/;
	const regexIsSingleClause = /\{(.+?)}/;

	// Methods
	function sanitizeLeft(l: string) {
		return l.replace(/[{}]/g, '');
	}

	// function sanitizeRight(r: string) {
	// 	return r.replace(/^'|'$/g, '');
	// }

	function sanitizeRight(r: string): string | number {
		const value = r.replace(/^'|'$/g, '');
		if (!isNaN(Number(value)) && value.trim() !== '') {
			return Number(value);
		}
		return value;
	}

	function parseWithOperator(
		clauses: string
	): ApiConvertedComparison | undefined {
		const match = clauses.match(regexIsOperator);
		if (!match) return;
		const [, l, symbol, r] = match;
		return {
			l: sanitizeLeft(l),
			r: sanitizeRight(r),
			symbol: symbol as ApiSymbolOperator,
		};
	}

	function parseSingleClause(
		clauses: string
	): ApiConvertedComparison | undefined {
		const match = clauses.match(regexIsSingleClause);
		if (!match) return;
		return {
			l: sanitizeLeft(match[1]),
			r: undefined,
			symbol: undefined,
		};
	}

	function handleParse(clauses: string): ApiConvertedComparison | undefined {
		const isClauseContainsOperator = Object.values(ApiComparisonSymbol).some(
			(op) => clauses.includes(op)
		);

		if (!isClauseContainsOperator) {
		}
		return isClauseContainsOperator
			? parseWithOperator(clauses)
			: parseSingleClause(clauses);
	}

	// Return
	return { parse: handleParse };
}

export function utilsParseFormulaToMongo(
	params: string
): MangoQuery | MangoCondition | undefined {
	const { parse, isFormula } = utilsParseFormula();
	if (!isFormula(params)) return;

	const parsed = parse(params);
	if (!parsed) return;

	// Data
	const opMap: Record<ApiSymbolOperator, string> = {
		'=': '$eq',
		'==': '$eq',
		'!=': '$ne',
		'!==': '$ne',
		'>': '$gt',
		'<': '$lt',
		'>=': '$gte',
		'<=': '$lte',
	};

	function recurse(
		formula: ApiConvertedFormula | ApiConvertedComparison
	): MangoQuery | MangoCondition | undefined {
		if ('fn' in formula) {
			const mangoFn = `$${formula.fn.toLowerCase()}`;
			const args = isArray(formula.args) ? formula.args : [formula.args];
			const recursedArgs = args
				.map(recurse)
				.filter((arg): arg is MangoCondition | MangoQuery => arg !== undefined);

			return { [mangoFn]: recursedArgs };
		}

		const { l, r, symbol } = formula;
		if (!symbol || r === undefined) {
			throw new Error(`Invalid comparison: ${JSON.stringify(formula)}`);
		}

		const operator = opMap[symbol as keyof typeof opMap];
		if (!operator) {
			throw new Error(`Unknown operator: ${symbol}`);
		}

		return {
			[l as any]: {
				[operator]: isNaN(Number(r)) ? r : Number(r),
			},
		};
	}

	return recurse(parsed);
}

function isArray<T>(value: T | T[]): value is T[] {
	return Array.isArray(value);
}

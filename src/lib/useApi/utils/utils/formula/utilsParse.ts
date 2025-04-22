// Imports
import {
	ApiConvertedComparison,
	ApiConvertedFormula,
	ApiFormulaName,
	ApiSymbolOperator,
	API_FORMULA_NAME as formulaNames,
	API_FORMULA_OPERATOR_SYMBOL as operatorSymbol,
} from '@types';

// Define
type ConvertedArgument = Array<ApiConvertedComparison | ApiConvertedFormula>;

export function utilsParseFormula() {
	//  Data
	const regexIsFormula = /^(\w+)\((.+)\)$/;
	const { parse: parseClause } = utilsParseClause();

	// Methods
	function isFormula(value: string): boolean {
		return formulaNames.some((fn) => value.startsWith(fn + '('));
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

	function sanitizeRight(r: string) {
		return r.replace(/^'|'$/g, '');
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
		const isClauseContainsOperator = operatorSymbol.some((op) =>
			clauses.includes(op)
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

/*// NOTE: Entry point to parse if the formula does not start with a function
export function _parseClause(value: string): ConvertedArgument {
	// Data
	const { parse: parseFormula, smartSplit, isFormula } = utilsParseFormula();
	const { parse: parseClause } = utilsParseClause();
	const result: ConvertedArgument = [];
	const parts = value.includes(',') ? smartSplit(value) : [value];

	//  Return
	for (const part of parts) {
		const trimmed = part.trim();

		if (isFormula(trimmed)) {
			const formula = parseFormula(trimmed);
			if (formula) result.push(formula);
		} else {
			const clause = parseClause(trimmed);
			if (clause) result.push(clause);
		}
	}

	return result;
}*/

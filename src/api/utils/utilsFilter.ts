// Import
import { useConsole } from '@/.debug/hooks/useConsole';
import {
	API_FORMULA_FILTER,
	ApiComparisonOperatorName,
	ApiFormula,
	ApiFormulaArgument,
	ApiFormulaComparison,
	ApiFormulaFilter,
	ComparisonSymbol,
} from '@types';

// Define

export function utilsFilterParams() {
	// Data
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const Console = useConsole();

	// Methods
	function handleDefaultOperator(
		fn: ApiFormulaFilter
	): ApiComparisonOperatorName | undefined {
		switch (fn) {
			case 'AND':
			case 'OR':
				return 'eq';
			default:
				return undefined;
		}
	}

	function parseArgument(
		value: ApiFormulaArgument
	): ApiFormulaComparison | ApiFormulaComparison[] {
		const isArray = Array.isArray(value);
		const args = isArray ? value : [value];

		const transformLeft = (_: string) => {
			if (API_FORMULA_FILTER.some((f) => _.startsWith(f))) return _;
			return `{${_}}`;
		};
		const transformRight = (_?: string | number) => {
			if (_ !== undefined) return `'${_}'`;
		};

		const transformArgs = args
			.map((a): ApiFormulaComparison | undefined => {
				if ('fn' in a) return { l: encodeFilterParams(a) || '' };

				if (typeof a === 'string') return { l: a };

				if (typeof a.l === 'string')
					return {
						...a,
						l: transformLeft(a.l),
						r: transformRight(a.r),
					};

				if ('formula' in a.l)
					return {
						...a,
						l: encodeFilterParams(a.l) || '',
						r: transformRight(a.r),
					};
			})
			.filter((a): a is ApiFormulaComparison => Boolean(a));
		return isArray ? transformArgs : transformArgs[0];
	}

	function buildBase(
		fn: ApiFormulaFilter,
		args: ApiFormulaComparison | ApiFormulaComparison[],
		defaultOp?: ApiComparisonOperatorName
	) {
		args = Array.isArray(args) ? args : [args];

		const params = args
			.flatMap(({ l, r, symbol }) => {
				if (!r) return [l];
				if (!symbol && !defaultOp) return [l, r];
				if (symbol || defaultOp)
					return [
						`${l} ${ComparisonSymbol[(symbol as ApiComparisonOperatorName) || defaultOp]} ${r}`,
					];
			})
			.filter(Boolean)
			.join(', ');

		return `${fn}(${params})`;
	}

	function encodeFilterParams(filter: ApiFormula) {
		if (!API_FORMULA_FILTER.includes(filter.fn)) {
			Console.error(`Unsupported formula: ${filter.fn}`);
			return '';
		}

		const parsedArgs = parseArgument(filter.args);
		const defaultOp = handleDefaultOperator(filter.fn);

		return buildBase(filter.fn, parsedArgs, defaultOp);
	}

	return {
		encodeFilter: encodeFilterParams,
	};
}

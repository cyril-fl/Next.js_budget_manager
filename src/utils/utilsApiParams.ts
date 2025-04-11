import { useConsole } from '@/.debug/hooks/useConsole';
import {
	API_FORMULA_FILTER,
	ApiComparisonOperator,
	ApiFormula,
	ApiFormulaArgument,
	ApiFormulaComparison,
	ApiFormulaFilter,
	ApiOptions,
	ApiSortParam,
	ComparisonSymbol,
} from '@/types';
// TODO: Refactor la partie use API pour etre plus efficaces entre FRONT / BACK / BOTH
export function utilsApiParams(params: ApiOptions | undefined) {
	if (!params) return '';
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const Console = useConsole();

	function encodeParams(obj: ApiOptions) {
		return (Object.keys(obj) as (keyof ApiOptions)[])
			.map((key) => {
				const value = obj[key];
				if (!value) return undefined;

				switch (key) {
					case 'sort':
						const sortParams = encodeSortParams(
							value as ApiSortParam | ApiSortParam[]
						);
						return Object.entries(sortParams)
							.map(
								([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
							)
							.join('&');

					case 'filter':
						if (!value) return '';
						return `filter=${encodeURIComponent(
							typeof value === 'string'
								? value
								: encodeFilterParams(value as ApiFormula) || ''
						)}`;

					default:
						return `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`;
				}
			})
			.filter(Boolean)
			.join('&');
	}

	function encodeSortParams(sort: ApiSortParam | ApiSortParam[]) {
		const sortArray = Array.isArray(sort) ? sort : [sort];

		return sortArray.reduce(
			(acc, item, index) => {
				acc[`sort[${index}][field]`] = item.field;
				acc[`sort[${index}][direction]`] = item.direction || 'asc';
				return acc;
			},
			{} as Record<string, string>
		);
	}

	// Filter
	/**
	 * Build a filter string from a formula object
	 * @param filter The formula object
	 *
	 * @returns The filter string | undefined
	 * */
	function encodeFilterParams(filter: ApiFormula) {
		if (!API_FORMULA_FILTER.includes(filter.fn))
			return Console.error(`Unsupported formula: ${filter.fn}`);

		const parsedArgs = parseArgument(filter.args);
		// FIXME
		const defaultOp = filter.fn === 'AND' ? 'eq' : undefined;
		return buildBase(filter.fn, parsedArgs, defaultOp);
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
		defaultOp?: ApiComparisonOperator
	) {
		args = Array.isArray(args) ? args : [args];

		const params = args
			.flatMap(({ l, r, symbol }) => {
				if (!r) return [l];
				if (!symbol && !defaultOp) return [l, r];
				if (symbol || defaultOp)
					return [`${l} ${ComparisonSymbol[symbol! || defaultOp!]} ${r}`];
			})
			.filter(Boolean)
			.join(', ');

		return `${fn}(${params})`;
	}

	return `?${encodeParams(params)}`;
}

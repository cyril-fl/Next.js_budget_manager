// Imports
import {
	API_TABLE,
	ApiComparisonOperator,
	ApiField,
	ApiFormula,
	ApiFormulaArgument,
	ApiFormulaFilter,
	ApiOptions,
	ApiResponse,
	ApiSortParam,
} from '@/types';
import { utilsApiParams } from '@utils/utilsApiParams';

export function utilsApi() {
	// Data
	const baseUrl = process.env.api_url;

	// Methods
	async function get<T = unknown>(
		target: ApiField,
		option?: ApiOptions
	): Promise<ApiResponse<T>> {
		if (!API_TABLE.includes(target))
			return {
				success: false,
				error: 'Table does not exist',
			};

		const params = utilsApiParams(option);
		const _url = `${baseUrl}/${target}${params}`;

		const res = await fetch(_url, {
			method: 'GET',
		});

		return res.json();
	}

	return { get };
}

function evaluateFormula<T extends Record<string, unknown>>(
	formula: ApiFormula,
	item: T
): boolean {
	const { fn, args } = formula;

	const evalArg = (arg: ApiFormulaArgument): boolean => {
		if (Array.isArray(arg)) {
			return arg.every((a) => evalArg(a));
		} else {
			if ('fn' in arg) {
				return evaluateFormula(arg, item);
			} else {
				const { l, r, symbol } = arg;
				const left = typeof l === 'string' ? item[l] : evaluateFormula(l, item);

				switch (symbol) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					case '=':
						return left == r;
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					case '!=':
						return left != r;
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					case '>':
						return Number(left) > Number(r);
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					case '<':
						return Number(left) < Number(r);
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					case '>=':
						return Number(left) >= Number(r);
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					case '<=':
						return Number(left) <= Number(r);
					default:
						return false;
				}
			}
		}
	};

	switch (fn) {
		case 'AND':
			return (Array.isArray(args) ? args : [args]).every(evalArg);
		case 'OR':
			return (Array.isArray(args) ? args : [args]).some(evalArg);
		// case 'NOT':
		// 	return !(Array.isArray(args) ? args : [args]).every(evalArg);
		default:
			return false;
	}
}

export function utilsRefineData<T extends Record<string, unknown>>(
	data: T[],
	params: Record<string, string>
) {
	// Params
	function handleSortParam(params: Record<string, string>) {
		const sortArray: ApiSortParam[] | undefined = [];

		Object.keys(params).forEach((key) => {
			const match = key.match(/^sort\[(\d+)]\[(field|direction)]$/);

			if (!match) return;
			const index = parseInt(match[1], 10);
			const type = match[2] as 'field' | 'direction';

			sortArray[index] = sortArray[index] || { field: '', direction: 'asc' };

			sortArray[index][type] = params[key] as 'asc' | 'desc';
		});

		return sortArray.filter((item) => item.field);
	}

	function handleFilterParams(
		params: Record<string, string>
	): ApiFormula | undefined {
		if (!params.filter) return;

		const decodedFilter = decodeURIComponent(params.filter);
		const match = decodedFilter.match(/^(\w+)\((.+)\)$/);

		if (!match) return;

		const [, fnRaw, body] = match;
		const fn = fnRaw as ApiFormulaFilter;

		const args: ApiFormulaArgument = [
			...body.matchAll(/\{(.+?)}\s*([=<>!]+)\s*'(.+?)'/g),
		].map(([, l, symbol, r]) => ({
			l,
			r,
			symbol: symbol as ApiComparisonOperator,
		}));

		return {
			fn,
			args,
		};
	}

	// Data
	function handleFilterData<T extends Record<string, unknown>>(
		data: T[],
		filterParams?: ApiFormula
	): T[] {
		if (!filterParams) return data;

		return data.filter((item) => evaluateFormula(filterParams, item));
	}

	function handleSortData<T extends Record<string, unknown>>(
		data: T[],
		sortParams: ApiSortParam[]
	): T[] {
		if (data.some((item) => sortParams.some(({ field }) => !(field in item)))) {
			return [];
		}

		return [...data].sort((a, b) => {
			for (const { field, direction } of sortParams) {
				const compareA = a[field];
				const compareB = b[field];

				if (
					compareA == null ||
					compareB == null ||
					typeof compareA === 'object' ||
					typeof compareB === 'object'
				) {
					return 0;
				}

				if (compareA === compareB) continue;

				const order = direction === 'desc' ? -1 : 1;
				return compareA < compareB ? -order : order;
			}
			return 0;
		});
	}

	function handleFilterFieldsData<T extends Record<string, unknown>>(
		data: T[],
		fields: string[]
	): Partial<T>[] {
		if (!fields.length) return data;

		if (!data.every((item) => fields.every((field) => field in item))) {
			return [];
		}

		return data.map(
			(item) =>
				Object.fromEntries(
					Object.entries(item).filter(([key]) => fields.includes(key))
				) as Partial<T>
		);
	}

	// Refine
	function handleProcessData(data: T[]) {
		// Parse params
		// TODO: Handle filter
		const { maxRecords: maxRecordsParam } = params;
		const filterParams = handleFilterParams(params);
		const fieldsParams = params.fields ? params.fields.split(',') : [];
		const sortParams = handleSortParam(params);

		// Refine
		const filterData = handleFilterData(data, filterParams);
		console.log('filterData', filterData);
		const sortedData = handleSortData(filterData, sortParams);
		const filteredData = handleFilterFieldsData(sortedData, fieldsParams);
		const maxedData = filteredData.slice(
			0,
			+maxRecordsParam || filteredData.length
		);

		return maxedData;
	}

	return handleProcessData(data);
}

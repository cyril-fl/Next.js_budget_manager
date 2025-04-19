// Import
import {
	ApiComparisonOperatorSymbol,
	ApiFormula,
	ApiFormulaArgument,
	ApiFormulaFilter,
	ApiSortParam,
	Param,
} from '@types';

// Define

export function utilsDecodeParams() {
	function handleFieldsParams(params: Param) {
		const fields = params.fields;
		if (!fields) return [];

		const fieldsArray = decodeURIComponent(fields).split(',');
		if (!fieldsArray.length) return [];

		return fieldsArray;
	}

	function handleFilterParams(params: Param): ApiFormula | undefined {
		const filter = params.filter;
		if (!filter) return;

		const decodedFilter = decodeURIComponent(filter);
		const match = decodedFilter.match(/^(\w+)\((.+)\)$/);

		if (!match) return;

		const [, fnRaw, body] = match;
		const fn = fnRaw as ApiFormulaFilter;

		const args: ApiFormulaArgument = [
			...body.matchAll(/\{(.+?)}\s*([=<>!]+)\s*'(.+?)'/g),
		].map(([, l, symbol, r]) => ({
			l,
			r,
			symbol: symbol as ApiComparisonOperatorSymbol,
		}));

		return {
			fn,
			args,
		};
	}

	function handleMaxRecordsParams(params: Param) {
		const maxRecords = params.maxRecords;
		if (!maxRecords) return;

		const maxRecordsParam = parseInt(maxRecords, 10);
		if (isNaN(maxRecordsParam)) return;

		return maxRecordsParam;
	}

	function handleSortParam(params: Param) {
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

	return {
		decodeFields: handleFieldsParams,
		decodeFilter: handleFilterParams,
		decodeMaxRecords: handleMaxRecordsParams,
		decodeSort: handleSortParam,
	};
}

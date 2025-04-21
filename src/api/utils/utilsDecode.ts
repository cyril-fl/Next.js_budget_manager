// Import
import {
	API_FORMULA_OPERATOR_SYMBOL,
	ApiConvertedArgument,
	ApiConvertedFormula,
	ApiFormulaName,
	ApiSortParam,
	ApiSymbolOperator,
	Param,
} from '@types';

// Define

export function utilsDecodeParams() {
	// Methods
	function handleFieldsParams(params: Param) {
		const fields = params.fields;
		if (!fields) return [];

		const fieldsArray = decodeURIComponent(fields).split(',');
		if (!fieldsArray.length) return [];

		return fieldsArray;
	}

	function handleFilterParams(params: Param): ApiConvertedFormula | undefined {
		const filter = params.filter;
		if (!filter) return;

		const decodedFilter = decodeURIComponent(filter);
		const match = decodedFilter.match(/^(\w+)\((.+)\)$/);
		if (!match) return;

		return {
			fn: match[1] as ApiFormulaName,
			args: parseFormula(match[2]),
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

	// Helper
	function parseFormula(body: string) {
		const args: ApiConvertedArgument = [];

		const argsAdd = (
			l: string,
			r?: string | number | boolean,
			symbol?: string
		) => {
			args.push({
				l,
				r,
				symbol: symbol ? (symbol as ApiSymbolOperator) : undefined,
			});
		};

		const sanitizeLeft = (l: string) => l.replace(/{|}/g, '');
		const sanitizeRight = (r: string) => r.replace(/^'|'$/g, '');

		const parseSeparated = () => {
			const parts = body.split(',').map((part) => part.trim());
			for (let i = 0; i < parts.length; i += 2) {
				const left = sanitizeLeft(parts[i]);
				const right = sanitizeRight(parts[i + 1] || '');
				if (left) argsAdd(left, right);
			}
		};

		const parseWithOperator = () => {
			const match = body.match(/\{(.+?)}\s*(=|!=|>|<|>=|<=)?\s*'(.+?)'/);
			if (!match) return;
			const [, l, symbol, r] = match;
			argsAdd(sanitizeLeft(l), sanitizeRight(r), symbol);
		};

		const parseSimple = () => {
			const match = body.match(/\{(.+?)}/);
			if (!match) return;
			argsAdd(sanitizeLeft(match[1]));
		};

		if (body.includes(',')) {
			parseSeparated();
			return args;
		}

		if (API_FORMULA_OPERATOR_SYMBOL.some((op) => body.includes(op))) {
			parseWithOperator();
			return args;
		}

		parseSimple();
		return args;
	}

	return {
		decodeFields: handleFieldsParams,
		decodeFilter: handleFilterParams,
		decodeMaxRecords: handleMaxRecordsParams,
		decodeSort: handleSortParam,
	};
}

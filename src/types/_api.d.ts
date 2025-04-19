import {
	API_FORMULA_FILTER,
	API_FORMULA_OPERATOR_NAME,
	API_FORMULA_OPERATOR_SYMBOL,
	API_OPTIONS_KEYS,
	API_TABLE,
} from '@/types/constant';

export type ApiField = (typeof API_TABLE)[number];
export type ApiOptionsKeys = (typeof API_OPTIONS_KEYS)[number];
export type ApiFormulaFilter = (typeof API_FORMULA_FILTER)[number];
export type ApiComparisonOperatorName =
	(typeof API_FORMULA_OPERATOR_NAME)[number];
export type ApiComparisonOperatorSymbol =
	(typeof API_FORMULA_OPERATOR_SYMBOL)[number];

export type ApiOptions = {
	fields?: Array<string>;
	maxRecords?: number;
	pageSize?: number;
	filter?: ApiFormula | string;
	offset?: string;
	sort?: ApiSortParam | ApiSortParam[];
};

export type ApiResponse<T = unknown> = {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
};

export type ApiFormulaArgument =
	| ApiFormulaComparison
	| ApiFormula
	| Array<ApiFormulaComparison | ApiFormula>;

export type ApiFormulaComparison = {
	l: ApiFormula | string;
	r?: string | number;
	symbol?: XOR<ApiComparisonOperatorSymbol, ApiComparisonOperatorName>;
};

// export type ApiFormulaComparison = {
// 	l: ApiFormula | string;
// 	r?: string | number;
// 	symbol?: ApiComparisonOperatorName;
// };

export type ApiFormula = {
	fn: ApiFormulaFilter;
	args: ApiFormulaArgument;
};

export type ApiSortParam = {
	field: string;
	direction?: 'asc' | 'desc';
};

export type Param = Record<string, string | undefined>;

import {
	API_FORMULA_FILTER,
	API_FORMULA_OPERATOR,
	API_OPTIONS_KEYS,
	API_TABLE,
} from '@/types/constant';

export type ApiField = (typeof API_TABLE)[number];
export type ApiOptionsKeys = (typeof API_OPTIONS_KEYS)[number];
export type ApiFormulaFilter = (typeof API_FORMULA_FILTER)[number];
export type ApiComparisonOperator = (typeof API_FORMULA_OPERATOR)[number];

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
	symbol?: ApiComparisonOperator;
};

export type ApiFormula = {
	fn: ApiFormulaFilter;
	args: ApiFormulaArgument;
};

export type ApiSortParam = {
	field: string;
	direction?: 'asc' | 'desc';
};

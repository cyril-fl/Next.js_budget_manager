import {
	API_FORMULA_FILTER,
	API_FORMULA_OPERATOR_NAME,
	API_FORMULA_OPERATOR_SYMBOL,
	API_OPTIONS_KEYS,
	API_TABLE_LABEL,
} from '@/types/constant';

export type ApiTableLabel = (typeof API_TABLE_LABEL)[number];
export type ApiOptionsKeys = (typeof API_OPTIONS_KEYS)[number];
export type ApiFormulaName = (typeof API_FORMULA_FILTER)[number];
export type ApiNamedOperator = (typeof API_FORMULA_OPERATOR_NAME)[number];
export type ApiSymbolOperator = (typeof API_FORMULA_OPERATOR_SYMBOL)[number];

export type ApiOptions = {
	fields?: Array<string>;
	maxRecords?: number;
	pageSize?: number;
	filter?: ApiFormula | string;
	offset?: string;
	sort?: ApiSortParam | ApiSortParam[];
} & NextCache;

export type ApiResponse<T = unknown> = {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
};

type RawFormula<T> = {
	fn: ApiFormulaName;
	args: RawArgument<T>;
};

type RawArgument<T> =
	| RawComparison<T>
	| RawFormula<T>
	| Array<RawComparison<T> | RawFormula<T>>;

type RawComparison<T> = {
	l: RawFormula<T> | string;
	r?: string | number;
	symbol?: T;
};

export type ApiFormula = RawFormula<ApiNamedOperator>;
export type ApiArgument = RawArgument<ApiNamedOperator>;
export type ApiComparison = RawComparison<ApiNamedOperator>;

export type ApiConvertedFormula = RawFormula<ApiSymbolOperator>;
export type ApiConvertedArgument = RawArgument<ApiSymbolOperator>;
export type ApiConvertedComparison = RawComparison<ApiSymbolOperator>;

export type ApiSortParam = {
	field: string;
	direction?: 'asc' | 'desc';
};

// Autre
export type Param = Record<string, string | undefined>;

interface NextCache {
	nextCache?: {
		revalidate?: number | false;
		cache?: 'default' | 'force-cache' | 'no-store';
		tags?: string[];
	};
}

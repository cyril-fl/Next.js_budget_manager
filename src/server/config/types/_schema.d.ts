import { config } from '../../config';
import {
	METHODS,
	METHODS_BY_CATEGORY,
	OPERATOR_NAME,
	OPERATOR_SYMBOL,
	OPTIONS_KEYS,
	PRIVATE_LABELS,
} from './_schema.c';

export type MethodsFilter = (typeof METHODS_BY_CATEGORY.filter)[number];
export type MethodsTransform = (typeof METHODS_BY_CATEGORY.transform)[number];
export type MethodsArray = (typeof METHODS_BY_CATEGORY.array)[number];
export type Methods = (typeof METHODS)[number];

export type OperatorName = (typeof OPERATOR_NAME)[number];
export type OperatorSymbol = (typeof OPERATOR_SYMBOL)[number];
export type OperatorSymbolComparison = Record<OperatorSymbol, OperatorName>;

export type OptionKeys = (typeof OPTIONS_KEYS)[number];

export type PrivateLabels = (typeof PRIVATE_LABELS)[number];
export interface RawConfig<T extends string | number | symbol = string> {
	url: string;
	bearer: string;
	mongo?: {
		url: string;
		name: string;
	};
	path: {
		labels: T[];
		routes: Partial<Record<T, string>>;
	};
	formula: {
		filter: MethodsFilter[];
		transform: MethodsTransform[];
		array: MethodsArray[];
		name: Methods[];
	};
}

export interface StaticConfig {
	operator: {
		name: OperatorName[];
		symbol: OperatorSymbol[];
		comparisonSymbol: OperatorSymbolComparison;
	};
	options: OptionKeys[];
}

export type Config = typeof config;

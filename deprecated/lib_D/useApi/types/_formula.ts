import { config } from '../config';
import { ApiNamedOperator, ApiSymbolOperator } from './_operator';

export type ApiFormulaFilter = (typeof config.formula.filter)[number];
export type ApiFormulaTransform = (typeof config.formula.transform)[number];
export type ApiFormulaArray = (typeof config.formula.array)[number];
export type ApiFormulaName = (typeof config.formula.name)[number];

type RawFormula<T> = {
	fn: ApiFormulaName;
	args: RawArgument<T>;
};

export type RawArgument<T> =
	| RawComparison<T>
	| RawFormula<T>
	| Array<RawComparison<T> | RawFormula<T>>;

export type RawComparison<T> = {
	l: RawFormula<T> | string;
	r?: string | number | boolean;
	symbol?: T;
};

export type ApiFormula = RawFormula<ApiNamedOperator>;
export type ApiArgument = RawArgument<ApiNamedOperator>;
export type ApiComparison = RawComparison<ApiNamedOperator>;

export type ApiConvertedFormula = RawFormula<ApiSymbolOperator>;
export type ApiConvertedArgument = RawArgument<ApiSymbolOperator>;
export type ApiConvertedComparison = RawComparison<ApiSymbolOperator>;

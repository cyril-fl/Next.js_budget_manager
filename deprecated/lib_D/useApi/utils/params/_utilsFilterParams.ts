// // Import
// import { useConsole } from '@/.debug/hooks/useConsole';
// import { config } from '../../config/';
// import {
// 	ApiArgument,
// 	ApiComparison,
// 	ApiComparisonSymbol,
// 	ApiConvertedFormula,
// 	ApiFormula,
// 	ApiFormulaFilter,
// 	ApiFormulaName,
// 	ApiFormulaTransform,
// 	ApiNamedOperator,
// 	ApiParam,
// } from '../../types';
// import {
// 	utilsFormulaArray,
// 	utilsFormulaFilter,
// 	utilsFormulaTransform,
// 	utilsParseFormula,
// 	utilsParseFormulaToMongo,
// 	utilsRedirection,
// } from '../utils/formula';
//
// // Define
//
// const API_FORMULA_NAME = config.formula.name;
// const fnTransform = config.formula.transform;
// const fnFilter = config.formula.filter;
// const fnArray = config.formula.array;
//
// // Methods
// export function utilsFilterParams() {
// 	// Data
// 	// eslint-disable-next-line react-hooks/rules-of-hooks
// 	const Console = useConsole();
// 	const { handleRedirection: redirect } = utilsRedirection();
// 	const { handleFormula: filterFormula } = utilsFormulaFilter(redirect);
// 	const { handleFormula: transformFormula } = utilsFormulaTransform(redirect);
// 	const { handleFormula: arrayFormula } = utilsFormulaArray(redirect);
//
// 	// Methods
// 	// TODO: mettre en config
// 	function handleDefaultOperator(
// 		fn: ApiFormulaName
// 	): ApiNamedOperator | undefined {
// 		switch (fn) {
// 			case 'AND':
// 			case 'OR':
// 				return 'eq';
// 			default:
// 				return undefined;
// 		}
// 	}
//
// 	function handleParseArgument(
// 		value: ApiArgument
// 	): ApiComparison | ApiComparison[] {
// 		const isArray = Array.isArray(value);
// 		const args = isArray ? value : [value];
//
// 		const transformLeft = (_: string) => {
// 			if (fnFilter.some((f) => _.startsWith(f))) return _;
// 			return `{${_}}`;
// 		};
// 		const transformRight = (_?: string | number | boolean) => {
// 			if (_ !== undefined) return `'${_}'`;
// 		};
//
// 		const transformedArgs = args
// 			.map((a): ApiComparison | undefined => {
// 				if ('fn' in a) return { l: encodeFilterParams(a) || '' };
//
// 				if (typeof a === 'string') return { l: a };
//
// 				if (typeof a.l === 'string')
// 					return {
// 						...a,
// 						l: transformLeft(a.l),
// 						r: transformRight(a.r),
// 					};
//
// 				if ('formula' in a.l)
// 					return {
// 						...a,
// 						l: encodeFilterParams(a.l) || '',
// 						r: transformRight(a.r),
// 					};
// 			})
// 			.filter((a): a is ApiComparison => Boolean(a));
//
// 		return isArray ? transformedArgs : transformedArgs[0];
// 	}
//
// 	function handleBaseBuild(
// 		fn: ApiFormulaName,
// 		args: ApiComparison | ApiComparison[],
// 		defaultOp?: ApiNamedOperator
// 	) {
// 		args = Array.isArray(args) ? args : [args];
//
// 		const params = args
// 			.flatMap(({ l, r, symbol }) => {
// 				if (!r) return [l];
// 				if (!symbol && !defaultOp) return [l, r];
// 				if (symbol || defaultOp)
// 					return [
// 						`${l} ${ApiComparisonSymbol[(symbol as ApiNamedOperator) || defaultOp]} ${r}`,
// 					];
// 			})
// 			.filter(Boolean)
// 			.join(', ');
//
// 		return `${fn}(${params})`;
// 	}
//
// 	function encodeFilterParams(filter: ApiFormula) {
// 		if (![...API_FORMULA_NAME].includes(filter.fn)) {
// 			Console.error(`Unsupported formula: ${filter.fn}`);
// 			return '';
// 		}
//
// 		const parsedArgs = handleParseArgument(filter.args);
// 		const defaultOp = handleDefaultOperator(filter.fn);
//
// 		return handleBaseBuild(filter.fn, parsedArgs, defaultOp);
// 	}
//
// 	function decodeFilterParams(params: ApiParam) {
// 		const filter = params.filter;
// 		if (!filter) return;
//
// 		const { parse, isFormula } = utilsParseFormula();
//
// 		const decodedFilter = decodeURIComponent(filter);
// 		if (!isFormula(decodedFilter)) return;
//
// 		return parse(decodedFilter);
// 	}
//
// 	function decodeFilterParamsNew(params: ApiParam) {
// 		const filter = params.filter;
// 		if (!filter) return;
//
// 		const decodedFilter = decodeURIComponent(filter);
// 		return utilsParseFormulaToMongo(decodedFilter);
// 	}
//
// 	function applyFormula<T extends object>(
// 		data: T[],
// 		filterParams?: ApiConvertedFormula
// 	): T[] {
// 		if (!filterParams) return data;
// 		const normalizeData: T[] = Array.isArray(data) ? data : [data];
//
// 		const fn = filterParams.fn;
// 		const isFnFilter = fnFilter.includes(fn as ApiFormulaFilter);
// 		const isFnTransform = fnTransform.includes(fn as any);
// 		const isFnArray = fnArray.includes(fn as ApiFormulaTransform);
//
// 		if (isFnFilter)
// 			return normalizeData.filter((item) => filterFormula(filterParams, item));
// 		// if (isFnTransform)
// 		// 	return normalizeData.map((item) => transformFormula(filterParams, item));
// 		if (isFnArray) return arrayFormula(filterParams, normalizeData);
//
// 		return data;
// 	}
//
// 	return {
// 		encodeFilter: encodeFilterParams,
// 		decodeFilter: decodeFilterParams,
// 		decodeFilterNew: decodeFilterParamsNew,
// 		applyFilter: applyFormula,
// 	};
// }

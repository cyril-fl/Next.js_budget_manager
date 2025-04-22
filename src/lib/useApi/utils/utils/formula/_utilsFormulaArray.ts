// Imports
import {
	ApiConvertedArgument,
	ApiConvertedComparison,
	ApiConvertedFormula,
	ApiFormulaArray,
	ApiFormulaFilter,
	ApiFormulaTransform,
	fnArray,
	fnFilter,
	fnTransform,
} from '../../../types';
import { FnRedirection } from './_utilsCommon';

// Define

export function utilsFormulaArray(handleRedirection: FnRedirection) {
	// Data
	const FunctionMap = {
		GROUP_BY: fnGroupBy,
	};

	// Methods
	/* TODO:
						gerer des arguments de type
							- {l: "reportYear", r: undefined, symbol: undefined}
							- {l: "type", r: undefined, symbol: undefined}
						Mais aussi des arguments de type
							- {l: "reportYear", r: undefined, symbol: undefined}
							-{ fn: "AND", args: [{l: "type", r: "income"}, ...] }
							...
						 {l: "reportYear", r: undefined, symbol: undefined}
						 	- champ a retourner dans dans mon objet :
						 	ITEM : { reportYear : '' records: [] }
						 	...
						{ fn: "AND", args: [{l: "type", r: "income"}, ...] }
						- donnes a retourner dans mon objet .. comment ?
						...
						doit retourne un objet de type { key1 : 'any'  key2: any ... records: [] }
		 */
	function handleArguments<T extends object, I>(
		items: T[],
		conditions: ApiConvertedArgument[],
		callback: (filteredItems: T[]) => I
	): I {
		let filteredItems = items;

		for (const condition of conditions) {
			if (!('fn' in condition)) continue;

			if (fnFilter.includes(condition.fn as ApiFormulaFilter)) {
				filteredItems = filteredItems.filter((item) =>
					handleRedirection(condition, item)
				);
			}
			// 	TODO handle fnArray  et fnTransform
			if (fnArray.includes(condition.fn as ApiFormulaArray)) {
				console.log('ApiFormulaArray not implemented yet');
			}

			// 	TODO handle fnTransform
			if (fnTransform.includes(condition.fn as ApiFormulaTransform)) {
				console.log('ApiFormulaTransform not implemented yet');
			}
		}

		return callback(filteredItems);
	}

	function handleFormula<T extends object>(
		formula: ApiConvertedFormula,
		item: T[]
	) {
		const { fn, args } = formula;
		const normalizedArgs: Array<ApiConvertedArgument> = Array.isArray(args)
			? args
			: [args];

		const logicFn = FunctionMap[fn as keyof typeof FunctionMap] as
			| ((args: ApiConvertedArgument[], item: T[]) => T[])
			| undefined;

		return logicFn ? logicFn(normalizedArgs, item) : item;
	}

	// --- function ---
	function fnGroupBy<T extends object>(
		conditions: ApiConvertedArgument[],
		items: T[]
	) {
		const callback = (filteredItem: T[]) => {
			const result = new Map<
				string,
				{ groupLabel: Record<string, unknown>; records: T[] }
			>();

			const groupKeys = conditions.filter(
				(c): c is ApiConvertedComparison => 'l' in c && !('fn' in c)
			);

			for (const item of filteredItem) {
				const keys = groupKeys.map((c) => String(item[c.l as keyof T]));
				const id = keys.join('|');

				if (!result.has(id)) {
					const groupLabel = Object.fromEntries(
						groupKeys.map((c, i) => [c.l, keys[i]])
					);
					result.set(id, { groupLabel, records: [] });
				}

				result.get(id)!.records.push(item);
			}

			return Array.from(result.values()).map(({ groupLabel, records }) => ({
				...groupLabel,
				records,
			}));
		};

		return handleArguments(items, conditions, callback);
	}
	return {
		handleFormula,
	};
}

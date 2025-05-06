// Define
export interface DecodedParams {
	limit?: number;
	offset?: number;
	fieldsParams?: Record<string, 1 | 0>;
	filterParams?: Record<string, any>;
	sortParams?: Record<string, 1 | -1>;
}
// Helpers
export function handleLimit(result: DecodedParams, value: string) {
	const num = Number(value);
	if (isNaN(num)) throw new Error(`Invalid limit: ${value}`);
	result.limit = num;
}

export function handleOffset(result: DecodedParams, value: string) {
	const num = Number(value);
	if (isNaN(num)) throw new Error(`Invalid offset: ${value}`);
	result.offset = num;
}

export function handleFields(result: DecodedParams, value: string) {
	result.fieldsParams = value.split(',').reduce(
		(acc, v) => {
			acc[v.trim()] = 1; // Met la valeur 1 pour chaque champ sélectionné
			return acc;
		},
		{} as Record<string, 1 | 0>
	);
}

export function handleFilter(result: DecodedParams, value: string) {
	result.filterParams = JSON.parse(value);
}

function handleSort(params: URLSearchParams): Record<string, 1 | -1> {
	const sortMap = new Map<number, { field?: string; direction?: 1 | -1 }>();
	const sortObject: Record<string, 1 | -1> = {};

	for (const [key, value] of params.entries()) {
		const match = key.match(/^sort\[(\d+)]\[(field|direction)]$/);
		if (!match || !value) continue;

		const index = Number(match[1]);
		const part = match[2] as 'field' | 'direction';

		const existing = sortMap.get(index) ?? {};

		if (part === 'field') {
			existing.field = value;
		}
		if (value === 'asc' || value === 'desc') {
			existing.direction = value === 'asc' ? 1 : -1;
		}
		if (part === 'direction' && value !== 'asc' && value !== 'desc') {
			throw new Error(`Invalid sort direction: ${value}`);
		}

		sortMap.set(index, existing);
	}

	for (const entry of sortMap.values()) {
		if (entry.field && entry.direction !== undefined) {
			sortObject[entry.field] = entry.direction;
		}
	}

	return sortObject;
}

// Hook
export function utilsDecodeGetParams(params: URLSearchParams): DecodedParams {
	const result: DecodedParams = {};
	if (!params) return result;

	const handlers: Record<
		string,
		(result: DecodedParams, value: string) => void
	> = {
		limit: handleLimit,
		offset: handleOffset,
		fields: handleFields,
		filter: handleFilter,
	};

	for (const [key, value] of params.entries()) {
		if (!value) continue;
		if (key in handlers) {
			handlers[key](result, value);
		}
	}

	result.sortParams = handleSort(params);

	return result;
}

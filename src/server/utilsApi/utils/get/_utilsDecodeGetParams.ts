// Helpers
import { ApiDecodedParams } from '@/server/utilsApi';

function handleLimitParam(result: ApiDecodedParams, value: string) {
	const num = Number(value);
	if (isNaN(num)) throw new Error(`Invalid limit: ${value}`);
	result.limit = num;
}

function handleOffsetParam(result: ApiDecodedParams, value: string) {
	const num = Number(value);
	if (isNaN(num)) throw new Error(`Invalid offset: ${value}`);
	result.offset = num;
}

function handleFieldsParam(result: ApiDecodedParams, value: string) {
	result.fields = value.split(',').reduce(
		(acc, v) => {
			acc[v.trim()] = 1; // Met la valeur 1 pour chaque champ sélectionné
			return acc;
		},
		{} as Record<string, 1 | 0>
	);
}

function handleFilterParam(result: ApiDecodedParams, value: string) {
	result.filter = JSON.parse(value);
}

function handleSortParam(
	params: URLSearchParams
): Record<string, 1 | -1> | undefined {
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

	return Object.keys(sortObject).length > 0 ? sortObject : undefined;
}

// Hook
export function utilsDecodeGetParams(
	params: URLSearchParams
): ApiDecodedParams {
	const result: ApiDecodedParams = {};
	if (!params) return result;

	const handlers: Record<
		string,
		(result: ApiDecodedParams, value: string) => void
	> = {
		limit: handleLimitParam,
		offset: handleOffsetParam,
		fields: handleFieldsParam,
		filter: handleFilterParam,
	};

	for (const [key, value] of params.entries()) {
		if (!value) continue;
		if (key in handlers) handlers[key](result, value);
		if (key.includes('sort') && !result.sort) result.sort = {};
	}
	if (result.sort) result.sort = handleSortParam(params);

	return result;
}

// Import
import { utilsPrimitiveType } from '@/lib/useApi/utils/utils/_utilsPrimitiveType';
import { ApiParam, ApiSortParam } from '../../types';

// Define

export function utilsSortParams() {
	// Data
	const { getComparableValue } = utilsPrimitiveType();

	// Methods
	function encodeSortParams(sort: ApiSortParam | ApiSortParam[]) {
		const sortArray = Array.isArray(sort) ? sort : [sort];

		return sortArray.reduce(
			(acc, item, index) => {
				acc[`sort[${index}][field]`] = item.field;
				acc[`sort[${index}][direction]`] = item.direction || 'asc';
				return acc;
			},
			{} as Record<string, string>
		);
	}

	function decodeSortParams(params: ApiParam) {
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

	function applySortParams<T extends object>(
		data: T[],
		sortParams: ApiSortParam[]
	): T[] {
		if (data.some((item) => sortParams.some(({ field }) => !(field in item)))) {
			return [];
		}
		return [...data].sort((a, b) => {
			for (const { field, direction } of sortParams) {
				const rawA = a[field as keyof T];
				const rawB = b[field as keyof T];

				const valA = getComparableValue(rawA);
				const valB = getComparableValue(rawB);

				if (valA == null && valB == null) continue;
				if (valA == null) return direction === 'asc' ? 1 : -1;
				if (valB == null) return direction === 'asc' ? -1 : 1;

				if (valA === valB) continue;

				const order = direction === 'asc' ? 1 : -1;
				return valA < valB ? -1 * order : 1 * order;
			}

			return 0;
		});
	}

	// Return
	return {
		encodeSort: encodeSortParams,
		decodeSort: decodeSortParams,
		applySort: applySortParams,
	};
}

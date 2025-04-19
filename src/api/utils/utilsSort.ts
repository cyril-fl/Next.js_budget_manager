// Import
import { ApiSortParam } from '@types';

// Define

export function utilsSortParams() {
	// Data
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

	return {
		encodeSort: encodeSortParams,
	};
}

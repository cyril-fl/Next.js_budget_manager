// Imports
import { utilsFilterParams } from '@api/utils/utilsFilter';
import { utilsSortParams } from '@api/utils/utilsSort';
import { ApiFormula, ApiOptions, ApiSortParam } from '@types';

// Define

export function apiEncodeParams(params: ApiOptions | undefined) {
	if (!params) return '';

	// Data
	const { encodeSort } = utilsSortParams();
	const { encodeFilter } = utilsFilterParams();

	// Methods
	function encodeParams(obj: ApiOptions) {
		return (Object.keys(obj) as Array<keyof ApiOptions>)
			.map((key) => {
				const value = obj[key];
				if (!value) return;

				switch (key) {
					case 'sort':
						const sortParams = encodeSort(
							value as ApiSortParam | ApiSortParam[]
						);

						return Object.entries(sortParams)
							.map(
								([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
							)
							.join('&');

					case 'filter':
						const filterParams =
							typeof value === 'string'
								? value
								: encodeFilter(value as ApiFormula);

						return `filter=${encodeURIComponent(filterParams)}`;

					default:
						return `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`;
				}
			})
			.filter(Boolean)
			.join('&');
	}

	// Lifecycle

	return `?${encodeParams(params)}`;
}

// Imports
import {
	API_TABLE,
	ApiField,
	ApiOptions,
	ApiResponse,
	ApiSortParam,
} from '@/types';

export function utilsApi() {
	// Data
	const baseUrl = process.env.api_url;

	// Methods
	async function get(
		target: ApiField,
		option?: ApiOptions
	): Promise<ApiResponse> {
		if (!API_TABLE.includes(target))
			return {
				success: false,
				error: 'Table does not exist',
			};

		const params = utilsParams(option);
		const _url = `${baseUrl}/${target}${params}`;

		const res = await fetch(_url, {
			method: 'GET',
		});

		return res.json();
	}

	return { get };
}

function utilsParams(params: ApiOptions | undefined) {
	if (!params) return '';

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

	function encodeParams(obj: ApiOptions) {
		return (Object.keys(obj) as (keyof ApiOptions)[])
			.map((key) => {
				const value = obj[key];
				if (!value) return undefined;

				switch (key) {
					case 'sort':
						const sortParams = encodeSortParams(
							value as ApiSortParam | ApiSortParam[]
						);
						return Object.entries(sortParams)
							.map(
								([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
							)
							.join('&');

					default:
						return `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`;
				}
			})
			.filter(Boolean)
			.join('&');
	}

	return `?${encodeParams(params)}`;
}

export function utilsRefineData<T extends Record<string, unknown>>(
	data: T[],
	params: Record<string, string>
) {
	// Params
	function handleSortParam(params: Record<string, string>) {
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

	// Data
	function handleSortData<T extends Record<string, unknown>>(
		data: T[],
		sortParams: ApiSortParam[]
	): T[] {
		if (data.some((item) => sortParams.some(({ field }) => !(field in item)))) {
			return [];
		}

		return [...data].sort((a, b) => {
			for (const { field, direction } of sortParams) {
				const compareA = a[field];
				const compareB = b[field];

				if (
					compareA == null ||
					compareB == null ||
					typeof compareA === 'object' ||
					typeof compareB === 'object'
				) {
					return 0;
				}

				if (compareA === compareB) continue;

				const order = direction === 'desc' ? -1 : 1;
				return compareA < compareB ? -order : order;
			}
			return 0;
		});
	}

	function handleFilterFieldsData<T extends Record<string, unknown>>(
		data: T[],
		fields: string[]
	): Partial<T>[] {
		if (!fields.length) return data;

		if (!data.every((item) => fields.every((field) => field in item))) {
			return [];
		}

		return data.map(
			(item) =>
				Object.fromEntries(
					Object.entries(item).filter(([key]) => fields.includes(key))
				) as Partial<T>
		);
	}

	// Refine
	function handleProcessData(data: T[]) {
		// Parse params
		// TODO: Handle filter
		const { maxRecords: maxRecordsParam, filter: _filterParam } = params;
		const fieldsParam = params.fields ? params.fields.split(',') : [];
		const sortParams = handleSortParam(params);

		// Refine
		const sortedData = handleSortData(data, sortParams);
		const filteredData = handleFilterFieldsData(sortedData, fieldsParam);
		const maxedData = filteredData.slice(
			0,
			+maxRecordsParam || filteredData.length
		);

		return maxedData;
	}

	return handleProcessData(data);
}

import { ApiEncodedParams, ApiSortParam } from '@/server/utilsApi';

function isApiSortParam(item: unknown): item is ApiSortParam {
	return (
		typeof item === 'object' &&
		item !== null &&
		typeof (item as Record<string, unknown>).field === 'string'
	);
}

function handleSortParam(value: ApiEncodedParams['sort']) {
	const sortArray = Array.isArray(value) ? value : [value];
	return sortArray
		.filter(isApiSortParam)
		.flatMap((item, index) => [
			`sort[${index}][field]=${encodeURIComponent(item.field)}`,
			`sort[${index}][direction]=${encodeURIComponent(item.direction || 'asc')}`,
		])
		.join('&');
}

function handleFilterParam(value: unknown) {
	return `filter=${encodeURIComponent(JSON.stringify(value))}`;
}

function handleDefaultParam(key: string, value: unknown) {
	return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
}

export function utilsEncodeGetParams(
	params: ApiEncodedParams | undefined
): string {
	if (!params) return '';

	const entries = Object.entries(params).flatMap(([key, value]) => {
		if (!value) return [];

		switch (key) {
			case 'sort':
				return handleSortParam(value as ApiEncodedParams['sort']);
			case 'filter':
				return handleFilterParam(value);
			default:
				return handleDefaultParam(key, value);
		}
	});

	return entries.length ? `?${entries.join('&')}` : '';
}

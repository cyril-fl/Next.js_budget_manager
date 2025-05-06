export function utilsEncodeDeleteParams(id: string | string[]) {
	const requestID = Array.isArray(id) ? id : [id];

	const recordIds = requestID.reduce(
		(acc, record, index) => {
			acc[`records[${index}]`] = record;
			return acc;
		},
		{} as Record<string, string>
	);

	const queryParams = new URLSearchParams();

	Object.entries(recordIds).forEach(([key, value]) => {
		queryParams.append(key, value);
	});

	return `?${queryParams.toString()}`;
}

export function utilsDecodeDeleteParams(params: URLSearchParams) {
	const recordIds: string[] = [];

	for (const [key, value] of params.entries()) {
		if (key.startsWith('records[')) {
			recordIds.push(value);
		}
	}

	return recordIds;
}

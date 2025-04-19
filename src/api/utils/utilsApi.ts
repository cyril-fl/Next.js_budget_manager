// Imports
import { ApiField, ApiOptions, ApiResponse } from '@types';
import { apiEncodeParams } from './apiEncodeParams';

// Define

export function utilsApi() {
	// Data
	const baseUrl = process.env.api_url;

	// Methods
	async function get<T = unknown>(
		target: ApiField,
		option?: ApiOptions
	): Promise<ApiResponse<T>> {
		// const params = d_utilsApiParams(option);
		const params = apiEncodeParams(option);
		const _url = `${baseUrl}/${target}${params}`;

		try {
			const res = await fetch(_url, {
				method: 'GET',
			});
			return await res.json();
		} catch (error) {
			return {
				success: false,
				error: (error as Error).message,
			};
		}
	}

	// async function post<T = unknown>(target: ApiField) {}
	// async function put<T = unknown>(target: ApiField) {}
	// async function suppress<T = unknown>(target: ApiField) {}

	return { get };
}

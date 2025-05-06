// Imports
import { ApiOptions, ApiPathLabel, ApiResponse } from '@/lib/utilsApi';
import { config } from '../config';
// import { ApiOptions, ApiPathLabel, ApiResponse } from '../types';
// import { utilsEncodeParams } from '../utils/';

// Define

export function utilsApi() {
	// Datas
	// TODO gerer la config de l'api
	const baseUrl = process.env.api_url;
	// TODO: mettre en config avec env. parce que je voudrais que la cofig de .core definise la config de useAPi a terme
	const tablePath = config.path.routes;
	// Methods
	async function get<T = unknown>(
		target?: ApiPathLabel,
		option?: ApiOptions
	): Promise<ApiResponse<T>> {
		if (!target) return { success: false, error: 'No target' };

		// const params = utilsEncodeParams(option);
		const _url = `${baseUrl}/${getTable(target)}`;

		try {
			const res = await fetch(_url, {
				method: 'GET',
				// NOTE: Only in Next.js
				next: {
					revalidate: option?.nextCache?.revalidate,
					tags: option?.nextCache?.tags,
				},
				cache: option?.nextCache?.cache,
				// ---
			});
			return await res.json();
		} catch (error) {
			return {
				success: false,
				error: (error as Error).message,
			};
		}
	}

	/*
	async function suppress(target?: ApiPathLabel, id?: string | string[]) {
		if (!target) return { success: false, error: 'No target' };
		if (!id) return { success: false, error: 'No ID given' };

		const params = utilsEncodeDeleteParams(id);
		const _url = `${baseUrl}/${getTable(target)}${params}`;

		try {
			const res = await fetch(_url, {
				method: 'DELETE',
			});
			return await res.json();
		} catch (error) {
			return {
				success: false,
				error: (error as Error).message,
			};
		}
	}
*/

	// async function post<T = unknown>(target: ApiField) {}
	// async function put<T = unknown>(target: ApiField) {}

	// Helpers
	function getTable(target: ApiPathLabel | string): string {
		return tablePath[target as ApiPathLabel] ?? target;
	}

	return { get };
}

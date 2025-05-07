// Imports
import { config } from '../../config';
import { ApiEncodedParams, ApiEndpoint, ApiResponse } from '../types';
import { utilsEncodeGetParams } from './get/_utilsEncodeGetParams';

// Define

export function utilsApi() {
	// Data
	// TODO: mettre en config avec env. parce que je voudrais que la cofig de .core definise la config de useAPi a terme
	const baseUrl = config.url;
	const tablePath = config.path?.routes;
	const token = config.bearer;

	// Methods
	async function get<T = unknown, K = any>(
		target?: ApiEndpoint,
		option?: ApiEncodedParams<K>
	): Promise<ApiResponse<T>> {
		try {
			handleAssertRecord(target);
			const params = utilsEncodeGetParams(option);
			const path = handleGetTable(target);
			const url = `${baseUrl}/${path}${params}`;

			const res = await fetch(url, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				// NOTE: Only in Next.js
				next: {
					revalidate: option?.nextCache?.revalidate,
					tags: option?.nextCache?.tags,
				},
				cache: option?.nextCache?.cache,
			});
			return await res.json();
		} catch (error) {
			return {
				success: false,
				error: (error as Error).message,
			};
		}
	}
	//
	// 	/*
	// 	async function suppress(target?: ApiPathLabel, id?: string | string[]) {
	// 		if (!target) return { success: false, error: 'No target' };
	// 		if (!id) return { success: false, error: 'No ID given' };
	//
	// 		const params = utilsEncodeDeleteParams(id);
	// 		const _url = `${baseUrl}/${handleGetTable(target)}${params}`;
	//
	// 		try {
	// 			const res = await fetch(_url, {
	// 				method: 'DELETE',
	// 			});
	// 			return await res.json();
	// 		} catch (error) {
	// 			return {
	// 				success: false,
	// 				error: (error as Error).message,
	// 			};
	// 		}
	// 	}
	// */
	//
	// 	// async function post<T = unknown>(target: ApiField) {}
	// 	// async function put<T = unknown>(target: ApiField) {}
	//
	// Helpers
	function handleGetTable(target: ApiEndpoint | string): string {
		handleAssertRecord(tablePath);
		return tablePath[target as ApiEndpoint] ?? target;
	}
	function handleAssertRecord<T>(
		record: unknown
	): asserts record is Omit<T, 'undefined'> {
		if (!record) {
			throw new Error('No tablePath found');
		}
	}
	return { get };
}

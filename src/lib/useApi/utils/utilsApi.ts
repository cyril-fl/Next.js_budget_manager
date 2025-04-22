// Imports
import { ApiOptions, ApiResponse, ApiTableLabel } from '@types';
import { utilsEncodeParams } from './utilsEncodeParams';

// Define

export function utilsApi() {
	// Data
	// TODO gerer la config de l'api
	const baseUrl = process.env.api_url;
	// TODO: mettre en config
	const tablePath: Record<ApiTableLabel, string> = {
		auth: 'auth',
		months: 'months',
		transactions: 'transactions',
		years: 'years',
		yearlyResume: 'years/resume',
	};

	// Methods
	async function get<T = unknown>(
		target: ApiTableLabel,
		option?: ApiOptions
	): Promise<ApiResponse<T>> {
		const params = utilsEncodeParams(option);
		const _url = `${baseUrl}/${getTable(target)}${params}`;

		try {
			const res = await fetch(_url, {
				method: 'GET',
				//  TODO: Mettre ca dans Options de API
				// next: { revalidate: 60 },
				// cache: 'force-cache',
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

	// Helpers
	function getTable(target: ApiTableLabel | string): string {
		return tablePath[target as ApiTableLabel] ?? target;
	}

	return { get };
}

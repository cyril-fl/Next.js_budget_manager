// Imports
// Define

export function useApi() {
	// Data

	// Methods
	async function get<T>(url: string, option?: Record<string, any>) {
		return await fetch(`api/${url}`, {
			method: option?.method || 'GET',
			body: JSON.stringify(option?.body || {}),
		});
	}

	// Lifecycle

	return { get };
}

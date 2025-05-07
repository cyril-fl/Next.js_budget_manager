// Imports
import { ApiDecodedParams } from '@/server/utilsApi';

// Define

export function utilsInsertAtPosition<
	T extends Record<K, unknown>,
	K extends string,
>(params: ApiDecodedParams & T, key: K, position: number): string[] {
	const keys = Object.keys(params).filter((k) => k !== key);
	const clampedPosition = Math.min(Math.max(position, 0), keys.length);
	return [
		...keys.slice(0, clampedPosition),
		key,
		...keys.slice(clampedPosition),
	];
}

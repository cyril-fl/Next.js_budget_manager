export function assert<T>(
	value: T | undefined | null,
	message = 'Value is undefined or null.'
): asserts value is NonNullable<T> {
	if (value === undefined || value === null) {
		throw new Error(`⚠️ ${message}`);
	}
}

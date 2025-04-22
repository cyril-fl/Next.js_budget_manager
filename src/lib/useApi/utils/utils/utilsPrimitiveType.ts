// Imports

// Define
type Primitive = string | number | boolean;

export function utilsPrimitiveType() {
	// Data

	// Methods
	function tryValueOf(val: unknown): Primitive | undefined {
		if (
			val &&
			typeof val === 'object' &&
			typeof (val as { valueOf: () => unknown }).valueOf === 'function'
		) {
			const raw = (val as { valueOf: () => unknown }).valueOf();
			if (isPrimitive(raw)) return raw;
		}
	}

	function tryToString(val: unknown): string | undefined {
		if (
			val &&
			typeof val === 'object' &&
			typeof (val as { toString: () => unknown }).toString === 'function'
		) {
			const str = (val as { toString: () => unknown }).toString();
			if (typeof str === 'string') return str;
		}
	}

	function isPrimitive(val: unknown): val is Primitive {
		return (
			typeof val === 'string' ||
			typeof val === 'number' ||
			typeof val === 'boolean'
		);
	}

	function clean(val: Primitive): Primitive {
		if (typeof val === 'string') {
			const numberValue = Number(val);
			return isNaN(numberValue) ? val : numberValue;
		}
		return val;
	}

	function getComparableValue(val: unknown): Primitive {
		if (isPrimitive(val)) return clean(val);

		if (val instanceof Date) return val.getTime();

		const valueOfResult = tryValueOf(val);
		if (valueOfResult !== undefined) return valueOfResult;

		const toStringResult = tryToString(val);
		if (toStringResult !== undefined) return toStringResult;

		return String(val);
	}

	// Return
	return { getComparableValue };
}

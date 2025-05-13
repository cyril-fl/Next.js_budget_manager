// Define
type PhraseCaseOptions = {
	/**
	 * The punctuation mark to append at the end of the transformed string.
	 * If not provided, no punctuation will be added.
	 */
	finalPunctuation?: '.' | '!' | '?';
	/**
	 * Whether to capitalize the first letter of each word.
	 * - `true`: "hello world" → "Hello World"
	 * - `false`: "hello world" → "Hello world"
	 */
	isTitleCase?: boolean;
	/**
	 * The maximum number of characters to truncate the string to.
	 * If not provided, the string will not be truncated.
	 */
	truncate?: number;
};

// noinspection JSUnusedGlobalSymbols
export function utilsUtils() {
	// Data

	// Methods
	/* String */
	function toCamelCase(str: string): string {
		return str
			.replace(/^\w|[A-Z]|\b\w|\s+/g, (match, index) =>
				index === 0 ? match.toLowerCase() : match.toUpperCase()
			)
			.replace(/_/g, '')
			.replace(/\s+/g, '');
	}
	function toSnakeCase(str: string): string {
		return str
			.replace(/([a-z])([A-Z])/g, '$1_$2')
			.replace(/\s+/g, '_')
			.toLowerCase();
	}
	function toCapitalizeWords(text: string): string {
		return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
	}
	function toCapitalizeSentence(text: string): string {
		return text.toLowerCase().replace(/^\w/, (char) => char.toUpperCase());
	}

	function truncate(str: string, length: number): string {
		return str.length > length ? str.slice(0, length) + ' ...' : str;
	}

	function transformToPhraseCase(
		str: string,
		options?: PhraseCaseOptions
	): string {
		const finalPunctuation = options?.finalPunctuation ?? '';
		const formattedStr = options?.isTitleCase
			? toCapitalizeWords(str.trim())
			: toCapitalizeSentence(str.trim());

		const shouldTruncate =
			options?.truncate && formattedStr.length > options.truncate;

		return shouldTruncate
			? formattedStr.slice(0, options.truncate) + ' ...'
			: formattedStr + finalPunctuation;
	}

	/* Object */
	// OPTIMIZE: Mix - toCamelCase and toSnakeCase
	function objectKeysToCamelCase(
		obj: Record<string, any>
	): Record<string, any> {
		const newObj: Record<string, any> = {};
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				newObj[toCamelCase(key)] = obj[key];
			}
		}
		return newObj;
	}

	function objectKeysToSnakeCase(
		obj: Record<string, any>
	): Record<string, any> {
		const newObj: Record<string, any> = {};
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				newObj[toSnakeCase(key)] = obj[key];
			}
		}
		return newObj;
	}

	function objectFilterEntries<T extends Record<string, any>>(obj: T) {
		return Object.fromEntries(
			Object.entries(obj).filter(
				([_, value]) =>
					!(value === undefined || value === null) &&
					!(typeof value === 'number' && isNaN(value)) &&
					!(typeof value === 'string' && value.trim() === '') &&
					!(Array.isArray(value) && value.length === 0) &&
					!(typeof value === 'object' && Object.keys(value).length === 0)
			)
		);
	}

	/* Date */

	function getClosestDate(dates: string[]): string | null {
		const today = new Date().setHours(0, 0, 0, 0);
		const isFutureDate = (date: string) =>
			new Date(date).setHours(0, 0, 0, 0) >= today;

		const futureDates: string[] = [];
		const pastDates: string[] = [];

		for (const d of dates) {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			isFutureDate(d) ? futureDates.push(d) : pastDates.push(d);
		}

		if (futureDates.length)
			return futureDates.reduce((a, b) => (new Date(a) < new Date(b) ? a : b));

		if (pastDates.length)
			return pastDates.reduce((a, b) => (new Date(a) > new Date(b) ? a : b));

		return null;
	}

	/* Number */

	/* Other */
	function getItemCa<T extends { participants: number; price: number }>(
		item: T
	): number {
		return item.participants * item.price;
	}

	return {
		objectKeysToCamelCase,
		objectKeysToSnakeCase,
		objectFilterEntries,
		transformToPhraseCase,
		getItemCa,
		getClosestDate,
		truncate,
		toCamelCase,
		toSnakeCase,
	};
}

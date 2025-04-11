// Imports
// Define
import { DateTimeFormatOptions } from 'use-intl';

interface FormatMonthOptions extends DateTimeFormatOptions {
	locale?: string;
}

export default function utilsDate() {
	// Data

	// Methods
	function formatMonth(
		year: number | string,
		month: number | string,
		options?: FormatMonthOptions
	): string {
		const yearNumber = Number(year);
		const monthNumber = Number(month);
		if (monthNumber > 12) return '';

		// TODO modifier le format de month dans les data
		const date = new Date(yearNumber, monthNumber);

		return date.toLocaleString(options?.locale ?? 'default', options);
	}
	// Lifecycle

	return {
		formatMonth,
	};
}

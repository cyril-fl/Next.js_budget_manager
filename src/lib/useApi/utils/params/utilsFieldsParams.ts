// Imports
// Define
import { Param } from '@types';

export function utilsFieldsParams() {
	// Data

	// Methods
	function encodeFieldsParams() {}

	function decodeFieldsParams(params: Param) {
		const fields = params.fields;
		if (!fields) return [];

		const fieldsArray = decodeURIComponent(fields).split(',');
		if (!fieldsArray.length) return [];

		return fieldsArray;
	}

	function applyFieldsParams<T extends object>(
		data: T[],
		fields: string[]
	): Partial<T>[] {
		if (!fields.length) return data;

		if (!data.every((item) => fields.every((field) => field in item))) {
			return [];
		}

		return data.map(
			(item) =>
				Object.fromEntries(
					Object.entries(item).filter(([key]) => fields.includes(key))
				) as Partial<T>
		);
	}

	// Return
	return {
		encodeFields: encodeFieldsParams,
		decodeFields: decodeFieldsParams,
		applyFields: applyFieldsParams,
	};
}

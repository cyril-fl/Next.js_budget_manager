// Imports
// Define

// noinspection JSUnusedGlobalSymbols
export function utilsIcons() {
	// Data
	const buildInIcons = {
		eyeOn: 'mynaui:eye',
		eyeOff: 'mynaui:eye-slash',
		loading: 'icomoon-free:spinner3',
	};
	const customIcons = {};
	// Methods

	// Lifecycle

	return {
		...buildInIcons,
		...customIcons,
	};
}

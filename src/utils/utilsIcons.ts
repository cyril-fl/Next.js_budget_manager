// Imports
// Define

// noinspection JSUnusedGlobalSymbols
export function utilsIcons() {
	// Data
	// Icon in bas component
	const buildInIcons = {
		eyeOn: 'mynaui:eye',
		eyeOff: 'mynaui:eye-slash',
		loading: 'icomoon-free:spinner3',
	};
	// Icon in custom project or custom component
	const customIcons = {
		calendar: 'mynaui:calendar',
		dashboard: 'mynaui:home-solid',
		settings: 'mynaui:cog-four',
	};
	// Methods

	// Lifecycle

	return {
		...buildInIcons,
		...customIcons,
	};
}

// Imports
// Define

export function utilsIcons() {
	// Data
	// NOTE: Icon in base component
	const buildInIcons = {
		eyeOn: 'ph:eye',
		eyeOff: 'ph:eye-slash',
		loading: 'ph:spinner-gap',
	};

	// NOTE: Icon in custom project or custom component
	// TODO add a way to get from a config file
	const customIcons = {
		calendar: 'ph:calendar-dots',
		dashboard: 'ph:squares-four-bold',
		plus: 'ph:plus',
		settings: 'ph:gear-six',
	};

	return {
		...buildInIcons,
		...customIcons,
	};
}

// Imports
// Define

export function utilsIcons() {
	// Data
	// NOTE: Icon in base component
	const buildInIcons = {
		eyeOn: 'ph:eye',
		eyeOff: 'ph:eye-slash',
		loading: 'ph:spinner-gap',
		off: 'ph:circle',
		on: 'ph:line-vertical-bold',
	};

	// TODO add a way to get from a config file
	// NOTE: Icon in custom project or custom component
	const customIcons = {
		calendar: 'ph:calendar-dots',
		dashboard: 'ph:squares-four-bold',
		list: 'ph:list-bullets',
		grid: 'ph:grid-four',
		plus: 'ph:plus',
		savings: 'ph:bank',
		settings: 'ph:gear-six',
		test: 'ph:test-tube',
		template: 'ph:cards',
	};

	return {
		...buildInIcons,
		...customIcons,
	};
}

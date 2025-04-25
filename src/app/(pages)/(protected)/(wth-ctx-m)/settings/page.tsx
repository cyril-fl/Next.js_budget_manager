// Import

// Define

import HeaderToolbar from '@/components/layout/dynamicHeaderToolbar/HeaderToolbar';

export default function SettingsPage() {
	// Data
	const pageTitle = 'Settings';

	// Methods

	// Render
	return (
		<>
			<HeaderToolbar path={pageTitle.toLowerCase()} title={pageTitle} />
		</>
	);
}

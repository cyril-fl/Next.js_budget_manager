// Import
import HeaderToolbar from '@/components/layout/dynamicHeaderToolbar/HeaderToolbar';

// Define

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

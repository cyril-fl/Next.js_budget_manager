// Imports
// Define

import ViewStyleButton from '@/components/action/ViewStyleButton';
import Button from '@/components/ui/Button';
import { utilsIcons } from '@utils/utilsIcons';

export default function TemplateToolBar() {
	// Data
	const icons = utilsIcons();

	// Methods

	// Render
	return (
		<>
			<ViewStyleButton target="templates" />
			<Button
				label="Add"
				icon={icons.plus}
				to="/templates/add"
				size="sm"
				noLabel
				leading
				squared
			/>
		</>
	);
}

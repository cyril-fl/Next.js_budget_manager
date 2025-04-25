'use client';

// Imports
import Button from '@/components/ui/Button';
import { useViewStyle, ViewKey } from '@/stores/useViewStyle';
import { utilsIcons } from '@utils/utilsIcons';
import { useMemo } from 'react';

// Define
interface ViewStyleButtonProps {
	target: ViewKey;
}

// Component
export default function ViewStyleButton({ target }: ViewStyleButtonProps) {
	// Data
	const { viewStyle, setViewStyle } = useViewStyle();
	const icons = utilsIcons();
	const isGrid = viewStyle[target] === 'grid';

	const { label, icon, nextStyle } = useMemo(() => {
		return isGrid
			? { label: 'List', icon: icons.list, nextStyle: 'list' as const }
			: { label: 'Grid', icon: icons.grid, nextStyle: 'grid' as const };
	}, [isGrid, icons]);

	// Methods
	// Render
	return (
		<Button
			label={label}
			onClick={() => setViewStyle(target, nextStyle)}
			icon={icon}
			noLabel
			leading
			squared
			size="sm"
		/>
	);
}

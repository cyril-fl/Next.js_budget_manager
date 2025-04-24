// Imports
// Define

import SideMenu from '@/components/layout/dynamicSideMenu/SideMenu';
import MainSection from '@/components/wrapper/MainSection';
import { LocalItem, options, target } from '@utils/frequentRequest/calendar';
import { ReactNode } from 'react';

export default function OverviewLayout({ children }: { children: ReactNode }) {
	// Data

	// Methods

	// Render
	return (
		<>
			<SideMenu<LocalItem> path="overview" target={target} option={options} />
			<MainSection>{children}</MainSection>
		</>
	);
}

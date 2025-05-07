// Imports
import SideMenu from '@/components/layout/dynamicSideMenu/SideMenu';
import NavigationBar from '@/components/layout/navigation/NavigationBar';
import MainSection from '@/components/layout/wrapper/MainSection';
import { options, target } from '@utils/frequentRequest/calendar';
import { ReactNode } from 'react';

// Define

export default function OverviewLayout({ children }: { children: ReactNode }) {
	// Data

	// Methods

	// Render
	return (
		<>
			<NavigationBar>
				<SideMenu<any> path="overview" target={target} option={options} />
			</NavigationBar>
			<MainSection>{children}</MainSection>
		</>
	);
}

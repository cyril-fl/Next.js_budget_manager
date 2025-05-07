// // Imports
import NavigationBar from '@/components/layout/navigation/NavigationBar';
import MainSection from '@/components/layout/wrapper/MainSection';
import { ReactNode } from 'react';

// Define

export default function DashboardLayout({ children }: { children: ReactNode }) {
	// Data

	// Methods

	// Render
	return (
		<>
			<NavigationBar>
				{/*<SideMenu<LocalItem> path="dashboard" target={target} option={options} />*/}
			</NavigationBar>
			<MainSection>{children}</MainSection>
		</>
	);
}

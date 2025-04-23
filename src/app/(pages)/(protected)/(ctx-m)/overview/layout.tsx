// Imports
// Define

import SideMenu from '@/components/layout/dynamicSideMenu/SideMenu';
import MainSection from '@/components/wrapper/MainSection';
import { ApiOptions } from '@/lib/useApi';
import { ReactNode } from 'react';

export default function OverviewLayout({ children }: { children: ReactNode }) {
	// Data
	const options: ApiOptions = {
		fields: ['reportYear', 'monthsIndex'],
	};

	// Methods

	// Render
	return (
		<>
			<SideMenu path="overview" target="calendar" option={options} />
			<MainSection>{children}</MainSection>
		</>
	);
}

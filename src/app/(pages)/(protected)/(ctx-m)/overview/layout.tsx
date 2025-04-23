// Imports
// Define

import CtxMenuLayout from '@/components/layout/CtxMenuLayout';
import { ApiOptions } from '@/lib/useApi';
import { ReactNode } from 'react';

export default function OverviewLayout({ children }: { children: ReactNode }) {
	// Data
	const options: ApiOptions = {
		fields: ['reportYear', 'monthsIndex'],
		// filter: {
		// 	fn: 'GROUP_BY',
		// 	args: [
		// 		{
		// 			l: 'reportYear',
		// 		},
		// 		{
		// 			l: 'reportMonth',
		// 		},
		// 	],
		// },
		// sort: [{ field: 'reportYear' }, { field: 'reportMonth' }],
	};
	// Methods

	// Render
	return (
		<>
			<CtxMenuLayout path="overview" option={options}>
				{children}
			</CtxMenuLayout>
		</>
	);
}

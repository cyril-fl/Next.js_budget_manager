// Imports
// Define

import CtxMenuLayout from '@/components/layout/CtxMenuLayout';
import { ReactNode } from 'react';

export default function OverviewLayout({ children }: { children: ReactNode }) {
	// Data

	// Methods

	// Render
	return (
		<>
			<CtxMenuLayout path="overview">{children}</CtxMenuLayout>
		</>
	);
}

// Imports
// Define
import MainSection from '@/components/wrapper/MainSection';
import React from 'react';

export default function WithoutCtxMenuLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	// Data

	// Methods

	// Render
	return (
		<>
			<MainSection>{children}</MainSection>
		</>
	);
}
